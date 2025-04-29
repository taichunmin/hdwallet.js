import { IMnemonic, MoneroMnemonic } from '../mnemonics';
import { MnemonicError } from '../exceptions';
import { ISeed } from './iseed';

export class MoneroSeed extends ISeed {
  constructor(seed: string) {
    super(seed);
  }

  static client(): string {
    return 'Monero';
  }

  static fromMnemonic(mnemonic: string | IMnemonic): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.mnemonic();
    if (!MoneroMnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid ${this.client()} mnemonic words`);
    }
    return MoneroMnemonic.decode(phrase);
  }
}
