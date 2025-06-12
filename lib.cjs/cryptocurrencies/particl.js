"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particl = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x38;
    static SCRIPT_ADDRESS_PREFIX = 0x3c;
    static HRP = 'pw';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x8f1daeb8,
        P2SH: 0x8f1daeb8
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x696e82d1,
        P2SH: 0x696e82d1
    });
    static MESSAGE_PREFIX = '\x18Bitcoin Signed Message:\n';
    static WIF_PREFIX = 0x6c;
}
exports.Mainnet = Mainnet;
class Particl extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Particl';
    static SYMBOL = 'PART';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/particl/particl-core',
        WHITEPAPER: 'https://github.com/particl/whitepaper/blob/master/Particl%20Whitepaper%20Draft%20v0.3.pdf',
        WEBSITES: [
            'http://particl.io',
            'https://particl.store'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Particl;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Particl.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Particl.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Particl.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Particl.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Particl = Particl;
//# sourceMappingURL=particl.js.map