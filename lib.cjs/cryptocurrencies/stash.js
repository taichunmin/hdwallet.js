"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stash = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x4c;
    static SCRIPT_ADDRESS_PREFIX = 0x10;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e
    });
    static MESSAGE_PREFIX = '\x18Stash Signed Message:\n';
    static WIF_PREFIX = 0xcc;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static NAME = 'testnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x8c;
    static SCRIPT_ADDRESS_PREFIX = 0x13;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x04358394,
        P2SH: 0x04358394
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x043587cf,
        P2SH: 0x043587cf
    });
    static MESSAGE_PREFIX = '\x18Stash Test Signed Message:\n';
    static WIF_PREFIX = 0xef;
}
exports.Testnet = Testnet;
class Stash extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Stash';
    static SYMBOL = 'STASH';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://docs.stash.capital',
        WHITEPAPER: 'https://docs.stash.capital',
        WEBSITES: [
            'https://stash.capital',
            'https://app.stash.capital/#/dashboard'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Stash;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = Stash.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Stash.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Stash.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Stash.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Stash = Stash;
//# sourceMappingURL=stash.js.map