"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectrumV2Seed = void 0;
const seed_1 = require("../seed");
const mnemonics_1 = require("../../mnemonics");
const crypto_1 = require("../../crypto");
const utils_1 = require("../../utils");
const exceptions_1 = require("../../exceptions");
class ElectrumV2Seed extends seed_1.Seed {
    static seedSaltModifier = 'electrum';
    static seedPbkdf2Rounds = 2048;
    static getName() {
        return 'Electrum-V2';
    }
    static fromMnemonic(mnemonic, options = {
        mnemonicType: mnemonics_1.ELECTRUM_V2_MNEMONIC_TYPES.STANDARD
    }) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        if (!mnemonics_1.ElectrumV2Mnemonic.isValid(phrase, { mnemonicType: options.mnemonicType })) {
            throw new exceptions_1.MnemonicError(`Invalid ${this.getName()} mnemonic words`);
        }
        const saltBase = (this.seedSaltModifier + (options.passphrase ?? '')).normalize('NFKD');
        const seedBytes = (0, crypto_1.pbkdf2HmacSha512)(phrase, saltBase, this.seedPbkdf2Rounds);
        return (0, utils_1.bytesToString)(seedBytes);
    }
    getMnemonicType() {
        if (!this.options?.mnemonicType) {
            throw new exceptions_1.SeedError('mnemonicType is not found');
        }
        return this.options?.mnemonicType;
    }
}
exports.ElectrumV2Seed = ElectrumV2Seed;
//# sourceMappingURL=v2.js.map