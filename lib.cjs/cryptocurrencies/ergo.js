"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ergo = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static TYPE = 0x00;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static TYPE = 0x10;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x04358394
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x043587cf
    });
    static WIF_PREFIX = 0xef;
}
exports.Testnet = Testnet;
class Ergo extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Ergo';
    static SYMBOL = 'ERG';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/ergoplatform/ergo',
        WHITEPAPER: 'https://ergoplatform.org/en/documents',
        WEBSITES: [
            'https://ergoplatform.org'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Ergo;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = Ergo.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Ergo.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Ergo.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        ERGO: 'Ergo'
    });
    static DEFAULT_ADDRESS = Ergo.ADDRESSES.ERGO;
    static DEFAULT_SEMANTIC = 'p2pkh';
    static ADDRESS_TYPES = new consts_1.AddressTypes({
        P2PKH: 'p2pkh',
        P2SH: 'p2sh'
    });
    static DEFAULT_ADDRESS_TYPE = Ergo.ADDRESS_TYPES.P2PKH;
    static PARAMS = new consts_1.Params({
        CHECKSUM_LENGTH: 0x04,
        ADDRESS_TYPES: {
            P2PKH: 0x01,
            P2SH: 0x02
        }
    });
}
exports.Ergo = Ergo;
//# sourceMappingURL=ergo.js.map