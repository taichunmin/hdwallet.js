import { encode as cborEncode } from 'cbor'
import { IMnemonic, BIP39Mnemonic } from '../mnemonics'
import { blake2b256 } from '../crypto'
import { getBytes, bytesToString } from '../utils'
import { MnemonicError, SeedError } from '../exceptions'
import { ISeed, BIP39Seed } from './'


export class CardanoTypes {
  static BYRON_ICARUS = 'byron-icarus'
  static BYRON_LEDGER = 'byron-ledger'
  static BYRON_LEGACY = 'byron-legacy'
  static SHELLEY_ICARUS = 'shelley-icarus'
  static SHELLEY_LEDGER = 'shelley-ledger'

  static getCardanoTypes(): string[] {
    return [
      CardanoTypes.BYRON_ICARUS,
      CardanoTypes.BYRON_LEDGER,
      CardanoTypes.BYRON_LEGACY,
      CardanoTypes.SHELLEY_ICARUS,
      CardanoTypes.SHELLEY_LEDGER,
    ]
  }

  static isCardanoType(type: string): boolean {
    return this.getCardanoTypes().includes(type)
  }
}

export class CardanoSeed extends ISeed {
  private _cardanoType: string

  constructor(
    seed: string,
    cardanoType: string = CardanoTypes.BYRON_ICARUS,
    passphrase?: string
  ) {
    super(seed, { cardanoType, passphrase })

    if (!CardanoTypes.isCardanoType(cardanoType)) {
      throw new SeedError(
        'Invalid Cardano type',
        { expected: CardanoTypes.getCardanoTypes(), got: cardanoType }
      )
    }

    this._cardanoType = cardanoType
  }

  static client(): string {
    return 'Cardano'
  }

  cardanoType(): string {
    return this._cardanoType
  }

  static fromMnemonic(
    mnemonic: string | IMnemonic,
    passphrase?: string,
    cardanoType: string = CardanoTypes.BYRON_ICARUS
  ): string {
    switch (cardanoType) {
      case CardanoTypes.BYRON_ICARUS:
        return this.generateByronIcarus(mnemonic)
      case CardanoTypes.BYRON_LEDGER:
        return this.generateByronLedger(mnemonic, passphrase)
      case CardanoTypes.BYRON_LEGACY:
        return this.generateByronLegacy(mnemonic)
      case CardanoTypes.SHELLEY_ICARUS:
        return this.generateShelleyIcarus(mnemonic)
      case CardanoTypes.SHELLEY_LEDGER:
        return this.generateShelleyLedger(mnemonic, passphrase)
      default:
        throw new SeedError(
          'Invalid Cardano type',
          { expected: CardanoTypes.getCardanoTypes(), got: cardanoType }
        )
    }
  }

  private static generateByronIcarus(mnemonic: string | IMnemonic): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.mnemonic()
    if (!BIP39Mnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid ${this.client()} mnemonic words`)
    }
    return BIP39Mnemonic.decode(phrase)
  }

  private static generateByronLedger(
    mnemonic: string | IMnemonic,
    passphrase?: string
  ): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.mnemonic()
    return BIP39Seed.fromMnemonic(phrase, passphrase)
  }

  private static generateByronLegacy(mnemonic: string | IMnemonic): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.mnemonic()
    if (!BIP39Mnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid ${this.client()} mnemonic words`)
    }
    const decoded = BIP39Mnemonic.decode(phrase)
    const rawBytes = getBytes(decoded)
    const cborBytes = cborEncode(rawBytes)
    const hash = blake2b256(cborBytes)
    return bytesToString(hash)
  }

  private static generateShelleyIcarus(mnemonic: string | IMnemonic): string {
    return this.generateByronIcarus(mnemonic)
  }

  private static generateShelleyLedger(
    mnemonic: string | IMnemonic,
    passphrase?: string
  ): string {
    return this.generateByronLedger(mnemonic, passphrase)
  }
}
