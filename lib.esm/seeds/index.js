// SPDX-License-Identifier: MIT
import { Seed } from './seed';
import { SeedError } from '../exceptions';
import { AlgorandSeed } from './algorand';
import { BIP39Seed } from './bip39';
import { CardanoSeed } from './cardano';
import { ElectrumV1Seed, ElectrumV2Seed } from './electrum';
import { MoneroSeed } from './monero';
export class SEEDS {
    static dictionary = {
        [AlgorandSeed.getName()]: AlgorandSeed,
        [BIP39Seed.getName()]: BIP39Seed,
        [CardanoSeed.getName()]: CardanoSeed,
        [ElectrumV1Seed.getName()]: ElectrumV1Seed,
        [ElectrumV2Seed.getName()]: ElectrumV2Seed,
        [MoneroSeed.getName()]: MoneroSeed
    };
    static getNames() {
        return Object.keys(this.dictionary);
    }
    static getClasses() {
        return Object.values(this.dictionary);
    }
    static getSeedClass(name) {
        if (!this.isSeed(name)) {
            throw new SeedError('Invalid seed name', { expected: this.getNames(), got: name });
        }
        return this.dictionary[name];
    }
    static isSeed(name) {
        return this.getNames().includes(name);
    }
}
export { Seed, AlgorandSeed, BIP39Seed, CardanoSeed, ElectrumV1Seed, ElectrumV2Seed, MoneroSeed };
//# sourceMappingURL=index.js.map