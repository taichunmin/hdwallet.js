// SPDX-License-Identifier: MIT

import { Seed } from '../seed';
import { Mnemonic, ElectrumV2Mnemonic, ELECTRUM_V2_MNEMONIC_TYPES } from '../../mnemonics';
import { SeedOptionsInterface } from '../../interfaces';
import { pbkdf2HmacSha512 } from '../../crypto';
import { bytesToString } from '../../utils';
import { MnemonicError, SeedError } from '../../exceptions';

export class ElectrumV2Seed extends Seed {

  static seedSaltModifier = 'electrum'
  static seedPbkdf2Rounds = 2048

  static getName(): string {
    return 'Electrum-V2';
  }

  static fromMnemonic(
    mnemonic: string | Mnemonic, options: SeedOptionsInterface = {
      mnemonicType: ELECTRUM_V2_MNEMONIC_TYPES.STANDARD
    }
  ): string {

    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
    if (!ElectrumV2Mnemonic.isValid(phrase, { mnemonicType: options.mnemonicType })) {
      throw new MnemonicError(`Invalid ${this.getName()} mnemonic words`);
    }

    const saltBase = (this.seedSaltModifier + (options.passphrase ?? '')).normalize('NFKD');
    const seedBytes = pbkdf2HmacSha512(
      phrase, saltBase, this.seedPbkdf2Rounds
    );
    return bytesToString(seedBytes)
  }

  getMnemonicType(): string {
    if (!this.options?.mnemonicType) {
      throw new SeedError('mnemonicType is not found');
    }
    return this.options?.mnemonicType;
  }
}