"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectrumV2Entropy = exports.ELECTRUM_V2_ENTROPY_STRENGTHS = void 0;
const utils_1 = require("../../utils");
const entropy_1 = require("../entropy");
exports.ELECTRUM_V2_ENTROPY_STRENGTHS = {
    ONE_HUNDRED_THIRTY_TWO: 132,
    TWO_HUNDRED_SIXTY_FOUR: 264
};
class ElectrumV2Entropy extends entropy_1.Entropy {
    static strengths = [
        exports.ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO,
        exports.ELECTRUM_V2_ENTROPY_STRENGTHS.TWO_HUNDRED_SIXTY_FOUR
    ];
    static getName() {
        return 'Electrum-V2';
    }
    static generate(strength) {
        if (!this.strengths.includes(strength)) {
            throw new Error(`Invalid strength ${strength}`);
        }
        const byteLen = Math.ceil(strength / 8);
        const mask = (BigInt(1) << BigInt(strength)) - BigInt(1);
        const rndBuf = (0, utils_1.randomBytes)(byteLen);
        let rnd = BigInt('0x' + (0, utils_1.bytesToString)(rndBuf)) & mask;
        const msbMask = BigInt(1) << BigInt(strength - 1);
        const combined = msbMask | rnd;
        const outBytes = (0, utils_1.integerToBytes)(combined, byteLen);
        return (0, utils_1.bytesToHex)(outBytes);
    }
    static isValid(entropy) {
        return /^[0-9a-fA-F]+$/.test(entropy) && this.areEntropyBitsEnough((0, utils_1.hexToBytes)(entropy));
    }
    static isValidStrength(strength) {
        return this.strengths.some((s) => strength >= s - 11 && strength <= s);
    }
    static areEntropyBitsEnough(entropy) {
        let intVal = entropy instanceof Uint8Array ? (0, utils_1.bytesToInteger)(entropy) : BigInt(entropy);
        if (intVal <= BigInt(0))
            return false;
        const entropyStrength = intVal.toString(2).length - 1;
        return this.isValidStrength(entropyStrength);
    }
}
exports.ElectrumV2Entropy = ElectrumV2Entropy;
//# sourceMappingURL=v2.js.map