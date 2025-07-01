"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Whitecoin = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x49;
    static SCRIPT_ADDRESS_PREFIX = 0x57;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x048894ed,
        P2SH: 0x048894ed
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x04887f1e,
        P2SH: 0x04887f1e
    });
    static MESSAGE_PREFIX = '\x18Whitecoin Signed Message:\n';
    static WIF_PREFIX = 0xc9;
}
exports.Mainnet = Mainnet;
class Whitecoin extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Whitecoin';
    static SYMBOL = 'XWC';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/Whitecoin-XWC/Whitecoin-core',
        WHITEPAPER: 'https://www.whitecoin.info/pdf/Whitecoin%20Technical%20White%20Paper_en.pdf',
        WEBSITES: [
            'http://whitecoin.info',
            'http://xwc.com'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Whitecoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Whitecoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Whitecoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Whitecoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Whitecoin.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Whitecoin = Whitecoin;
//# sourceMappingURL=whitecoin.js.map