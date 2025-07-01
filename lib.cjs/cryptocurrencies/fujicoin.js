"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.FujiCoin = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x24;
    static SCRIPT_ADDRESS_PREFIX = 0x10;
    static HRP = 'fc';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2WPKH: 0x04b2430c,
        P2WPKH_IN_P2SH: 0x049d7878
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2WPKH: 0x04b24746,
        P2WPKH_IN_P2SH: 0x049d7cb2
    });
    static MESSAGE_PREFIX = '\x19FujiCoin Signed Message:\n';
    static WIF_PREFIX = 0xa4;
}
exports.Mainnet = Mainnet;
class FujiCoin extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Fuji-Coin';
    static SYMBOL = 'FJC';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/fujicoin/fujicoin',
        WHITEPAPER: 'https://www.fujicoin.org/what-is-fujicoin.php',
        WEBSITES: [
            'https://www.fujicoin.org'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.FujiCoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = FujiCoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = FujiCoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${FujiCoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = FujiCoin.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh', 'p2wpkh', 'p2wpkh-in-p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.FujiCoin = FujiCoin;
//# sourceMappingURL=fujicoin.js.map