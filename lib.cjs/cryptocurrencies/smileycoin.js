"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Smileycoin = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x19;
    static SCRIPT_ADDRESS_PREFIX = 0x05;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x1e5631bc,
        P2SH: 0x1e5631bc
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x1e562d9a,
        P2SH: 0x1e562d9a
    });
    static MESSAGE_PREFIX = '\x18Smileycoin Signed Message:\n';
    static WIF_PREFIX = 0x05;
}
exports.Mainnet = Mainnet;
class Smileycoin extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Smileycoin';
    static SYMBOL = 'SMLY';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/tutor-web/',
        WHITEPAPER: 'https://tutor-web.info/smileycoin',
        WEBSITES: [
            'https://smileyco.in'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Smileycoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Smileycoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Smileycoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Smileycoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Smileycoin.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Smileycoin = Smileycoin;
//# sourceMappingURL=smileycoin.js.map