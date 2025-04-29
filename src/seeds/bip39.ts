import { IMnemonic, BIP39Mnemonic } from '../mnemonics';
import { MnemonicError } from '../exceptions';
import { pbkdf2HmacSha512 } from '../crypto';
import { bytesToString } from '../utils';
import { ISeed } from './iseed';

export class BIP39Seed extends ISeed {
  static seedSaltModifier = 'mnemonic';
  static seedPbkdf2Rounds = 2048;

  constructor(seed: string) {
    super(seed);
  }

  static client(): string {
    return 'BIP39';
  }

  static fromMnemonic(mnemonic: string | IMnemonic, passphrase?: string): string {
    const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.mnemonic();
    if (!BIP39Mnemonic.isValid(phrase)) {
      throw new MnemonicError(`Invalid ${this.client()} mnemonic words`);
    }
    const saltBase = this.seedSaltModifier + (passphrase ?? '');
    const salt = saltBase.normalize('NFKD');
    const seedBytes = pbkdf2HmacSha512(phrase, salt, this.seedPbkdf2Rounds);
    return bytesToString(seedBytes);
  }
}
