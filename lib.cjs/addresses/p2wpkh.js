"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2WPKHAddress = void 0;
const segwit_bech32_1 = require("../libs/segwit-bech32");
const consts_1 = require("../consts");
const eccs_1 = require("../eccs");
const cryptocurrencies_1 = require("../cryptocurrencies");
const crypto_1 = require("../crypto");
const utils_1 = require("../utils");
const address_1 = require("./address");
const exceptions_1 = require("../exceptions");
class P2WPKHAddress extends address_1.Address {
    static hrp = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.HRP;
    static witnessVersion = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WPKH;
    static getName() {
        return 'P2WPKH';
    }
    static encode(publicKey, options = {
        hrp: this.hrp,
        publicKeyType: consts_1.PUBLIC_KEY_TYPES.COMPRESSED,
        witnessVersion: this.witnessVersion
    }) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Secp256k1PublicKey);
        const rawPubBytes = options.publicKeyType === consts_1.PUBLIC_KEY_TYPES.UNCOMPRESSED
            ? pk.getRawUncompressed() : pk.getRawCompressed();
        const pubKeyHash = (0, crypto_1.hash160)(rawPubBytes);
        const hrp = options.hrp ?? this.hrp;
        const witnessVersion = options.witnessVersion ?? this.witnessVersion;
        return (0, utils_1.ensureString)((0, segwit_bech32_1.segwitEncode)(hrp, witnessVersion, pubKeyHash));
    }
    static decode(address, options = { hrp: this.hrp }) {
        const hrp = options.hrp ?? this.hrp;
        const [witnessVersion, decoded] = (0, segwit_bech32_1.segwitDecode)(hrp, address);
        if (!decoded) {
            throw new exceptions_1.AddressError('Invalid address decoding');
        }
        return (0, utils_1.bytesToString)(decoded);
    }
}
exports.P2WPKHAddress = P2WPKHAddress;
//# sourceMappingURL=p2wpkh.js.map