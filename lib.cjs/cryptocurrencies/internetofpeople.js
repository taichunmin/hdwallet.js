"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternetOfPeople = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x75;
    static SCRIPT_ADDRESS_PREFIX = 0xae;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0xae3416f6,
        P2SH: 0xae3416f6
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x2780915f,
        P2SH: 0x2780915f
    });
    static MESSAGE_PREFIX = '\x18IoP Signed Message:\n';
    static WIF_PREFIX = 0x31;
}
exports.Mainnet = Mainnet;
class InternetOfPeople extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Internet-Of-People';
    static SYMBOL = 'IOP';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/Internet-of-People',
        WHITEPAPER: 'https://iop.global/whitepaper',
        WEBSITES: [
            'http://iop.global'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.InternetOfPeople;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = InternetOfPeople.NETWORKS.MAINNET;
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
    static DEFAULT_HD = InternetOfPeople.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${InternetOfPeople.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = InternetOfPeople.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.InternetOfPeople = InternetOfPeople;
//# sourceMappingURL=internetofpeople.js.map