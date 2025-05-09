// SPDX-License-Identifier: MIT

import { Mnemonic, MoneroMnemonic } from '../mnemonics';
import { MnemonicError } from '../exceptions';
import { Seed } from './seed';

export class MoneroSeed extends Seed {

  static getName(): string {
    return 'Monero';
  }

  static fromMnemonic(mnemonic: string | Mnemonic): string {

    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();

    if (!MoneroMnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid ${this.getName()} mnemonic words`);
    }
    return MoneroMnemonic.decode(phrase);
  }
}
