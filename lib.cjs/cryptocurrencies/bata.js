"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bata = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x19;
    static SCRIPT_ADDRESS_PREFIX = 0x05;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0xa40b91bd,
        P2SH: 0xa40b91bd
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0xa40c86fa,
        P2SH: 0xa40c86fa
    });
    static MESSAGE_PREFIX = '\x18Bata Signed Message:\n';
    static WIF_PREFIX = 0xa4;
}
exports.Mainnet = Mainnet;
class Bata extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Bata';
    static SYMBOL = 'BTA';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/BTA-BATA/Bataoshi',
        WHITEPAPER: 'https://bata.io/wp-content/uploads/2021/09/Bata-Cryptocurrency-Whitepaper.pdf',
        WEBSITES: [
            'https://bata.io',
            'https://bata.digital'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Bata;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Bata.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Bata.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Bata.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Bata.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Bata = Bata;
//# sourceMappingURL=bata.js.map