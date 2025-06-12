"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.XUEZ = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x4b;
    static SCRIPT_ADDRESS_PREFIX = 0x12;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0221312b,
        P2SH: 0x0221312b
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x022d2533,
        P2SH: 0x022d2533
    });
    static MESSAGE_PREFIX = null;
    static WIF_PREFIX = 0xd4;
}
exports.Mainnet = Mainnet;
class XUEZ extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'XUEZ';
    static SYMBOL = 'XUEZ';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/XUEZ/Xuez-Core',
        WHITEPAPER: 'https://github.com/XUEZ/Whitepaper',
        WEBSITES: [
            'https://xuezcoin.com'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.XUEZ;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = XUEZ.NETWORKS.MAINNET;
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
    static DEFAULT_HD = XUEZ.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${XUEZ.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = XUEZ.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.XUEZ = XUEZ;
//# sourceMappingURL=xuez.js.map