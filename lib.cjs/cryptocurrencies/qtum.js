"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Qtum = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static SCRIPT_ADDRESS_PREFIX = 0x32;
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x3a;
    static HRP = 'qc1';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2TR: 0x01,
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2WPKH: 0x045f18bc,
        P2WPKH_IN_P2SH: 0x049d7878,
        P2WSH: 0x02aa7a99,
        P2WSH_IN_P2SH: 0x0295b005
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2WPKH: 0x045f1cf6,
        P2WPKH_IN_P2SH: 0x049d7cb2,
        P2WSH: 0x02aa7ed3,
        P2WSH_IN_P2SH: 0x0295b43f
    });
    static MESSAGE_PREFIX = null;
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static SCRIPT_ADDRESS_PREFIX = 0x6e;
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x78;
    static HRP = 'tq1';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2TR: 0x01,
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x04358394,
        P2SH: 0x04358394,
        P2WPKH: 0x045f18bc,
        P2WPKH_IN_P2SH: 0x044a4e28,
        P2WSH: 0x02575048,
        P2WSH_IN_P2SH: 0x024285b5
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x043587cf,
        P2SH: 0x043587cf,
        P2WPKH: 0x045f1cf6,
        P2WPKH_IN_P2SH: 0x044a5262,
        P2WSH: 0x02575483,
        P2WSH_IN_P2SH: 0x024289ef
    });
    static MESSAGE_PREFIX = null;
    static WIF_PREFIX = 0xef;
}
exports.Testnet = Testnet;
class Qtum extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Qtum';
    static SYMBOL = 'QTUM';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/qtumproject/qtum',
        WHITEPAPER: 'https://qtumorg.s3.ap-northeast-2.amazonaws.com/Qtum_New_Whitepaper_en.pdf',
        WEBSITES: [
            'https://qtum.org',
            'https://qtum.info'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Qtum;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = Qtum.NETWORKS.MAINNET;
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
        'BIP44',
        'BIP49',
        'BIP84',
        'BIP86',
        'BIP141'
    ]);
    static DEFAULT_HD = Qtum.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Qtum.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH',
        'P2TR',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' },
        'P2WSH',
        { P2WSH_IN_P2SH: 'P2WSH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = Qtum.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Qtum = Qtum;
//# sourceMappingURL=qtum.js.map