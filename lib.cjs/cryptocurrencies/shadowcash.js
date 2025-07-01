"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadowCash = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x3f;
    static SCRIPT_ADDRESS_PREFIX = 0x7d;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0xee8031e8,
        P2SH: 0xee8031e8
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0xee80286a,
        P2SH: 0xee80286a
    });
    static MESSAGE_PREFIX = null;
    static WIF_PREFIX = 0xbf;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static NAME = 'testnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x7f;
    static SCRIPT_ADDRESS_PREFIX = 0xc4;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x76c1077a,
        P2SH: 0x76c1077a
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x76c0fdfb,
        P2SH: 0x76c0fdfb
    });
    static MESSAGE_PREFIX = null;
    static WIF_PREFIX = 0xff;
}
exports.Testnet = Testnet;
class ShadowCash extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Shadow-Cash';
    static SYMBOL = 'SDC';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/shadowproject/shadow',
        WHITEPAPER: 'https://github.com/shadowproject/whitepapers',
        WEBSITES: [
            'http://shadowproject.io'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.ShadowCash;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = ShadowCash.NETWORKS.MAINNET;
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
    static DEFAULT_HD = ShadowCash.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${ShadowCash.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = ShadowCash.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.ShadowCash = ShadowCash;
//# sourceMappingURL=shadowcash.js.map