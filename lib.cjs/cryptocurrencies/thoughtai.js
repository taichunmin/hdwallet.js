"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThoughtAI = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x07;
    static SCRIPT_ADDRESS_PREFIX = 0x09;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x5aebd8c6,
        P2SH: 0x5aebd8c6
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0xfbc6a00d,
        P2SH: 0xfbc6a00d
    });
    static MESSAGE_PREFIX = null;
    static WIF_PREFIX = 0x7b;
}
exports.Mainnet = Mainnet;
class ThoughtAI extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Thought-AI';
    static SYMBOL = 'THT';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/thoughtnetwork',
        WHITEPAPER: 'https://github.com/thoughtnetwork/thought-whitepaper',
        WEBSITES: [
            'https://thought.live'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.ThoughtAI;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = ThoughtAI.NETWORKS.MAINNET;
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
    static DEFAULT_HD = ThoughtAI.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${ThoughtAI.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = ThoughtAI.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.ThoughtAI = ThoughtAI;
//# sourceMappingURL=thoughtai.js.map