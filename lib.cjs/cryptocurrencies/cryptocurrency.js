"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cryptocurrency = exports.Network = void 0;
class Network {
    static NAME;
    // Bitcoin
    static PUBLIC_KEY_ADDRESS_PREFIX;
    static SCRIPT_ADDRESS_PREFIX;
    static HRP;
    static WITNESS_VERSIONS;
    static XPRIVATE_KEY_VERSIONS;
    static XPUBLIC_KEY_VERSIONS;
    static MESSAGE_PREFIX;
    static WIF_PREFIX;
    // Bitcoin-Cash | Bitcoin-Cash-SLP | eCash
    static LEGACY_PUBLIC_KEY_ADDRESS_PREFIX;
    static STD_PUBLIC_KEY_ADDRESS_PREFIX;
    static LEGACY_SCRIPT_ADDRESS_PREFIX;
    static STD_SCRIPT_ADDRESS_PREFIX;
    // Monero
    static STANDARD;
    static INTEGRATED;
    static SUB_ADDRESS;
    // Cardano
    static TYPE;
    static PAYMENT_ADDRESS_HRP;
    static REWARD_ADDRESS_HRP;
}
exports.Network = Network;
class Cryptocurrency {
    static NAME;
    static SYMBOL;
    static INFO;
    static ECC;
    static COIN_TYPE;
    static SUPPORT_BIP38;
    static NETWORKS;
    static DEFAULT_NETWORK;
    static ENTROPIES;
    static MNEMONICS;
    static SEEDS;
    static HDS;
    static DEFAULT_HD;
    static ADDRESSES;
    static DEFAULT_ADDRESS;
    static ADDRESS_TYPES;
    static DEFAULT_ADDRESS_TYPE;
    static ADDRESS_PREFIXES;
    static DEFAULT_ADDRESS_PREFIX;
    static SEMANTICS;
    static DEFAULT_SEMANTIC;
    static PARAMS;
}
exports.Cryptocurrency = Cryptocurrency;
//# sourceMappingURL=cryptocurrency.js.map