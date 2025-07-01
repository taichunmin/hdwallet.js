import { Seed } from './seed';
import { AlgorandSeed } from './algorand';
import { BIP39Seed } from './bip39';
import { CardanoSeed } from './cardano';
import { ElectrumV1Seed, ElectrumV2Seed } from './electrum';
import { MoneroSeed } from './monero';
export declare class SEEDS {
    private static dictionary;
    static getNames(): string[];
    static getClasses(): typeof Seed[];
    static getSeedClass(name: string): typeof Seed | any;
    static isSeed(name: string): boolean;
}
export { Seed, AlgorandSeed, BIP39Seed, CardanoSeed, ElectrumV1Seed, ElectrumV2Seed, MoneroSeed };
//# sourceMappingURL=index.d.ts.map