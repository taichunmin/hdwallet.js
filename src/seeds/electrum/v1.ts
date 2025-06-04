// SPDX-License-Identifier: MIT

import { Seed } from '../seed';
import { sha256 } from '../../crypto';
import { Mnemonic, ElectrumV1Mnemonic } from '../../mnemonics';
import { bytesToString, concatBytes } from '../../utils';
import { MnemonicError } from '../../exceptions';

export class ElectrumV1Seed extends Seed {

  static hashIterationNumber = 10 ** 5

  static getName(): string {
    return 'Electrum-V1';
  }

  static fromMnemonic(mnemonic: string | Mnemonic): string {

    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();

    if (!ElectrumV1Mnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid ${this.getName()} mnemonic words`);
    }
    const entropy = ElectrumV1Mnemonic.decode(phrase);
    const entropyBuffer = Buffer.from(entropy, 'utf8');
    let entropyHash = entropyBuffer;

    for (let i = 0; i < this.hashIterationNumber; i++) {
      entropyHash = sha256(concatBytes(entropyHash, entropyBuffer));
    }
    return bytesToString(entropyHash);
  }
}