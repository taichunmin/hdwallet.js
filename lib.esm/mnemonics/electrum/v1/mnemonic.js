// SPDX-License-Identifier: MIT
import { Mnemonic } from '../../mnemonic';
import { ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS } from '../../../entropies';
import { hexToBytes, integerToBytes, bytesToInteger, bytesToHex, getBytes, concatBytes } from '../../../utils';
import { MnemonicError, EntropyError } from '../../../exceptions';
import { ELECTRUM_V1_ENGLISH_WORDLIST } from './wordlists';
export const ELECTRUM_V1_MNEMONIC_WORDS = {
    TWELVE: 12,
};
export const ELECTRUM_V1_MNEMONIC_LANGUAGES = {
    ENGLISH: 'english'
};
export class ElectrumV1Mnemonic extends Mnemonic {
    static wordsListNumber = 1626;
    static wordsList = [
        ELECTRUM_V1_MNEMONIC_WORDS.TWELVE,
    ];
    static wordsToStrength = {
        [ELECTRUM_V1_MNEMONIC_WORDS.TWELVE]: ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
    };
    static languages = Object.values(ELECTRUM_V1_MNEMONIC_LANGUAGES);
    static wordLists = {
        [ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH]: ELECTRUM_V1_ENGLISH_WORDLIST
    };
    static getName() {
        return 'Electrum-V1';
    }
    static fromWords(count, language, options = {}) {
        if (!this.wordsList.includes(count)) {
            throw new MnemonicError('Invalid mnemonic words number', { expected: this.wordsList, got: count });
        }
        const entropy = ElectrumV1Entropy.generate(this.wordsToStrength[count]);
        return this.encode(entropy, language, options);
    }
    static fromEntropy(entropy, language, options = {}) {
        let raw;
        if (typeof entropy === 'string') {
            raw = hexToBytes(entropy);
        }
        else if (entropy instanceof Uint8Array) {
            raw = entropy;
        }
        else {
            raw = hexToBytes(entropy.getEntropy());
        }
        return this.encode(raw, language, options);
    }
    static encode(entropy, language, options = {}) {
        const entropyBytes = getBytes(entropy);
        if (!ElectrumV1Entropy.isValidBytesStrength(entropyBytes.length)) {
            throw new EntropyError('Wrong entropy strength', { expected: ElectrumV1Entropy.strengths, got: entropyBytes.length * 8 });
        }
        const rawList = this.getWordsListByLanguage(language, this.wordLists);
        const wordList = this.normalize(rawList);
        const wl = wordList.length;
        const mnemonic = [];
        for (let i = 0; i < entropyBytes.length; i += 4) {
            const chunkBytes = entropyBytes.slice(i, i + 4);
            // big-endian → bigint → number
            const chunkInt = Number(bytesToInteger(chunkBytes, false));
            const w1 = chunkInt % wl;
            const w2 = (Math.floor(chunkInt / wl) + w1) % wl;
            const w3 = (Math.floor(chunkInt / wl / wl) + w2) % wl;
            mnemonic.push(wordList[w1], wordList[w2], wordList[w3]);
        }
        return this.normalize(mnemonic).join(' ');
    }
    static decode(mnemonic, options = { checksum: false }) {
        const words = this.normalize(mnemonic);
        const count = words.length;
        if (!this.wordsList.includes(count)) {
            throw new MnemonicError('Invalid mnemonic words count', {
                expected: this.wordsList,
                got: count,
            });
        }
        let wordsList;
        let idxMap = {};
        if (options.wordsList && options.wordsListWithIndex) {
            wordsList = options.wordsList;
            idxMap = options.wordsListWithIndex;
        }
        else {
            [wordsList] = this.findLanguage(words, this.wordLists);
            wordsList.forEach((w, i) => (idxMap[w] = i));
        }
        const wl = wordsList.length;
        const bufs = [];
        for (let i = 0; i < words.length; i += 3) {
            const [w1, w2, w3] = words.slice(i, i + 3);
            const i1 = idxMap[w1];
            const i2 = idxMap[w2] % wl;
            const i3 = idxMap[w3] % wl;
            const chunkVal = i1 +
                wl * ((i2 - i1 + wl) % wl) +
                wl * wl * ((i3 - i2 + wl) % wl);
            const chunkBytes = integerToBytes(chunkVal, 4, 'big');
            bufs.push(getBytes(chunkBytes));
        }
        return bytesToHex(concatBytes(...bufs), false);
    }
    static isValid(input, options = {}) {
        try {
            this.decode(input, options);
            return true;
        }
        catch {
            return false;
        }
    }
    static normalize(input) {
        const arr = typeof input === 'string' ? input.trim().split(/\s+/) : input;
        return arr.map(w => w.normalize('NFKD').toLowerCase());
    }
}
//# sourceMappingURL=mnemonic.js.map