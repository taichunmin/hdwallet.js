"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avalanche = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static HRP = 'avax';
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Avalanche extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Avalanche';
    static SYMBOL = 'AVAX';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/ava-labs/avalanchego',
        WHITEPAPER: 'https://www.avalabs.org/whitepapers',
        WEBSITES: [
            'https://avax.network',
            'https://www.avalabs.org'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Avalanche;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Avalanche.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Avalanche.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Avalanche.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        AVALANCHE: 'Avalanche',
        ETHEREUM: 'Ethereum'
    });
    static DEFAULT_ADDRESS = Avalanche.ADDRESSES.AVALANCHE;
    static DEFAULT_SEMANTIC = 'p2pkh';
    static ADDRESS_TYPES = new consts_1.AddressTypes({
        C_CHAIN: 'c-chain',
        P_CHAIN: 'p-chain',
        X_CHAIN: 'x-chain'
    });
    static DEFAULT_ADDRESS_TYPE = Avalanche.ADDRESS_TYPES.P_CHAIN;
    static PARAMS = new consts_1.Params({
        ADDRESS_TYPES: {
            P_CHAIN: 'P-',
            X_CHAIN: 'X-'
        }
    });
}
exports.Avalanche = Avalanche;
//# sourceMappingURL=avalanche.js.map