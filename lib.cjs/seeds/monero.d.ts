import { Mnemonic } from '../mnemonics';
import { Seed } from './seed';
export declare class MoneroSeed extends Seed {
    static getName(): string;
    static fromMnemonic(mnemonic: string | Mnemonic): string;
}
//# sourceMappingURL=monero.d.ts.map