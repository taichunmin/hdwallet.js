// SPDX-License-Identifier: MIT
import { randomBytes, integerToBytes, bytesToHex, hexToBytes, bytesToInteger, bytesToString } from '../../utils';
import { Entropy } from '../entropy';
export const ELECTRUM_V2_ENTROPY_STRENGTHS = {
    ONE_HUNDRED_THIRTY_TWO: 132,
    TWO_HUNDRED_SIXTY_FOUR: 264
};
export class ElectrumV2Entropy extends Entropy {
    static strengths = [
        ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO,
        ELECTRUM_V2_ENTROPY_STRENGTHS.TWO_HUNDRED_SIXTY_FOUR
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
        const rndBuf = randomBytes(byteLen);
        let rnd = BigInt('0x' + bytesToString(rndBuf)) & mask;
        const msbMask = BigInt(1) << BigInt(strength - 1);
        const combined = msbMask | rnd;
        const outBytes = integerToBytes(combined, byteLen);
        return bytesToHex(outBytes);
    }
    static isValid(entropy) {
        return /^[0-9a-fA-F]+$/.test(entropy) && this.areEntropyBitsEnough(hexToBytes(entropy));
    }
    static isValidStrength(strength) {
        return this.strengths.some((s) => strength >= s - 11 && strength <= s);
    }
    static areEntropyBitsEnough(entropy) {
        let intVal = entropy instanceof Uint8Array ? bytesToInteger(entropy) : BigInt(entropy);
        if (intVal <= BigInt(0))
            return false;
        const entropyStrength = intVal.toString(2).length - 1;
        return this.isValidStrength(entropyStrength);
    }
}
//# sourceMappingURL=v2.js.map