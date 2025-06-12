"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeoAddress = void 0;
const cryptocurrencies_1 = require("../cryptocurrencies");
const base58_1 = require("../libs/base58");
const crypto_1 = require("../crypto");
const eccs_1 = require("../eccs");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
const address_1 = require("./address");
class NeoAddress extends address_1.Address {
    static addressPrefix = (0, utils_1.integerToBytes)(cryptocurrencies_1.Neo.PARAMS.ADDRESS_PREFIX);
    static addressSuffix = (0, utils_1.integerToBytes)(cryptocurrencies_1.Neo.PARAMS.ADDRESS_SUFFIX);
    static addressVersion = (0, utils_1.integerToBytes)(cryptocurrencies_1.Neo.PARAMS.ADDRESS_VERSION);
    static alphabet = cryptocurrencies_1.Neo.PARAMS.ALPHABET;
    static getName() {
        return 'Neo';
    }
    static encode(publicKey, options = {
        addressVersion: this.addressVersion, alphabet: this.alphabet
    }) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Nist256p1PublicKey);
        const payload = (0, utils_1.concatBytes)(this.addressPrefix, pk.getRawCompressed(), this.addressSuffix);
        const hashed = (0, crypto_1.hash160)(payload);
        const version = (0, utils_1.getBytes)(options.addressVersion ?? this.addressVersion);
        return (0, utils_1.ensureString)((0, base58_1.checkEncode)((0, utils_1.getBytes)((0, utils_1.concatBytes)(version, hashed)), options.alphabet ?? this.alphabet));
    }
    static decode(address, options = {
        addressVersion: this.addressVersion, alphabet: this.alphabet
    }) {
        const decoded = (0, base58_1.checkDecode)(address, options.alphabet ?? this.alphabet);
        const version = (0, utils_1.getBytes)(options.addressVersion ?? this.addressVersion);
        const expectedLength = 20 + version.length;
        if (decoded.length !== expectedLength) {
            throw new exceptions_1.AddressError('Invalid length', {
                expected: expectedLength, got: decoded.length
            });
        }
        const versionGot = decoded.subarray(0, version.length);
        if (!(0, utils_1.equalBytes)(version, versionGot)) {
            throw new exceptions_1.AddressError('Invalid address version', {
                expected: (0, utils_1.bytesToString)(version), got: (0, utils_1.bytesToString)(versionGot)
            });
        }
        return (0, utils_1.bytesToString)(decoded.subarray(version.length));
    }
}
exports.NeoAddress = NeoAddress;
//# sourceMappingURL=neo.js.map