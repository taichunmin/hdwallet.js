"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stellar = exports.Mainnet = void 0;
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
class Stellar extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Stellar';
    static SYMBOL = 'XLM';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/stellar/stellar-core',
        WHITEPAPER: 'https://www.stellar.org/papers/stellar-consensus-protocol.pdf',
        WEBSITES: [
            'https://www.stellar.org'
        ]
    });
    static ECC = eccs_1.SLIP10Ed25519ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Stellar;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Stellar.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Stellar.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Stellar.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        STELLAR: 'Stellar'
    });
    static DEFAULT_ADDRESS = Stellar.ADDRESSES.STELLAR;
    static DEFAULT_SEMANTIC = 'p2pkh';
    static ADDRESS_TYPES = new consts_1.AddressTypes({
        PRIVATE_KEY: 'privateKey',
        PUBLIC_KEY: 'publicKey'
    });
    static DEFAULT_ADDRESS_TYPE = Stellar.ADDRESS_TYPES.PRIVATE_KEY;
    static PARAMS = new consts_1.Params({
        CHECKSUM_LENGTH: 0x02,
        ADDRESS_TYPES: {
            PRIVATE_KEY: 18 << 3,
            PUBLIC_KEY: 6 << 3
        }
    });
}
exports.Stellar = Stellar;
//# sourceMappingURL=stellar.js.map