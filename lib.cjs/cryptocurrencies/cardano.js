"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cardano = exports.Testnet = exports.Mainnet = exports.Types = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Types extends consts_1.NestedNamespace {
    getCardanoTypes() {
        return Object.values(this);
    }
    isCardanoType(type) {
        return this.getCardanoTypes().includes(type);
    }
}
exports.Types = Types;
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static TYPE = 0x01;
    static PAYMENT_ADDRESS_HRP = 'addr';
    static REWARD_ADDRESS_HRP = 'stake';
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0f4331d4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static NAME = 'testnet';
    static TYPE = 0x00;
    static PAYMENT_ADDRESS_HRP = 'addr_test';
    static REWARD_ADDRESS_HRP = 'stake_test';
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x04358394
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x043587cf
    });
}
exports.Testnet = Testnet;
class Cardano extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Cardano';
    static SYMBOL = 'ADA';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://cardanoupdates.com',
        WHITEPAPER: 'https://docs.cardano.org/en/latest',
        WEBSITES: [
            'https://www.cardano.org'
        ]
    });
    static ECC = eccs_1.KholawEd25519ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Cardano;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = Cardano.NETWORKS.MAINNET;
    static ENTROPIES = new consts_1.Entropies([
        'BIP39'
    ]);
    static MNEMONICS = new consts_1.Mnemonics([
        'BIP39'
    ]);
    static SEEDS = new consts_1.Seeds({
        CARDANO: 'Cardano'
    });
    static HDS = new consts_1.HDs({
        CARDANO: 'Cardano'
    });
    static DEFAULT_HD = Cardano.HDS.CARDANO;
    static DEFAULT_PATH = `m/44'/${Cardano.COIN_TYPE}'/0'/0/0`;
    static TYPES = new Types({
        BYRON_ICARUS: 'byron-icarus',
        BYRON_LEDGER: 'byron-ledger',
        BYRON_LEGACY: 'byron-legacy',
        SHELLEY_ICARUS: 'shelley-icarus',
        SHELLEY_LEDGER: 'shelley-ledger'
    });
    static ADDRESSES = new consts_1.Addresses({
        CARDANO: 'Cardano'
    });
    static DEFAULT_ADDRESS = Cardano.ADDRESSES.CARDANO;
    static SEMANTICS = ['p2pkh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
    static ADDRESS_TYPES = new consts_1.AddressTypes({
        PUBLIC_KEY: 'public-key',
        REDEMPTION: 'redemption',
        PAYMENT: 'payment',
        STAKING: 'staking',
        REWARD: 'reward'
    });
    static PARAMS = new consts_1.Params({
        PUBLIC_KEY_ADDRESS: 0x00,
        REDEMPTION_ADDRESS: 0x02,
        PAYMENT_PREFIX: 0x00,
        REWARD_PREFIX: 0x0e
    });
}
exports.Cardano = Cardano;
//# sourceMappingURL=cardano.js.map