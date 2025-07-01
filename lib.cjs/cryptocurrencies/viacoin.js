"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viacoin = exports.Testnet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x47;
    static SCRIPT_ADDRESS_PREFIX = 0x21;
    static HRP = 'via';
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
    static MESSAGE_PREFIX = '\x18Viacoin Signed Message:\n';
    static WIF_PREFIX = 0xc7;
}
exports.Mainnet = Mainnet;
class Testnet extends cryptocurrency_1.Network {
    static NAME = 'testnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x7f;
    static SCRIPT_ADDRESS_PREFIX = 0xc4;
    static HRP = 'tvia';
    static WITNESS_VERSIONS = new consts_1.WitnessVersions({
        P2WPKH: 0x00,
        P2WSH: 0x00
    });
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x04358394,
        P2SH: 0x04358394,
        P2WPKH: 0x045f18bc,
        P2WPKH_IN_P2SH: 0x044a4e28
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x043587cf,
        P2SH: 0x043587cf,
        P2WPKH: 0x045f1cf6,
        P2WPKH_IN_P2SH: 0x044a5262
    });
    static MESSAGE_PREFIX = '\x18Viacoin Signed Message:\n';
    static WIF_PREFIX = 0xff;
}
exports.Testnet = Testnet;
class Viacoin extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Viacoin';
    static SYMBOL = 'VIA';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/viacoin/viacoin',
        WHITEPAPER: 'https://github.com/viacoin/documents/blob/master/whitepapers/Viacoin_fullcolor_whitepaper.pdf',
        WEBSITES: [
            'http://viacoin.org'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Viacoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = Viacoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Viacoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Viacoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH',
        'P2WPKH',
        { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
    ]);
    static DEFAULT_ADDRESS = Viacoin.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh', 'p2wpkh', 'p2wpkh-in-p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Viacoin = Viacoin;
//# sourceMappingURL=viacoin.js.map