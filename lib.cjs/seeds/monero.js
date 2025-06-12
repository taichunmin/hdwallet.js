"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneroSeed = void 0;
const mnemonics_1 = require("../mnemonics");
const exceptions_1 = require("../exceptions");
const seed_1 = require("./seed");
class MoneroSeed extends seed_1.Seed {
    static getName() {
        return 'Monero';
    }
    static fromMnemonic(mnemonic) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        if (!mnemonics_1.MoneroMnemonic.isValid(phrase)) {
            throw new exceptions_1.MnemonicError(`Invalid ${this.getName()} mnemonic words`);
        }
        return mnemonics_1.MoneroMnemonic.decode(phrase);
    }
}
exports.MoneroSeed = MoneroSeed;
//# sourceMappingURL=monero.js.map