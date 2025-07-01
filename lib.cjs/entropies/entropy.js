"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entropy = void 0;
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
class Entropy {
    entropy;
    strength;
    static strengths;
    constructor(entropy) {
        const entropyBytes = (0, utils_1.getBytes)(entropy);
        const strength = entropyBytes.length;
        const constructor = this.constructor;
        if (constructor.getName() === 'Electrum-V2') {
            if (!constructor.areEntropyBitsEnough(entropyBytes)) {
                throw new exceptions_1.EntropyError('Entropy bits are not enough');
            }
            this.strength = BigInt((0, utils_1.bytesToInteger)(entropyBytes)).toString(2).length;
        }
        else {
            if (!constructor.isValidBytesStrength(strength))
                throw new exceptions_1.EntropyError('Unsupported entropy strength');
            this.strength = strength * 8;
        }
        this.entropy = (0, utils_1.bytesToHex)(entropyBytes);
    }
    static getName() {
        throw new Error('Must override getName()');
    }
    getName() {
        return this.constructor.getName();
    }
    getEntropy() {
        return this.entropy;
    }
    getStrength() {
        return this.strength;
    }
    static generate(strength) {
        if (!this.strengths.includes(strength)) {
            throw new Error(`Invalid strength ${strength}`);
        }
        return (0, utils_1.bytesToHex)(crypto.getRandomValues(new Uint8Array(strength / 8)));
    }
    static isValid(entropy) {
        return /^[0-9a-fA-F]+$/.test(entropy) && this.isValidStrength(entropy.length * 4);
    }
    static isValidStrength(strength) {
        return this.strengths.includes(strength);
    }
    static isValidBytesStrength(bytesStrength) {
        return this.isValidStrength(bytesStrength * 8);
    }
    static areEntropyBitsEnough(entropy) {
        throw new Error('Not implemented');
    }
}
exports.Entropy = Entropy;
//# sourceMappingURL=entropy.js.map