"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumAddress = void 0;
const eccs_1 = require("../eccs");
const cryptocurrencies_1 = require("../cryptocurrencies");
const crypto_1 = require("../crypto");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
const address_1 = require("./address");
class EthereumAddress extends address_1.Address {
    static addressPrefix = cryptocurrencies_1.Ethereum.PARAMS.ADDRESS_PREFIX;
    static getName() {
        return 'Ethereum';
    }
    static checksumEncode(address) {
        let output = '';
        const addressHash = (0, utils_1.bytesToString)((0, crypto_1.keccak256)(new TextEncoder().encode(address.toLowerCase())));
        for (let i = 0; i < address.length; i++) {
            output += parseInt(addressHash[i], 16) >= 8
                ? address[i].toUpperCase()
                : address[i];
        }
        return output;
    }
    static encode(publicKey, options = {
        skipChecksumEncode: false
    }) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Secp256k1PublicKey);
        const pubKeyHash = (0, utils_1.bytesToString)((0, crypto_1.keccak256)(pk.getRawUncompressed().slice(1))).slice(-40);
        return this.addressPrefix + (options.skipChecksumEncode ? pubKeyHash : this.checksumEncode(pubKeyHash));
    }
    static decode(address, options = {
        skipChecksumEncode: false
    }) {
        const prefix = address.slice(0, this.addressPrefix.length);
        if (prefix !== this.addressPrefix) {
            throw new exceptions_1.AddressError('Invalid address prefix', {
                expected: this.addressPrefix,
                got: prefix
            });
        }
        const addressPart = address.slice(this.addressPrefix.length);
        if (addressPart.length !== 40) {
            throw new exceptions_1.AddressError('Invalid length', {
                expected: 40,
                got: addressPart.length
            });
        }
        if (!options.skipChecksumEncode && addressPart !== this.checksumEncode(addressPart)) {
            throw new exceptions_1.AddressError('Invalid checksum encode', {
                expected: this.checksumEncode(addressPart),
                got: addressPart
            });
        }
        return addressPart.toLowerCase();
    }
}
exports.EthereumAddress = EthereumAddress;
//# sourceMappingURL=ethereum.js.map