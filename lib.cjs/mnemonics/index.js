"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONERO_MNEMONIC_LANGUAGES = exports.MONERO_MNEMONIC_WORDS = exports.MoneroMnemonic = exports.ELECTRUM_V2_MNEMONIC_TYPES = exports.ELECTRUM_V2_MNEMONIC_LANGUAGES = exports.ELECTRUM_V2_MNEMONIC_WORDS = exports.ElectrumV2Mnemonic = exports.ELECTRUM_V1_MNEMONIC_LANGUAGES = exports.ELECTRUM_V1_MNEMONIC_WORDS = exports.ElectrumV1Mnemonic = exports.BIP39_MNEMONIC_LANGUAGES = exports.BIP39_MNEMONIC_WORDS = exports.BIP39Mnemonic = exports.ALGORAND_MNEMONIC_LANGUAGES = exports.ALGORAND_MNEMONIC_WORDS = exports.AlgorandMnemonic = exports.Mnemonic = exports.MNEMONICS = void 0;
const mnemonic_1 = require("./mnemonic");
Object.defineProperty(exports, "Mnemonic", { enumerable: true, get: function () { return mnemonic_1.Mnemonic; } });
const mnemonic_2 = require("./algorand/mnemonic");
Object.defineProperty(exports, "AlgorandMnemonic", { enumerable: true, get: function () { return mnemonic_2.AlgorandMnemonic; } });
Object.defineProperty(exports, "ALGORAND_MNEMONIC_WORDS", { enumerable: true, get: function () { return mnemonic_2.ALGORAND_MNEMONIC_WORDS; } });
Object.defineProperty(exports, "ALGORAND_MNEMONIC_LANGUAGES", { enumerable: true, get: function () { return mnemonic_2.ALGORAND_MNEMONIC_LANGUAGES; } });
const mnemonic_3 = require("./bip39/mnemonic");
Object.defineProperty(exports, "BIP39Mnemonic", { enumerable: true, get: function () { return mnemonic_3.BIP39Mnemonic; } });
Object.defineProperty(exports, "BIP39_MNEMONIC_WORDS", { enumerable: true, get: function () { return mnemonic_3.BIP39_MNEMONIC_WORDS; } });
Object.defineProperty(exports, "BIP39_MNEMONIC_LANGUAGES", { enumerable: true, get: function () { return mnemonic_3.BIP39_MNEMONIC_LANGUAGES; } });
const mnemonic_4 = require("./electrum/v1/mnemonic");
Object.defineProperty(exports, "ElectrumV1Mnemonic", { enumerable: true, get: function () { return mnemonic_4.ElectrumV1Mnemonic; } });
Object.defineProperty(exports, "ELECTRUM_V1_MNEMONIC_WORDS", { enumerable: true, get: function () { return mnemonic_4.ELECTRUM_V1_MNEMONIC_WORDS; } });
Object.defineProperty(exports, "ELECTRUM_V1_MNEMONIC_LANGUAGES", { enumerable: true, get: function () { return mnemonic_4.ELECTRUM_V1_MNEMONIC_LANGUAGES; } });
const mnemonic_5 = require("./electrum/v2/mnemonic");
Object.defineProperty(exports, "ElectrumV2Mnemonic", { enumerable: true, get: function () { return mnemonic_5.ElectrumV2Mnemonic; } });
Object.defineProperty(exports, "ELECTRUM_V2_MNEMONIC_WORDS", { enumerable: true, get: function () { return mnemonic_5.ELECTRUM_V2_MNEMONIC_WORDS; } });
Object.defineProperty(exports, "ELECTRUM_V2_MNEMONIC_LANGUAGES", { enumerable: true, get: function () { return mnemonic_5.ELECTRUM_V2_MNEMONIC_LANGUAGES; } });
Object.defineProperty(exports, "ELECTRUM_V2_MNEMONIC_TYPES", { enumerable: true, get: function () { return mnemonic_5.ELECTRUM_V2_MNEMONIC_TYPES; } });
const mnemonic_6 = require("./monero/mnemonic");
Object.defineProperty(exports, "MoneroMnemonic", { enumerable: true, get: function () { return mnemonic_6.MoneroMnemonic; } });
Object.defineProperty(exports, "MONERO_MNEMONIC_WORDS", { enumerable: true, get: function () { return mnemonic_6.MONERO_MNEMONIC_WORDS; } });
Object.defineProperty(exports, "MONERO_MNEMONIC_LANGUAGES", { enumerable: true, get: function () { return mnemonic_6.MONERO_MNEMONIC_LANGUAGES; } });
const exceptions_1 = require("../exceptions");
class MNEMONICS {
    static dictionary = {
        [mnemonic_2.AlgorandMnemonic.getName()]: mnemonic_2.AlgorandMnemonic,
        [mnemonic_3.BIP39Mnemonic.getName()]: mnemonic_3.BIP39Mnemonic,
        [mnemonic_4.ElectrumV1Mnemonic.getName()]: mnemonic_4.ElectrumV1Mnemonic,
        [mnemonic_5.ElectrumV2Mnemonic.getName()]: mnemonic_5.ElectrumV2Mnemonic,
        [mnemonic_6.MoneroMnemonic.getName()]: mnemonic_6.MoneroMnemonic
    };
    static getNames() {
        return Object.keys(this.dictionary);
    }
    static getClasses() {
        return Object.values(this.dictionary);
    }
    static getMnemonicClass(name) {
        if (!this.isMnemonic(name)) {
            throw new exceptions_1.MnemonicError('Invalid Mnemonic name', { expected: this.getNames(), got: name });
        }
        return this.dictionary[name];
    }
    static isMnemonic(name) {
        return this.getNames().includes(name);
    }
}
exports.MNEMONICS = MNEMONICS;
//# sourceMappingURL=index.js.map