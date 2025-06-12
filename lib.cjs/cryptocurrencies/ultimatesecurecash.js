"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.UltimateSecureCash = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x44;
    static SCRIPT_ADDRESS_PREFIX = 0x7d;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0xee8031e8,
        P2SH: 0xee8031e8
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0xee80286a,
        P2SH: 0xee80286a
    });
    static MESSAGE_PREFIX = '\x18UltimateSecureCash Signed Message:\n';
    static WIF_PREFIX = 0xbf;
}
exports.Mainnet = Mainnet;
class UltimateSecureCash extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Ultimate-Secure-Cash';
    static SYMBOL = 'USC';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/SilentTrader/UltimateSecureCash',
        WHITEPAPER: 'https://ultimatesecurecash.info/#spec',
        WEBSITES: [
            'http://ultimatesecurecash.info'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.UltimateSecureCash;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = UltimateSecureCash.NETWORKS.MAINNET;
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
    static DEFAULT_HD = UltimateSecureCash.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${UltimateSecureCash.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = UltimateSecureCash.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.UltimateSecureCash = UltimateSecureCash;
//# sourceMappingURL=ultimatesecurecash.js.map