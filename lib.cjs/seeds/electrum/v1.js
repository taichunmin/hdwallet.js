"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectrumV1Seed = void 0;
const seed_1 = require("../seed");
const mnemonics_1 = require("../../mnemonics");
const crypto_1 = require("../../crypto");
const utils_1 = require("../../utils");
const exceptions_1 = require("../../exceptions");
class ElectrumV1Seed extends seed_1.Seed {
    static hashIterationNumber = 10 ** 5;
    static getName() {
        return 'Electrum-V1';
    }
    static fromMnemonic(mnemonic) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        if (!mnemonics_1.ElectrumV1Mnemonic.isValid(phrase)) {
            throw new exceptions_1.MnemonicError(`Invalid ${this.getName()} mnemonic words`);
        }
        const entropy = mnemonics_1.ElectrumV1Mnemonic.decode(phrase);
        const entropyBuffer = (0, utils_1.toBuffer)(entropy, 'utf8');
        let entropyHash = entropyBuffer;
        for (let i = 0; i < this.hashIterationNumber; i++) {
            entropyHash = (0, crypto_1.sha256)((0, utils_1.concatBytes)(entropyHash, entropyBuffer));
        }
        return (0, utils_1.bytesToString)(entropyHash);
    }
}
exports.ElectrumV1Seed = ElectrumV1Seed;
//# sourceMappingURL=v1.js.map