import { Mnemonic } from '../mnemonics';
import { SeedOptionsInterface } from '../interfaces';
export declare class Seed {
    protected seed: string;
    protected options: SeedOptionsInterface;
    constructor(seed: string, options?: SeedOptionsInterface);
    static getName(): string;
    getName(): string;
    getSeed(): string;
    static fromMnemonic(mnemonic: string | Mnemonic, options?: SeedOptionsInterface): string;
}
//# sourceMappingURL=seed.d.ts.map