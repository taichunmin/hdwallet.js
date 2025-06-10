// SPDX-License-Identifier: MIT

import { encode } from 'cbor2';

import { Seed } from './seed';
import { BIP39Seed } from './bip39';
import { SeedOptionsInterface } from '../interfaces';
import { Cardano } from '../cryptocurrencies'
import { Mnemonic, BIP39Mnemonic } from '../mnemonics'
import { blake2b256 } from '../crypto'
import { bytesToString, hexToBytes } from '../utils'
import { MnemonicError, SeedError } from '../exceptions'

export class CardanoSeed extends Seed {

  constructor(
    seed: string, options: SeedOptionsInterface = {
      cardanoType: Cardano.TYPES.BYRON_ICARUS
    }
  ) {
    if (options.cardanoType && !Cardano.TYPES.isCardanoType(options.cardanoType)) {
      throw new SeedError(
        'Invalid Cardano type', {
          expected: Cardano.TYPES.getCardanoTypes(), got: options.cardanoType
        }
      )
    }
    super(seed, options);
  }

  static getName(): string {
    return 'Cardano'
  }

  getCardanoType(): string {
    if (!this.options?.cardanoType) {
      throw new SeedError('cardanoType is not found');
    }
    return this.options?.cardanoType;
  }

  static fromMnemonic(
    mnemonic: string | Mnemonic, options: SeedOptionsInterface = {
      cardanoType: Cardano.TYPES.BYRON_ICARUS
    }
  ): string {
    switch (options.cardanoType) {
      case Cardano.TYPES.BYRON_ICARUS:
        return this.generateByronIcarus(mnemonic);
      case Cardano.TYPES.BYRON_LEDGER:
        return this.generateByronLedger(mnemonic, options.passphrase);
      case Cardano.TYPES.BYRON_LEGACY:
        return this.generateByronLegacy(mnemonic);
      case Cardano.TYPES.SHELLEY_ICARUS:
        return this.generateShelleyIcarus(mnemonic);
      case Cardano.TYPES.SHELLEY_LEDGER:
        return this.generateShelleyLedger(mnemonic, options.passphrase)
      default:
        throw new SeedError(
          'Invalid Cardano type', {
            expected: Cardano.TYPES.getCardanoTypes(), got: options.cardanoType
          }
        )
    }
  }

  private static generateByronIcarus(mnemonic: string | Mnemonic): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
    if (!BIP39Mnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid Cardano mnemonic words`);
    }
    return BIP39Mnemonic.decode(phrase);
  }

  private static generateByronLedger(mnemonic: string | Mnemonic, passphrase?: string | null): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
    return BIP39Seed.fromMnemonic(phrase, { passphrase: passphrase });
  }

  private static generateByronLegacy(mnemonic: string | Mnemonic): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
    if (!BIP39Mnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid Cardano mnemonic words`);
    }
    const decoded = BIP39Mnemonic.decode(phrase);
    const rawBytes = hexToBytes(decoded);
    const cborBytes = encode(rawBytes);
    const hash = blake2b256(cborBytes);
    return bytesToString(hash);
  }

  private static generateShelleyIcarus(mnemonic: string | Mnemonic): string {
    return this.generateByronIcarus(mnemonic);
  }

  private static generateShelleyLedger(mnemonic: string | Mnemonic, passphrase?: string | null): string {
    return this.generateByronLedger(mnemonic, passphrase);
  }
}
