"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosAddress = void 0;
const bech32_1 = require("../libs/bech32");
const eccs_1 = require("../eccs");
const cryptocurrencies_1 = require("../cryptocurrencies");
const crypto_1 = require("../crypto");
const utils_1 = require("../utils");
const address_1 = require("./address");
const exceptions_1 = require("../exceptions");
class CosmosAddress extends address_1.Address {
    static hrp = cryptocurrencies_1.Cosmos.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'Cosmos';
    }
    static encode(publicKey, options = {
        hrp: this.hrp
    }) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Secp256k1PublicKey);
        const hash = (0, crypto_1.ripemd160)((0, crypto_1.sha256)(pk.getRawCompressed()));
        const hrp = options.hrp ?? this.hrp;
        const encoded = (0, bech32_1.bech32Encode)(hrp, hash);
        if (encoded === null) {
            throw new exceptions_1.AddressError('Failed to encode Bech32 address');
        }
        return encoded;
    }
    static decode(address, options = {
        hrp: this.hrp
    }) {
        const hrp = options.hrp ?? this.hrp;
        const [gotHrp, decoded] = (0, bech32_1.bech32Decode)(hrp, address);
        if (typeof gotHrp !== 'string' || gotHrp !== hrp) {
            throw new exceptions_1.AddressError('Invalid HRP prefix or decode failure', {
                expected: hrp, got: gotHrp
            });
        }
        return (0, utils_1.bytesToString)(decoded);
    }
}
exports.CosmosAddress = CosmosAddress;
//# sourceMappingURL=cosmos.js.map