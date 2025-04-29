import { AlgorandEntropy, ALGORAND_ENTROPY_STRENGTHS } from "./algorand";
import { BIP39Entropy, BIP39_ENTROPY_STRENGTHS } from "./bip39";
import { ElectrumV1Entropy, ELECTRUM_V1_ENTROPY_STRENGTHS } from "./electrum/v1";
import { ElectrumV2Entropy, ELECTRUM_V2_ENTROPY_STRENGTHS } from "./electrum/v2";
import { MoneroEntropy, MONERO_ENTROPY_STRENGTHS } from "./monero";
import { IEntropy } from "./ientropy";
import { EntropyError } from "../exceptions";

type EntropyConstructor = new (entropy: Uint8Array | string) => IEntropy;

export class ENTROPIES {

  static dictionary: Record<string, EntropyConstructor> = {
    [AlgorandEntropy.client()]: AlgorandEntropy,
    [BIP39Entropy.client()]: BIP39Entropy,
    [ElectrumV1Entropy.client()]: ElectrumV1Entropy,
    [ElectrumV2Entropy.client()]: ElectrumV2Entropy,
    [MoneroEntropy.client()]: MoneroEntropy,
  };

  static clients(): string[] {
    return Object.keys(this.dictionary);
  }

  static classes(): EntropyConstructor[] {
    return Object.values(this.dictionary);
  }

  static entropy(name: string): EntropyConstructor {
    if (!this.isEntropy(name)) {
      throw new EntropyError(`Invalid entropy name: ${name}. Expected one of ${this.clients().join(", ")}`);
    }
    return this.dictionary[name];
  }

  static isEntropy(name: string): boolean {
    return this.clients().includes(name);
  }
}
