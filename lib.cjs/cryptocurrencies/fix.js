"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIX = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x23;
    static SCRIPT_ADDRESS_PREFIX = 0x5f;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0221312b,
        P2SH: 0x0221312b
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x022d2533,
        P2SH: 0x022d2533
    });
    static MESSAGE_PREFIX = null;
    static WIF_PREFIX = 0x3c;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static NAME = 'testnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x4c;
    static SCRIPT_ADDRESS_PREFIX = 0x89;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x3a805837,
        P2SH: 0x3a805837
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x3a8061a0,
        P2SH: 0x3a8061a0
    });
    static MESSAGE_PREFIX = null;
    static WIF_PREFIX = 0xed;
}
exports.Testnet = Testnet;
class FIX extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'FIX';
    static SYMBOL = 'FIX';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/NewCapital/FIX-Core',
        WEBSITES: [
            'https://fix.network'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.FIX;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = FIX.NETWORKS.MAINNET;
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
    static DEFAULT_HD = FIX.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${FIX.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = FIX.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.FIX = FIX;
//# sourceMappingURL=fix.js.map