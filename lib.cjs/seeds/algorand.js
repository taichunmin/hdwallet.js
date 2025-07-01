"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorandSeed = void 0;
const seed_1 = require("./seed");
const mnemonics_1 = require("../mnemonics");
const exceptions_1 = require("../exceptions");
class AlgorandSeed extends seed_1.Seed {
    static getName() {
        return 'Algorand';
    }
    static fromMnemonic(mnemonic) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        if (!mnemonics_1.AlgorandMnemonic.isValid(phrase)) {
            throw new exceptions_1.MnemonicError(`Invalid ${this.getName()} mnemonic words`);
        }
        return mnemonics_1.AlgorandMnemonic.decode(phrase);
    }
}
exports.AlgorandSeed = AlgorandSeed;
//# sourceMappingURL=algorand.js.map