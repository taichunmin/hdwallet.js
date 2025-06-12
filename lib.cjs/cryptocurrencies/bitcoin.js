"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitcoin = exports.Regtest = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x00;
    static SCRIPT_ADDRESS_PREFIX = 0x05;
    static HRP = 'bc';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2TR: 0x01,
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2TR: 0x0488ade4,
        P2WPKH: 0x04b2430c,
        P2WPKH_IN_P2SH: 0x049d7878,
        P2WSH: 0x02aa7a99,
        P2WSH_IN_P2SH: 0x0295b005
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2TR: 0x0488b21e,
        P2WPKH: 0x04b24746,
        P2WPKH_IN_P2SH: 0x049d7cb2,
        P2WSH: 0x02aa7ed3,
        P2WSH_IN_P2SH: 0x0295b43f
    });
    static MESSAGE_PREFIX = '\x18Bitcoin Signed Message:\n';
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x6f;
    static SCRIPT_ADDRESS_PREFIX = 0xc4;
    static HRP = 'tb';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2TR: 0x01,
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x04358394,
        P2SH: 0x04358394,
        P2TR: 0x04358394,
        P2WPKH: 0x045f18bc,
        P2WPKH_IN_P2SH: 0x044a4e28,
        P2WSH: 0x02575048,
        P2WSH_IN_P2SH: 0x024285b5
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x043587cf,
        P2SH: 0x043587cf,
        P2TR: 0x043587cf,
        P2WPKH: 0x045f1cf6,
        P2WPKH_IN_P2SH: 0x044a5262,
        P2WSH: 0x02575483,
        P2WSH_IN_P2SH: 0x024289ef
    });
    static MESSAGE_PREFIX = '\x18Bitcoin Signed Message:\n';
    static WIF_PREFIX = 0xef;
}
exports.Testnet = Testnet;
class Regtest extends Testnet {
    static HRP = 'bcrt';
}
exports.Regtest = Regtest;
class Bitcoin extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Bitcoin';
    static SYMBOL = 'BTC';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/bitcoin/bitcoin',
        WHITEPAPER: 'https://bitcoin.org/bitcoin.pdf',
        WEBSITES: [
            'https://bitcoin.org'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Bitcoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet,
        REGTEST: Regtest
    });
    static DEFAULT_NETWORK = Bitcoin.NETWORKS.MAINNET;
    static ENTROPIES = new consts_1.Entropies([
        'BIP39',
        { ELECTRUM_V1: 'Electrum-V1' },
        { ELECTRUM_V2: 'Electrum-V2' }
    ]);
    static MNEMONICS = new consts_1.Mnemonics([
        'BIP39',
        { ELECTRUM_V1: 'Electrum-V1' },
        { ELECTRUM_V2: 'Electrum-V2' }
    ]);
    static SEEDS = new consts_1.Seeds([
        'BIP39',
        { ELECTRUM_V1: 'Electrum-V1' },
        { ELECTRUM_V2: 'Electrum-V2' }
    ]);
    static HDS = new consts_1.HDs([
        'BIP32',
        'BIP44',
        'BIP49',
        'BIP84',
        'BIP86',
        'BIP141',
        { ELECTRUM_V1: 'Electrum-V1' },
        { ELECTRUM_V2: 'Electrum-V2' }
    ]);
    static DEFAULT_HD = Bitcoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Bitcoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH',
        'P2TR',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' },
        'P2WSH',
        { P2WSH_IN_P2SH: 'P2WSH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = Bitcoin.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
    static PARAMS = new consts_1.Params({
        ALPHABET: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
        FIELD_SIZE: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F',
        TAP_TWEAK_SHA256: 'e80fe1639c9ca050e3af1b39c143c63e429cbceb15d940fbb5c5a1f4af57c5e9'
    });
}
exports.Bitcoin = Bitcoin;
//# sourceMappingURL=bitcoin.js.map