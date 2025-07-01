"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinPrivate = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x00001325;
    static SCRIPT_ADDRESS_PREFIX = 0x000013af;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e
    });
    static MESSAGE_PREFIX = '\x18BitcoinPrivate Signed Message:\n';
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static NAME = 'testnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x00001957;
    static SCRIPT_ADDRESS_PREFIX = 0x000019e0;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x04358394,
        P2SH: 0x04358394
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x043587cf,
        P2SH: 0x043587cf
    });
    static MESSAGE_PREFIX = '\x18BitcoinPrivate Signed Message:\n';
    static WIF_PREFIX = 0xef;
}
exports.Testnet = Testnet;
class BitcoinPrivate extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Bitcoin-Private';
    static SYMBOL = 'BTCP';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/BTCPrivate/BitcoinPrivate',
        WHITEPAPER: 'https://btcprivate.org/whitepaper.pdf',
        WEBSITES: [
            'https://btcprivate.org'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.BitcoinPrivate;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = BitcoinPrivate.NETWORKS.MAINNET;
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
    static DEFAULT_HD = BitcoinPrivate.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${BitcoinPrivate.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = BitcoinPrivate.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.BitcoinPrivate = BitcoinPrivate;
//# sourceMappingURL=bitcoinprivate.js.map