"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconAddress = void 0;
const cryptocurrencies_1 = require("../cryptocurrencies");
const eccs_1 = require("../eccs");
const crypto_1 = require("../crypto");
const utils_1 = require("../utils");
const address_1 = require("./address");
const exceptions_1 = require("../exceptions");
class IconAddress extends address_1.Address {
    static addressPrefix = cryptocurrencies_1.Icon.PARAMS.ADDRESS_PREFIX;
    static keyHashLength = cryptocurrencies_1.Icon.PARAMS.KEY_HASH_LENGTH;
    static getName() {
        return 'Icon';
    }
    static encode(publicKey) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Secp256k1PublicKey);
        const raw = pk.getRawUncompressed().slice(1); // Remove prefix byte (0x04)
        const hash = (0, crypto_1.sha3_256)(raw).slice(-this.keyHashLength);
        return this.addressPrefix + (0, utils_1.bytesToString)(hash);
    }
    static decode(address) {
        const prefix = this.addressPrefix;
        if (!address.startsWith(prefix)) {
            throw new exceptions_1.AddressError('Invalid prefix', {
                expected: prefix, got: address.slice(0, prefix.length)
            });
        }
        const withoutPrefix = address.slice(prefix.length);
        const keyHash = (0, utils_1.getBytes)(withoutPrefix);
        if (keyHash.length !== this.keyHashLength) {
            throw new exceptions_1.AddressError('Invalid length', {
                expected: this.keyHashLength, got: keyHash.length
            });
        }
        return (0, utils_1.bytesToString)(keyHash);
    }
}
exports.IconAddress = IconAddress;
//# sourceMappingURL=icon.js.map