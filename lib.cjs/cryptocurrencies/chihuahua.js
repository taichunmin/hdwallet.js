"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chihuahua = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static HRP = 'chihuahua';
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Chihuahua extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Chihuahua';
    static SYMBOL = 'HUA';
    static INFO = new consts_1.Info({
        WHITEPAPER: 'https://docs.chihuahua.army',
        WEBSITES: [
            'http://chihuahua.army'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Chihuahua;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Chihuahua.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Chihuahua.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Chihuahua.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        COSMOS: 'Cosmos'
    });
    static DEFAULT_ADDRESS = Chihuahua.ADDRESSES.COSMOS;
    static SEMANTICS = ['p2pkh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Chihuahua = Chihuahua;
//# sourceMappingURL=chihuahua.js.map