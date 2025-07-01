// SPDX-License-Identifier: MIT
import { Mnemonic } from '../mnemonic';
import { AlgorandEntropy, ALGORAND_ENTROPY_STRENGTHS } from '../../entropies';
import { sha512_256 } from '../../crypto';
import { getBytes, bytesToString, convertBits } from '../../utils';
import { MnemonicError, EntropyError, ChecksumError } from '../../exceptions';
import { ALGORAND_ENGLISH_WORDLIST } from './wordlists';
export const ALGORAND_MNEMONIC_WORDS = {
    TWENTY_FIVE: 25
};
export const ALGORAND_MNEMONIC_LANGUAGES = {
    ENGLISH: 'english'
};
export class AlgorandMnemonic extends Mnemonic {
    static checksumLength = 2;
    static wordBitLength = 11;
    static wordsList = [
        ALGORAND_MNEMONIC_WORDS.TWENTY_FIVE
    ];
    static wordsToEntropyStrength = {
        25: ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    };
    static languages = Object.values(ALGORAND_MNEMONIC_LANGUAGES);
    static wordLists = {
        [ALGORAND_MNEMONIC_LANGUAGES.ENGLISH]: ALGORAND_ENGLISH_WORDLIST
    };
    static getName() {
        return 'Algorand';
    }
    static fromWords(words, language, options = {}) {
        if (!this.wordsList.includes(words)) {
            throw new MnemonicError(`Invalid words count`, { expected: this.wordsList, got: words });
        }
        const strength = this.wordsToEntropyStrength[words];
        const entropyHex = AlgorandEntropy.generate(strength);
        return this.encode(entropyHex, language, options);
    }
    static fromEntropy(entropy, language, options = {}) {
        const entropyBytes = typeof entropy === 'string'
            ? getBytes(entropy) : entropy instanceof Uint8Array
            ? entropy : getBytes(entropy.getEntropy());
        return this.encode(entropyBytes, language, options);
    }
    static encode(entropyInput, language, options = {}) {
        const entropyBytes = getBytes(entropyInput);
        if (!AlgorandEntropy.isValidBytesStrength(entropyBytes.length)) {
            throw new EntropyError('Wrong entropy strength', { expected: AlgorandEntropy.strengths, got: entropyBytes.length * 8 });
        }
        const fullHash = sha512_256(entropyBytes);
        const checksum = fullHash.slice(0, this.checksumLength);
        const checksumWords = convertBits(checksum, 8, this.wordBitLength);
        if (!checksumWords)
            throw new Error('Checksum conversion failed');
        const dataWords = convertBits(entropyBytes, 8, this.wordBitLength);
        if (!dataWords)
            throw new Error('Entropy conversion failed');
        const wordList = this.getWordsListByLanguage(language, this.wordLists);
        const indexes = [...dataWords, checksumWords[0]];
        return indexes.map(i => wordList[i]).join(' ');
    }
    static decode(mnemonic, options = {}) {
        const words = this.normalize(mnemonic);
        if (!this.wordsList.includes(words.length)) {
            throw new MnemonicError('Invalid mnemonic length', { expected: this.wordsList, got: words.length });
        }
        const [wordList] = this.findLanguage(words, this.wordLists);
        const idxMap = Object.fromEntries(wordList.map((w, i) => [w, i]));
        const indexes = words.map(w => {
            const idx = idxMap[w];
            if (idx === undefined) {
                throw new MnemonicError(`Unknown word '${w}'`);
            }
            return idx;
        });
        const allBytes = convertBits(indexes.slice(0, -1), this.wordBitLength, 8);
        if (!allBytes)
            throw new Error('Bit conversion failed');
        const entropyBytesArr = allBytes.slice(0, -1);
        const entropyBytes = getBytes(entropyBytesArr);
        const expectedIdx = (convertBits(sha512_256(entropyBytes).slice(0, this.checksumLength), 8, this.wordBitLength) || [])[0];
        const actualIdx = indexes[indexes.length - 1];
        if (expectedIdx !== actualIdx) {
            throw new ChecksumError('Invalid checksum', {
                expected: wordList[expectedIdx],
                got: wordList[actualIdx]
            });
        }
        return bytesToString(entropyBytes);
    }
    static normalize(input) {
        const arr = typeof input === 'string' ? input.trim().split(/\s+/) : input;
        return arr.map(w => w.normalize('NFKD').toLowerCase());
    }
}
//# sourceMappingURL=mnemonic.js.map