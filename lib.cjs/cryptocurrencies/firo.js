"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firo = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x52;
    static SCRIPT_ADDRESS_PREFIX = 0x07;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e
    });
    static MESSAGE_PREFIX = '\x18Firo Signed Message:\n';
    static WIF_PREFIX = 0xd2;
}
exports.Mainnet = Mainnet;
class Firo extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Firo';
    static SYMBOL = 'FIRO';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/firoorg/firo',
        WEBSITES: [
            'https://firo.org'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Firo;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Firo.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Firo.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Firo.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Firo.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Firo = Firo;
//# sourceMappingURL=firo.js.map