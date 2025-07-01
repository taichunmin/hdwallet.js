// SPDX-License-Identifier: MIT
import { Seed } from './seed';
import { BIP39Mnemonic } from '../mnemonics';
import { pbkdf2HmacSha512 } from '../crypto';
import { bytesToString } from '../utils';
import { MnemonicError } from '../exceptions';
export class BIP39Seed extends Seed {
    static seedSaltModifier = 'mnemonic';
    static seedPbkdf2Rounds = 2048;
    static getName() {
        return 'BIP39';
    }
    static fromMnemonic(mnemonic, options = {}) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        if (!BIP39Mnemonic.isValid(phrase)) {
            throw new MnemonicError(`Invalid ${this.getName()} mnemonic words`);
        }
        const saltBase = this.seedSaltModifier + (options.passphrase ?? '');
        const salt = saltBase.normalize('NFKD');
        const seedBytes = pbkdf2HmacSha512(phrase, salt, this.seedPbkdf2Rounds);
        return bytesToString(seedBytes);
    }
}
//# sourceMappingURL=bip39.js.map