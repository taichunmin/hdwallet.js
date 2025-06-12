"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binance = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static HRP = 'bnb';
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Binance extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Binance';
    static SYMBOL = 'BNB';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/bnb-chain/bsc',
        WHITEPAPER: 'https://github.com/bnb-chain/whitepaper',
        WEBSITES: [
            'https://www.bnbchain.org'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Binance;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Binance.NETWORKS.MAINNET;
    static ENTROPIES = new consts_1.Entropies([
        'BIP39'
    ]);
    static MNEMONICS = new consts_1.Mnemonics([
        'BIP39'
    ]);
    static SEEDS = new consts_1.Seeds([
        'BIP39'
    ]);
    static HDS = new consts_1.HDs([
        'BIP32',
        'BIP44'
    ]);
    static DEFAULT_HD = Binance.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Binance.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        COSMOS: 'Cosmos',
        ETHEREUM: 'Ethereum'
    });
    static DEFAULT_ADDRESS = Binance.ADDRESSES.COSMOS;
    static DEFAULT_SEMANTIC = 'p2pkh';
    static ADDRESS_TYPES = new consts_1.AddressTypes({
        CHAIN: 'chain',
        SMART_CHAIN: 'smart-chain'
    });
    static DEFAULT_ADDRESS_TYPE = Binance.ADDRESS_TYPES.CHAIN;
}
exports.Binance = Binance;
//# sourceMappingURL=binance.js.map