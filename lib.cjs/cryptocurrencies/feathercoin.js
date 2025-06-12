"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feathercoin = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x0e;
    static SCRIPT_ADDRESS_PREFIX = 0x05;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488daee,
        P2SH: 0x0488daee
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488bc26,
        P2SH: 0x0488bc26
    });
    static MESSAGE_PREFIX = '\x18Feathercoin Signed Message:\n';
    static WIF_PREFIX = 0x8e;
}
exports.Mainnet = Mainnet;
class Feathercoin extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Feathercoin';
    static SYMBOL = 'FTC';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/FeatherCoin/Feathercoin',
        WHITEPAPER: 'https://feathercoin.com/about',
        WEBSITES: [
            'http://feathercoin.com'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Feathercoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Feathercoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Feathercoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Feathercoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Feathercoin.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Feathercoin = Feathercoin;
//# sourceMappingURL=feathercoin.js.map