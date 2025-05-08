// SPDX-License-Identifier: MIT

import { getBytes, bytesToHex, bytesToInteger } from '../utils';
import { EntropyError } from '../exceptions';

export class Entropy {

  protected entropy: string;
  protected strength: number;

  static strengths: number[];

  constructor(entropy: string) {

    const entropyBytes = getBytes(entropy);
    const strength = entropyBytes.length;
    const constructor = this.constructor as typeof Entropy;

    if (constructor.getName() === 'Electrum-V2') {
      if (!constructor.areEntropyBitsEnough(entropyBytes)) {
        throw new EntropyError('Entropy bits are not enough');
      }
      this.strength = BigInt(bytesToInteger(entropyBytes)).toString(2).length;
    } else {
      if (!constructor.isValidBytesStrength(strength))
        throw new EntropyError('Unsupported entropy strength');
      this.strength = strength * 8;
    }
    this.entropy = bytesToHex(entropyBytes);
  }

  static getName(): string {
    throw new Error('Must override getName()');
  }

  getEntropy(): string {
    return this.entropy;
  }

  getStrength(): number {
    return this.strength;
  }

  static generate(strength: number): string {

    if (!this.strengths.includes(strength)) {
      throw new Error(`Invalid strength ${strength}`);
    }
    return bytesToHex(crypto.getRandomValues(
      new Uint8Array(strength / 8)
    ));
  }

  static isValid(entropy: string): boolean {
    return /^[0-9a-fA-F]+$/.test(entropy) && this.isValidStrength(entropy.length * 4);
  }

  static isValidStrength(strength: number): boolean {
    return this.strengths.includes(strength);
  }

  static isValidBytesStrength(bytesStrength: number): boolean {
    return this.isValidStrength(bytesStrength * 8);
  }

  static areEntropyBitsEnough(entropy: Uint8Array | number): boolean {
    throw new Error('Not implemented');
  }
}