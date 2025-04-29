import { IMnemonic, AlgorandMnemonic } from '../mnemonics';
import { MnemonicError } from '../exceptions';
import { ISeed } from './iseed';

export class AlgorandSeed extends ISeed {
  constructor(seed: string) {
    super(seed);
  }

  static client(): string {
    return 'Algorand';
  }

  static fromMnemonic(mnemonic: string | IMnemonic): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.mnemonic();
    if (!AlgorandMnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid ${this.client()} mnemonic words`);
    }
    return AlgorandMnemonic.decode(phrase);
  }
}
