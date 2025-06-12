"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filecoin = exports.Mainnet = void 0;
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
    static WIF_PREFIX = 0x80;
}
exports.Mainnet = Mainnet;
class Filecoin extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Filecoin';
    static SYMBOL = 'FIL';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/filecoin-project',
        WHITEPAPER: 'https://docs.filecoin.io',
        WEBSITES: [
            'https://filecoin.io'
        ]
    });
    static ECC = eccs_1.SLIP10Secp256k1ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Filecoin;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Filecoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Filecoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Filecoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        FILECOIN: 'Filecoin'
    });
    static DEFAULT_ADDRESS = Filecoin.ADDRESSES.FILECOIN;
    static DEFAULT_SEMANTIC = 'p2pkh';
    static ADDRESS_TYPES = new consts_1.AddressTypes({
        SECP256K1: 'secp256k1',
        BLS: 'bls'
    });
    static DEFAULT_ADDRESS_TYPE = Filecoin.ADDRESS_TYPES.SECP256K1;
    static PARAMS = new consts_1.Params({
        ALPHABET: 'abcdefghijklmnopqrstuvwxyz234567',
        ADDRESS_PREFIX: 'f',
        ADDRESS_TYPES: {
            SECP256K1: 0x01,
            BLS: 0x03
        }
    });
}
exports.Filecoin = Filecoin;
//# sourceMappingURL=filecoin.js.map