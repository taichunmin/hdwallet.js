import { sha256 } from '../../crypto'
import { MnemonicError } from '../../exceptions'
import { IMnemonic, ElectrumV1Mnemonic } from '../../mnemonics'
import { bytesToString } from '../../utils'
import { ISeed } from '../iseed'

export class ElectrumV1Seed extends ISeed {
  static hashIterationNumber = 10 ** 5

  static client(): string {
    return 'Electrum-V1'
  }

  static fromMnemonic(mnemonic: string | IMnemonic): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.mnemonic()
    if (!ElectrumV1Mnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid ${this.client()} mnemonic words`)
    }

    const entropy = ElectrumV1Mnemonic.decode(phrase)
    const entropyBuffer = Buffer.from(entropy, 'utf8')
    let entropyHash = entropyBuffer

    for (let i = 0; i < this.hashIterationNumber; i++) {
      entropyHash = sha256(Buffer.concat([entropyHash, entropyBuffer]))
    }

    return bytesToString(entropyHash)
  }
}