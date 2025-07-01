// SPDX-License-Identifier: MIT
import { Seed } from './seed';
import { AlgorandMnemonic } from '../mnemonics';
import { MnemonicError } from '../exceptions';
export class AlgorandSeed extends Seed {
    static getName() {
        return 'Algorand';
    }
    static fromMnemonic(mnemonic) {
        const phrase = typeof mnemonic === 'string' ? mnemonic : mnemonic.getMnemonic();
        if (!AlgorandMnemonic.isValid(phrase)) {
            throw new MnemonicError(`Invalid ${this.getName()} mnemonic words`);
        }
        return AlgorandMnemonic.decode(phrase);
    }
}
//# sourceMappingURL=algorand.js.map