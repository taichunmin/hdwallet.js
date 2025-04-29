import { pbkdf2HmacSha512 } from '../../crypto'
import { MnemonicError } from '../../exceptions'
import { IMnemonic, ElectrumV2Mnemonic, ELECTRUM_V2_MNEMONIC_TYPES } from '../../mnemonics'
import { bytesToString } from '../../utils'
import { ISeed } from '../iseed'

export class ElectrumV2Seed extends ISeed {
  static seedSaltModifier = 'electrum'
  static seedPbkdf2Rounds = 2048

  static client(): string {
    return 'Electrum-V2'
  }

  static fromMnemonic(
    mnemonic: string | IMnemonic,
    passphrase?: string,
    mnemonicType: string = ELECTRUM_V2_MNEMONIC_TYPES.STANDARD
  ): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.mnemonic()
    if (!ElectrumV2Mnemonic.isValid(phrase, {mnemonicType: mnemonicType})) {
      throw new MnemonicError(`Invalid ${this.client()} mnemonic words`)
    }

    // Inline encode: normalize and convert to Buffer for salt
    const saltBase = (this.seedSaltModifier + (passphrase ?? '')).normalize('NFKD')
    const seedBytes = pbkdf2HmacSha512(
      phrase,
      saltBase,
      this.seedPbkdf2Rounds
    )

    return bytesToString(seedBytes)
  }
}