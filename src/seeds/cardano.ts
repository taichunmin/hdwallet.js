import { encode as cborEncode } from 'cbor'
import { IMnemonic, BIP39Mnemonic } from '../mnemonics'
import { blake2b256 } from '../crypto'
import { getBytes, bytesToString } from '../utils'
import { MnemonicError, SeedError } from '../exceptions'
import { SeedOptionsInterface, ISeed, BIP39Seed } from './'
import { Cardano } from '../cryptocurrencies'

export class CardanoSeed extends ISeed {
  private _cardanoType: string

  constructor(seed: string, options: SeedOptionsInterface = {cardanoType: Cardano.TYPES.BYRON_ICARUS}) {
    super(seed, options)

    if (options.cardanoType && !Cardano.TYPES.isCardanoType(options.cardanoType)) {
      throw new SeedError(
        'Invalid Cardano type',
        { expected: Cardano.TYPES.getCardanoTypes(), got: options.cardanoType }
      )
    }
  
    this._cardanoType = options.cardanoType ?? Cardano.TYPES.BYRON_ICARUS
  }

  static client(): string {
    return 'Cardano'
  }

  cardanoType(): string {
    return this._cardanoType
  }

  static fromMnemonic(
    mnemonic: string | IMnemonic,
    cardanoType: string = Cardano.TYPES.BYRON_ICARUS,
    passphrase?: string
  ): string {
    switch (cardanoType) {
      case Cardano.TYPES.BYRON_ICARUS:
        return this.generateByronIcarus(mnemonic)
      case Cardano.TYPES.BYRON_LEDGER:
        return this.generateByronLedger(mnemonic, passphrase)
      case Cardano.TYPES.BYRON_LEGACY:
        return this.generateByronLegacy(mnemonic)
      case Cardano.TYPES.SHELLEY_ICARUS:
        return this.generateShelleyIcarus(mnemonic)
      case Cardano.TYPES.SHELLEY_LEDGER:
        return this.generateShelleyLedger(mnemonic, passphrase)
      default:
        throw new SeedError(
          'Invalid Cardano type',
          { expected: Cardano.TYPES.getCardanoTypes(), got: cardanoType }
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
    const rawBytes = Buffer.from(decoded, 'hex');
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
