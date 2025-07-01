"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.OKCash = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x37;
    static SCRIPT_ADDRESS_PREFIX = 0x1c;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x03cc1c73,
        P2SH: 0x03cc1c73
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x03cc23d7,
        P2SH: 0x03cc23d7
    });
    static MESSAGE_PREFIX = '\x18OKCash Signed Message:\n';
    static WIF_PREFIX = 0x03;
}
exports.Mainnet = Mainnet;
class OKCash extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'OK-Cash';
    static SYMBOL = 'OK';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/okcashpro/okcash',
        WHITEPAPER: 'https://github.com/okcashpro/okcash-whitepaper',
        WEBSITES: [
            'http://okcash.co'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.OKCash;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = OKCash.NETWORKS.MAINNET;
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
    static DEFAULT_HD = OKCash.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${OKCash.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = OKCash.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.OKCash = OKCash;
//# sourceMappingURL=okcash.js.map