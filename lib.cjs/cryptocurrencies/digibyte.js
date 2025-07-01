"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigiByte = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x1e;
    static SCRIPT_ADDRESS_PREFIX = 0x05;
    static HRP = 'dgb';
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
    static MESSAGE_PREFIX = '\x19DigiByte Signed Message:\n';
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class DigiByte extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Digi-Byte';
    static SYMBOL = 'DGB';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/DigiByte-Core/digibyte',
        WHITEPAPER: 'https://digibyte.io/docs/infopaper.pdf',
        WEBSITES: [
            'https://digibyte.org',
            'https://dgbwiki.com'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.DigiByte;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = DigiByte.NETWORKS.MAINNET;
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
    static DEFAULT_HD = DigiByte.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${DigiByte.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = DigiByte.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh', 'p2wpkh', 'p2wpkh-in-p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.DigiByte = DigiByte;
//# sourceMappingURL=digibyte.js.map