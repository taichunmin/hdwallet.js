"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneroSeed = exports.ElectrumV2Seed = exports.ElectrumV1Seed = exports.CardanoSeed = exports.BIP39Seed = exports.AlgorandSeed = exports.Seed = exports.SEEDS = void 0;
const seed_1 = require("./seed");
Object.defineProperty(exports, "Seed", { enumerable: true, get: function () { return seed_1.Seed; } });
const exceptions_1 = require("../exceptions");
const algorand_1 = require("./algorand");
Object.defineProperty(exports, "AlgorandSeed", { enumerable: true, get: function () { return algorand_1.AlgorandSeed; } });
const bip39_1 = require("./bip39");
Object.defineProperty(exports, "BIP39Seed", { enumerable: true, get: function () { return bip39_1.BIP39Seed; } });
const cardano_1 = require("./cardano");
Object.defineProperty(exports, "CardanoSeed", { enumerable: true, get: function () { return cardano_1.CardanoSeed; } });
const electrum_1 = require("./electrum");
Object.defineProperty(exports, "ElectrumV1Seed", { enumerable: true, get: function () { return electrum_1.ElectrumV1Seed; } });
Object.defineProperty(exports, "ElectrumV2Seed", { enumerable: true, get: function () { return electrum_1.ElectrumV2Seed; } });
const monero_1 = require("./monero");
Object.defineProperty(exports, "MoneroSeed", { enumerable: true, get: function () { return monero_1.MoneroSeed; } });
class SEEDS {
    static dictionary = {
        [algorand_1.AlgorandSeed.getName()]: algorand_1.AlgorandSeed,
        [bip39_1.BIP39Seed.getName()]: bip39_1.BIP39Seed,
        [cardano_1.CardanoSeed.getName()]: cardano_1.CardanoSeed,
        [electrum_1.ElectrumV1Seed.getName()]: electrum_1.ElectrumV1Seed,
        [electrum_1.ElectrumV2Seed.getName()]: electrum_1.ElectrumV2Seed,
        [monero_1.MoneroSeed.getName()]: monero_1.MoneroSeed
    };
    static getNames() {
        return Object.keys(this.dictionary);
    }
    static getClasses() {
        return Object.values(this.dictionary);
    }
    static getSeedClass(name) {
        if (!this.isSeed(name)) {
            throw new exceptions_1.SeedError('Invalid seed name', { expected: this.getNames(), got: name });
        }
        return this.dictionary[name];
    }
    static isSeed(name) {
        return this.getNames().includes(name);
    }
}
exports.SEEDS = SEEDS;
//# sourceMappingURL=index.js.map