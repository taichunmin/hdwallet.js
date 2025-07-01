// SPDX-License-Identifier: MIT
import { getBytes, bytesToHex, bytesToInteger } from '../utils';
import { EntropyError } from '../exceptions';
export class Entropy {
    entropy;
    strength;
    static strengths;
    constructor(entropy) {
        const entropyBytes = getBytes(entropy);
        const strength = entropyBytes.length;
        const constructor = this.constructor;
        if (constructor.getName() === 'Electrum-V2') {
            if (!constructor.areEntropyBitsEnough(entropyBytes)) {
                throw new EntropyError('Entropy bits are not enough');
            }
            this.strength = BigInt(bytesToInteger(entropyBytes)).toString(2).length;
        }
        else {
            if (!constructor.isValidBytesStrength(strength))
                throw new EntropyError('Unsupported entropy strength');
            this.strength = strength * 8;
        }
        this.entropy = bytesToHex(entropyBytes);
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
        return bytesToHex(crypto.getRandomValues(new Uint8Array(strength / 8)));
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
//# sourceMappingURL=entropy.js.map