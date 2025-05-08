// SPDX-License-Identifier: MIT

import { randomBytes } from 'crypto';

import { integerToBytes, bytesToHex, hexToBytes, bytesToInteger } from '../../utils';
import { IEntropy } from '../ientropy';

export const ELECTRUM_V2_ENTROPY_STRENGTHS = {
  ONE_HUNDRED_THIRTY_TWO: 132,
  TWO_HUNDRED_SIXTY_FOUR: 264
} as const;

export class ElectrumV2Entropy extends IEntropy {

  static strengths: number[] = [
    ELECTRUM_V2_ENTROPY_STRENGTHS.ONE_HUNDRED_THIRTY_TWO,
    ELECTRUM_V2_ENTROPY_STRENGTHS.TWO_HUNDRED_SIXTY_FOUR
  ];

  static getName(): string {
    return 'Electrum-V2';
  }

  static generate(strength: number): string {

    if (!this.strengths.includes(strength)) {
      throw new Error(`Invalid strength ${strength}`);
    }

    const byteLen = Math.ceil(strength / 8);
    const mask = (BigInt(1) << BigInt(strength)) - BigInt(1);
    const rndBuf = randomBytes(byteLen);
    let rnd = BigInt('0x' + rndBuf.toString('hex')) & mask;
    const msbMask = BigInt(1) << BigInt(strength - 1);
    const combined = msbMask | rnd;
    const outBytes = integerToBytes(combined, byteLen);
    return bytesToHex(outBytes);
  }

  static isValid(entropy: string): boolean {
    return /^[0-9a-fA-F]+$/.test(entropy) && this.areEntropyBitsEnough(hexToBytes(entropy));
  }

  static isValidStrength(strength: number): boolean {
    return this.strengths.some((s) => strength >= s - 11 && strength <= s);
  }

  static areEntropyBitsEnough(entropy: Uint8Array | number): boolean {
    let intVal: bigint = entropy instanceof Uint8Array ? bytesToInteger(entropy) : BigInt(entropy);
    if (intVal <= BigInt(0)) return false;
    const entropyStrength = intVal.toString(2).length - 1;
    return this.isValidStrength(entropyStrength);
  }
}
