"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectrumV1Mnemonic = exports.ELECTRUM_V1_MNEMONIC_LANGUAGES = exports.ELECTRUM_V1_MNEMONIC_WORDS = void 0;
const mnemonic_1 = require("../../mnemonic");
const entropies_1 = require("../../../entropies");
const utils_1 = require("../../../utils");
const exceptions_1 = require("../../../exceptions");
const wordlists_1 = require("./wordlists");
exports.ELECTRUM_V1_MNEMONIC_WORDS = {
    TWELVE: 12,
};
exports.ELECTRUM_V1_MNEMONIC_LANGUAGES = {
    ENGLISH: 'english'
};
class ElectrumV1Mnemonic extends mnemonic_1.Mnemonic {
    static wordsListNumber = 1626;
    static wordsList = [
        exports.ELECTRUM_V1_MNEMONIC_WORDS.TWELVE,
    ];
    static wordsToStrength = {
        [exports.ELECTRUM_V1_MNEMONIC_WORDS.TWELVE]: entropies_1.ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
    };
    static languages = Object.values(exports.ELECTRUM_V1_MNEMONIC_LANGUAGES);
    static wordLists = {
        [exports.ELECTRUM_V1_MNEMONIC_LANGUAGES.ENGLISH]: wordlists_1.ELECTRUM_V1_ENGLISH_WORDLIST
    };
    static getName() {
        return 'Electrum-V1';
    }
    static fromWords(count, language, options = {}) {
        if (!this.wordsList.includes(count)) {
            throw new exceptions_1.MnemonicError('Invalid mnemonic words number', { expected: this.wordsList, got: count });
        }
        const entropy = entropies_1.ElectrumV1Entropy.generate(this.wordsToStrength[count]);
        return this.encode(entropy, language, options);
    }
    static fromEntropy(entropy, language, options = {}) {
        let raw;
        if (typeof entropy === 'string') {
            raw = (0, utils_1.hexToBytes)(entropy);
        }
        else if (entropy instanceof Uint8Array) {
            raw = entropy;
        }
        else {
            raw = (0, utils_1.hexToBytes)(entropy.getEntropy());
        }
        return this.encode(raw, language, options);
    }
    static encode(entropy, language, options = {}) {
        const entropyBytes = (0, utils_1.getBytes)(entropy);
        if (!entropies_1.ElectrumV1Entropy.isValidBytesStrength(entropyBytes.length)) {
            throw new exceptions_1.EntropyError('Wrong entropy strength', { expected: entropies_1.ElectrumV1Entropy.strengths, got: entropyBytes.length * 8 });
        }
        const rawList = this.getWordsListByLanguage(language, this.wordLists);
        const wordList = this.normalize(rawList);
        const wl = wordList.length;
        const mnemonic = [];
        for (let i = 0; i < entropyBytes.length; i += 4) {
            const chunkBytes = entropyBytes.slice(i, i + 4);
            // big-endian → bigint → number
            const chunkInt = Number((0, utils_1.bytesToInteger)(chunkBytes, false));
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
            throw new exceptions_1.MnemonicError('Invalid mnemonic words count', {
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
            const chunkBytes = (0, utils_1.integerToBytes)(chunkVal, 4, 'big');
            bufs.push((0, utils_1.getBytes)(chunkBytes));
        }
        return (0, utils_1.bytesToHex)((0, utils_1.concatBytes)(...bufs), false);
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
exports.ElectrumV1Mnemonic = ElectrumV1Mnemonic;
//# sourceMappingURL=mnemonic.js.map