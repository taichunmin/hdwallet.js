"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuiAddress = void 0;
const cryptocurrencies_1 = require("../cryptocurrencies");
const crypto_1 = require("../crypto");
const eccs_1 = require("../eccs");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
const address_1 = require("./address");
class SuiAddress extends address_1.Address {
    static keyType = (0, utils_1.integerToBytes)(cryptocurrencies_1.Sui.PARAMS.KEY_TYPE);
    static addressPrefix = cryptocurrencies_1.Sui.PARAMS.ADDRESS_PREFIX;
    static getName() {
        return 'Sui';
    }
    static encode(publicKey) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Ed25519PublicKey);
        const raw = pk.getRawCompressed().subarray(1);
        const hash = (0, crypto_1.blake2b256)((0, utils_1.getBytes)(new Uint8Array([...this.keyType, ...raw])));
        return this.addressPrefix + (0, utils_1.bytesToString)(hash);
    }
    static decode(address) {
        const prefix = address.slice(0, this.addressPrefix.length);
        if (prefix !== this.addressPrefix) {
            throw new exceptions_1.AddressError('Invalid address prefix', {
                expected: this.addressPrefix, got: prefix
            });
        }
        const body = address.slice(this.addressPrefix.length);
        if (body.length !== 64) {
            throw new exceptions_1.AddressError('Invalid address length', {
                expected: 64, got: body.length
            });
        }
        return body;
    }
}
exports.SuiAddress = SuiAddress;
//# sourceMappingURL=sui.js.map