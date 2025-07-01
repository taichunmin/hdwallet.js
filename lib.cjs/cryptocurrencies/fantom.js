"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fantom = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Fantom extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Fantom';
    static SYMBOL = 'FTM';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/Fantom-foundation/go-opera',
        WHITEPAPER: 'https://fantom.foundation/fantom-research-papers',
        WEBSITES: [
            'https://fantom.foundation'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Fantom;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Fantom.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Fantom.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Fantom.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        ETHEREUM: 'Ethereum'
    });
    static DEFAULT_ADDRESS = Fantom.ADDRESSES.ETHEREUM;
    static SEMANTICS = ['p2pkh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Fantom = Fantom;
//# sourceMappingURL=fantom.js.map