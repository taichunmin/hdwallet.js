"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinAtom = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x17;
    static SCRIPT_ADDRESS_PREFIX = 0x0a;
    static HRP = 'bca';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4,
        P2WPKH: 0x0488ade4,
        P2WPKH_IN_P2SH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e,
        P2WPKH: 0x0488b21e,
        P2WPKH_IN_P2SH: 0x0488b21e
    });
    static MESSAGE_PREFIX = '\x18Bitcoin Atom Signed Message:\n';
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class BitcoinAtom extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Bitcoin-Atom';
    static SYMBOL = 'BCA';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/bitcoin-atom/bitcoin-atom',
        WEBSITES: [
            'https://bitcoinatom.io/'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.BitcoinAtom;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = BitcoinAtom.NETWORKS.MAINNET;
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
    static DEFAULT_HD = BitcoinAtom.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${BitcoinAtom.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = BitcoinAtom.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.BitcoinAtom = BitcoinAtom;
//# sourceMappingURL=bitcoinatom.js.map