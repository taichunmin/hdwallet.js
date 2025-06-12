"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiversX = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static HRP = 'erd';
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
}
exports.Mainnet = Mainnet;
class MultiversX extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'MultiversX';
    static SYMBOL = 'EGLD';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/multiversx/mx-chain-go',
        WHITEPAPER: 'https://files.multiversx.com/multiversx-whitepaper.pdf',
        WEBSITES: [
            'https://multiversx.com',
            'https://multiversx.com/ecosystem'
        ]
    });
    static ECC = eccs_1.SLIP10Ed25519ECC;
    static COIN_TYPE = slip44_1.CoinTypes.MultiversX;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = MultiversX.NETWORKS.MAINNET;
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
    static DEFAULT_HD = MultiversX.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${MultiversX.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        MULTIVERSX: 'MultiversX'
    });
    static DEFAULT_ADDRESS = MultiversX.ADDRESSES.MULTIVERSX;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
exports.MultiversX = MultiversX;
//# sourceMappingURL=multiversx.js.map