"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorandMnemonic = exports.ALGORAND_MNEMONIC_LANGUAGES = exports.ALGORAND_MNEMONIC_WORDS = void 0;
const mnemonic_1 = require("../mnemonic");
const entropies_1 = require("../../entropies");
const crypto_1 = require("../../crypto");
const utils_1 = require("../../utils");
const exceptions_1 = require("../../exceptions");
const wordlists_1 = require("./wordlists");
exports.ALGORAND_MNEMONIC_WORDS = {
    TWENTY_FIVE: 25
};
exports.ALGORAND_MNEMONIC_LANGUAGES = {
    ENGLISH: 'english'
};
class AlgorandMnemonic extends mnemonic_1.Mnemonic {
    static checksumLength = 2;
    static wordBitLength = 11;
    static wordsList = [
        exports.ALGORAND_MNEMONIC_WORDS.TWENTY_FIVE
    ];
    static wordsToEntropyStrength = {
        25: entropies_1.ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    };
    static languages = Object.values(exports.ALGORAND_MNEMONIC_LANGUAGES);
    static wordLists = {
        [exports.ALGORAND_MNEMONIC_LANGUAGES.ENGLISH]: wordlists_1.ALGORAND_ENGLISH_WORDLIST
    };
    static getName() {
        return 'Algorand';
    }
    static fromWords(words, language, options = {}) {
        if (!this.wordsList.includes(words)) {
            throw new exceptions_1.MnemonicError(`Invalid words count`, { expected: this.wordsList, got: words });
        }
        const strength = this.wordsToEntropyStrength[words];
        const entropyHex = entropies_1.AlgorandEntropy.generate(strength);
        return this.encode(entropyHex, language, options);
    }
    static fromEntropy(entropy, language, options = {}) {
        const entropyBytes = typeof entropy === 'string'
            ? (0, utils_1.getBytes)(entropy) : entropy instanceof Uint8Array
            ? entropy : (0, utils_1.getBytes)(entropy.getEntropy());
        return this.encode(entropyBytes, language, options);
    }
    static encode(entropyInput, language, options = {}) {
        const entropyBytes = (0, utils_1.getBytes)(entropyInput);
        if (!entropies_1.AlgorandEntropy.isValidBytesStrength(entropyBytes.length)) {
            throw new exceptions_1.EntropyError('Wrong entropy strength', { expected: entropies_1.AlgorandEntropy.strengths, got: entropyBytes.length * 8 });
        }
        const fullHash = (0, crypto_1.sha512_256)(entropyBytes);
        const checksum = fullHash.slice(0, this.checksumLength);
        const checksumWords = (0, utils_1.convertBits)(checksum, 8, this.wordBitLength);
        if (!checksumWords)
            throw new Error('Checksum conversion failed');
        const dataWords = (0, utils_1.convertBits)(entropyBytes, 8, this.wordBitLength);
        if (!dataWords)
            throw new Error('Entropy conversion failed');
        const wordList = this.getWordsListByLanguage(language, this.wordLists);
        const indexes = [...dataWords, checksumWords[0]];
        return indexes.map(i => wordList[i]).join(' ');
    }
    static decode(mnemonic, options = {}) {
        const words = this.normalize(mnemonic);
        if (!this.wordsList.includes(words.length)) {
            throw new exceptions_1.MnemonicError('Invalid mnemonic length', { expected: this.wordsList, got: words.length });
        }
        const [wordList] = this.findLanguage(words, this.wordLists);
        const idxMap = Object.fromEntries(wordList.map((w, i) => [w, i]));
        const indexes = words.map(w => {
            const idx = idxMap[w];
            if (idx === undefined) {
                throw new exceptions_1.MnemonicError(`Unknown word '${w}'`);
            }
            return idx;
        });
        const allBytes = (0, utils_1.convertBits)(indexes.slice(0, -1), this.wordBitLength, 8);
        if (!allBytes)
            throw new Error('Bit conversion failed');
        const entropyBytesArr = allBytes.slice(0, -1);
        const entropyBytes = (0, utils_1.getBytes)(entropyBytesArr);
        const expectedIdx = ((0, utils_1.convertBits)((0, crypto_1.sha512_256)(entropyBytes).slice(0, this.checksumLength), 8, this.wordBitLength) || [])[0];
        const actualIdx = indexes[indexes.length - 1];
        if (expectedIdx !== actualIdx) {
            throw new exceptions_1.ChecksumError('Invalid checksum', {
                expected: wordList[expectedIdx],
                got: wordList[actualIdx]
            });
        }
        return (0, utils_1.bytesToString)(entropyBytes);
    }
    static normalize(input) {
        const arr = typeof input === 'string' ? input.trim().split(/\s+/) : input;
        return arr.map(w => w.normalize('NFKD').toLowerCase());
    }
}
exports.AlgorandMnemonic = AlgorandMnemonic;
//# sourceMappingURL=mnemonic.js.map