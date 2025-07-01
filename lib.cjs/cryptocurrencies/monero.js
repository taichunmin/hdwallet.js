"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monero = exports.Testnet = exports.Stagenet = exports.Mainnet = void 0;
const slip44_1 = require("../slip44");
const eccs_1 = require("../eccs");
const consts_1 = require("../consts");
const cryptocurrency_1 = require("./cryptocurrency");
class Mainnet extends cryptocurrency_1.Network {
    static NAME = 'mainnet';
    static STANDARD = 0x12;
    static INTEGRATED = 0x13;
    static SUB_ADDRESS = 0x2a;
}
exports.Mainnet = Mainnet;
class Stagenet extends cryptocurrency_1.Network {
    static NAME = 'stagenet';
    static STANDARD = 0x18;
    static INTEGRATED = 0x19;
    static SUB_ADDRESS = 0x24;
}
exports.Stagenet = Stagenet;
class Testnet extends cryptocurrency_1.Network {
    static NAME = 'testnet';
    static STANDARD = 0x35;
    static INTEGRATED = 0x36;
    static SUB_ADDRESS = 0x3f;
}
exports.Testnet = Testnet;
class Monero extends cryptocurrency_1.Cryptocurrency {
    static NAME = 'Monero';
    static SYMBOL = 'XMR';
    static INFO = new consts_1.Info({
        SOURCE_CODE: 'https://github.com/monero-project/monero',
        WHITEPAPER: 'https://github.com/monero-project/research-lab/blob/master/whitepaper/whitepaper.pdf',
        WEBSITES: [
            'https://www.getmonero.org'
        ]
    });
    static ECC = eccs_1.SLIP10Ed25519MoneroECC;
    static COIN_TYPE = slip44_1.CoinTypes.Monero;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new consts_1.Networks({
        MAINNET: Mainnet,
        STAGENET: Stagenet,
        TESTNET: Testnet
    });
    static DEFAULT_NETWORK = Monero.NETWORKS.MAINNET;
    static ENTROPIES = new consts_1.Entropies([
        { MONERO: 'Monero' },
        'BIP39'
    ]);
    static MNEMONICS = new consts_1.Mnemonics([
        { MONERO: 'Monero' },
        'BIP39'
    ]);
    static SEEDS = new consts_1.Seeds([
        { MONERO: 'Monero' },
        'BIP39'
    ]);
    static HDS = new consts_1.HDs({
        MONERO: 'Monero'
    });
    static DEFAULT_HD = Monero.HDS.MONERO;
    static DEFAULT_PATH = `m/44'/${Monero.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new consts_1.Addresses({
        MONERO: 'Monero'
    });
    static DEFAULT_ADDRESS = Monero.ADDRESSES.MONERO;
    static ADDRESS_TYPES = new consts_1.AddressTypes({
        STANDARD: 'standard',
        INTEGRATED: 'integrated',
        SUB_ADDRESS: 'sub-address'
    });
    static DEFAULT_ADDRESS_TYPE = Monero.ADDRESS_TYPES.STANDARD;
    static PARAMS = new consts_1.Params({
        CHECKSUM_LENGTH: 0x04,
        PAYMENT_ID_LENGTH: 0x08
    });
}
exports.Monero = Monero;
//# sourceMappingURL=monero.js.map