"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aptos = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
}
exports.Mainnet = Mainnet;
class Aptos extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Aptos';
    static SYMBOL = 'APT';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/aptos-labs',
        WHITEPAPER: 'https://aptosfoundation.org/whitepaper',
        WEBSITES: [
            'https://aptosfoundation.org'
        ]
    });
    static ECC = eccs_1.SLIP10Ed25519ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Aptos;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Aptos.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Aptos.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Aptos.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        APTOS: 'Aptos'
    });
    static DEFAULT_ADDRESS = Aptos.ADDRESSES.APTOS;
    static DEFAULT_SEMANTIC = 'p2pkh';
    static PARAMS = new consts_1.Params({
        SUFFIX: 0x00,
        ADDRESS_PREFIX: '0x'
    });
}
exports.Aptos = Aptos;
//# sourceMappingURL=aptos.js.map