import { MnemonicError } from '../exceptions'
import { IMnemonic } from './imnemonic'
import {
  AlgorandMnemonic,
  ALGORAND_MNEMONIC_WORDS,
  ALGORAND_MNEMONIC_LANGUAGES
} from './algorand/mnemonic'
import {
  BIP39Mnemonic,
  BIP39_MNEMONIC_WORDS,
  BIP39_MNEMONIC_LANGUAGES
} from './bip39/mnemonic'
import {
  ElectrumV1Mnemonic,
  ELECTRUM_V1_MNEMONIC_WORDS,
  ELECTRUM_V1_MNEMONIC_LANGUAGES
} from './electrum/v1/mnemonic'
import {
  ElectrumV2Mnemonic,
  ELECTRUM_V2_MNEMONIC_WORDS,
  ELECTRUM_V2_MNEMONIC_LANGUAGES,
  ELECTRUM_V2_MNEMONIC_TYPES
} from './electrum/v2/mnemonic'
import {
  MoneroMnemonic,
  MONERO_MNEMONIC_WORDS,
  MONERO_MNEMONIC_LANGUAGES
} from './monero/mnemonic'

// type MnemonicClass = typeof IMnemonic & { name(): string }

// export class MNEMONICS {
//   private static dictionary: Record<string, MnemonicClass> = {
//     [AlgorandMnemonic.name()]: AlgorandMnemonic,
//     [BIP39Mnemonic.name()]: BIP39Mnemonic,
//     [ElectrumV1Mnemonic.name()]: ElectrumV1Mnemonic,
//     [ElectrumV2Mnemonic.name()]: ElectrumV2Mnemonic,
//     [MoneroMnemonic.name()]: MoneroMnemonic
//   }

//   static names(): string[] {
//     return Object.keys(this.dictionary)
//   }

//   static classes(): MnemonicClass[] {
//     return Object.values(this.dictionary)
//   }

//   static mnemonic(name: string): MnemonicClass {
//     if (!this.isMnemonic(name)) {
//       throw new MnemonicError(
//         'Invalid mnemonic name',
//         { expected: this.names(), got: name }
//       )
//     }
//     return this.dictionary[name]
//   }

//   static isMnemonic(name: string): boolean {
//     return this.names().includes(name)
//   }
// }

export {
  IMnemonic,
  AlgorandMnemonic,
  ALGORAND_MNEMONIC_WORDS,
  ALGORAND_MNEMONIC_LANGUAGES,
  BIP39Mnemonic,
  BIP39_MNEMONIC_WORDS,
  BIP39_MNEMONIC_LANGUAGES,
  ElectrumV1Mnemonic,
  ELECTRUM_V1_MNEMONIC_WORDS,
  ELECTRUM_V1_MNEMONIC_LANGUAGES,
  ElectrumV2Mnemonic,
  ELECTRUM_V2_MNEMONIC_WORDS,
  ELECTRUM_V2_MNEMONIC_LANGUAGES,
  ELECTRUM_V2_MNEMONIC_TYPES,
  MoneroMnemonic,
  MONERO_MNEMONIC_WORDS,
  MONERO_MNEMONIC_LANGUAGES,
  MnemonicError
}
