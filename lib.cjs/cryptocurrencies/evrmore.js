"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evrmore = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x21;
    static SCRIPT_ADDRESS_PREFIX = 0x5c;
    static HRP = 'ev';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2WPKH: 0x0b,
        P2WSH: 0x0b
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2WPKH: 0x04b2430c,
        P2WPKH_IN_P2SH: 0x049d7878,
        P2WSH: 0x02aa7a99,
        P2WSH_IN_P2SH: 0x0295b005
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2WPKH: 0x04b24746,
        P2WPKH_IN_P2SH: 0x049d7cb2,
        P2WSH: 0x02aa7ed3,
        P2WSH_IN_P2SH: 0x0295b43f
    });
    static MESSAGE_PREFIX = 'Evrmore Signed Message:\n';
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x6f;
    static SCRIPT_ADDRESS_PREFIX = 0xc4;
    static HRP = 'te';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2WPKH: 0x04b2430c,
        P2WPKH_IN_P2SH: 0x049d7878,
        P2WSH: 0x02aa7a99,
        P2WSH_IN_P2SH: 0x0295b005
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2WPKH: 0x04b24746,
        P2WPKH_IN_P2SH: 0x049d7cb2,
        P2WSH: 0x02aa7ed3,
        P2WSH_IN_P2SH: 0x0295b43f
    });
    static MESSAGE_PREFIX = 'Evrmore Signed Message:\n';
    static WIF_PREFIX = 0xef;
}
exports.Testnet = Testnet;
class Evrmore extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Evrmore';
    static SYMBOL = 'EVR';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/EvrmoreOrg/Evrmore',
        WHITEPAPER: 'https://github.com/EvrmoreOrg/whitepaper',
        WEBSITES: [
            'https://evrmorecoin.org/'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Evrmore;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = Evrmore.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Evrmore.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Evrmore.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' },
        'P2WSH',
        { P2WSH_IN_P2SH: 'P2WSH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = Evrmore.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Evrmore = Evrmore;
//# sourceMappingURL=evrmore.js.map