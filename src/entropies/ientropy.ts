import { EntropyError } from "../exceptions";
import { getBytes, bytesToHex, hexToBytes, bytesToInteger } from "../utils";

export abstract class IEntropy {

  protected _entropy: string;
  protected _strength: number;

  static strengths: number[];

  constructor(entropy: Uint8Array | string) {
    const entropyBytes: Uint8Array = getBytes(entropy);
    const strength: number = entropyBytes.length;
    const constructor = this.constructor as typeof IEntropy;

    if (constructor.client() === "Electrum-V2") {
      if (!constructor.areEntropyBitsEnough(entropyBytes))
        throw new EntropyError("Entropy bits are not enough");
      this._strength = BigInt(bytesToInteger(entropyBytes)).toString(2).length;
    } else {
      if (!constructor.isValidBytesStrength(strength))
        throw new EntropyError("Unsupported entropy strength");
      this._strength = strength * 8;
    }
    this._entropy = bytesToHex(entropyBytes);
  }

  static client(): string {
    return "IEntropy"
  }

  entropy(): string {
    return this._entropy;
  }

  strength(): number {
    return this._strength;
  }

  static generate(strength: number): string {
    if (!this.strengths.includes(strength)) {
      throw new Error(`Invalid strength ${strength}`);
    }
    const rnd = crypto.getRandomValues(new Uint8Array(strength / 8));
    return bytesToHex(rnd);
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
    throw new Error("Not implemented");
  }
}