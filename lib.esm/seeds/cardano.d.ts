import { Seed } from './seed';
import { SeedOptionsInterface } from '../interfaces';
import { Mnemonic } from '../mnemonics';
export declare class CardanoSeed extends Seed {
    constructor(seed: string, options?: SeedOptionsInterface);
    static getName(): string;
    getCardanoType(): string;
    static fromMnemonic(mnemonic: string | Mnemonic, options?: SeedOptionsInterface): string;
    private static generateByronIcarus;
    private static generateByronLedger;
    private static generateByronLegacy;
    private static generateShelleyIcarus;
    private static generateShelleyLedger;
}
//# sourceMappingURL=cardano.d.ts.map