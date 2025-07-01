"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tezos = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static XPRIVATE_KEY_VERSIONS = new consts_1.XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new consts_1.XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
}
exports.Mainnet = Mainnet;
class Tezos extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Tezos';
    static SYMBOL = 'XTZ';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/tezos/tezos',
        WHITEPAPER: 'https://tezos.com/whitepaper.pdf',
        WEBSITES: [
            'https://www.tezos.com'
        ]
    });
    static ECC = eccs_1.SLIP10Ed25519ECC;
    static COIN_TYPE = slip44_1.CoinTypes.Tezos;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Tezos.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Tezos.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Tezos.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        TEZOS: 'Tezos'
    });
    static DEFAULT_ADDRESS = Tezos.ADDRESSES.TEZOS;
    static SEMANTICS = ['p2pkh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
    static ADDRESS_PREFIXES = new consts_1.AddressPrefixes({
        TZ1: 'tz1',
        TZ2: 'tz2',
        TZ3: 'tz3'
    });
    static DEFAULT_ADDRESS_PREFIX = Tezos.ADDRESS_PREFIXES.TZ1;
    static PARAMS = new consts_1.Params({
        ADDRESS_PREFIXES: {
            TZ1: '06a19f',
            TZ2: '06a1a1',
            TZ3: '06a1a4'
        }
    });
}
exports.Tezos = Tezos;
//# sourceMappingURL=tezos.js.map