import { ISeed } from './iseed'
import { SeedError } from '../exceptions'
import { AlgorandSeed } from './algorand'
import { BIP39Seed } from './bip39'
import { CardanoSeed } from './cardano'
import { ElectrumV1Seed, ElectrumV2Seed } from './electrum'
import { MoneroSeed } from './monero'


export class SEEDS {
  private static dictionary: Record<string, any> = {
    [AlgorandSeed.client()]: AlgorandSeed,
    [BIP39Seed.client()]: BIP39Seed,
    [CardanoSeed.client()]: CardanoSeed,
    [ElectrumV1Seed.client()]: ElectrumV1Seed,
    [ElectrumV2Seed.client()]: ElectrumV2Seed,
    [MoneroSeed.client()]: MoneroSeed
  }

  static clients(): string[] {
    return Object.keys(this.dictionary)
  }

  static classes(): ISeed[] {
    return Object.values(this.dictionary)
  }

  static seed(name: string): string {
    if (!this.isSeed(name)) {
      throw new SeedError(
        'Invalid seed name', { expected: this.clients(), got: name }
      )
    }
    return this.dictionary[name]
  }

  static isSeed(name: string): boolean {
    return this.clients().includes(name)
  }
}

export {
  ISeed,
  AlgorandSeed,
  BIP39Seed,
  CardanoSeed,
  ElectrumV1Seed,
  ElectrumV2Seed,
  MoneroSeed
}