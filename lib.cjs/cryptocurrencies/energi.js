"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Energi = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x21;
    static SCRIPT_ADDRESS_PREFIX = 0x35;
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0xd7dc6e9f,
        P2SH: 0xd7dc6e9f
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x03b8c856,
        P2SH: 0x03b8c856
    });
    static MESSAGE_PREFIX = 'DarkCoin Signed Message:\n';
    static WIF_PREFIX = 0x6a;
}
exports.Mainnet = Mainnet;
class Energi extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Energi';
    static SYMBOL = 'NRG';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/energcryptocurrency/go-energi',
        WHITEPAPER: 'https://www.energi.world/whitepaper',
        WEBSITES: [
            'https://energi.world',
            'https://www.energiswap.exchange'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Energi;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Energi.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Energi.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Energi.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Energi.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.Energi = Energi;
//# sourceMappingURL=energi.js.map