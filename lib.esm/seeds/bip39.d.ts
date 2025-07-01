import { Seed } from './seed';
import { Mnemonic } from '../mnemonics';
import { SeedOptionsInterface } from '../interfaces';
export declare class BIP39Seed extends Seed {
    static seedSaltModifier: string;
    static seedPbkdf2Rounds: number;
    static getName(): string;
    static fromMnemonic(mnemonic: string | Mnemonic, options?: SeedOptionsInterface): string;
}
//# sourceMappingURL=bip39.d.ts.map