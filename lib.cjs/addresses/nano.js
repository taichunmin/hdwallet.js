"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanoAddress = void 0;
const cryptocurrencies_1 = require("../cryptocurrencies");
const exceptions_1 = require("../exceptions");
const base32_1 = require("../libs/base32");
const crypto_1 = require("../crypto");
const eccs_1 = require("../eccs");
const utils_1 = require("../utils");
const address_1 = require("./address");
class NanoAddress extends address_1.Address {
    static addressPrefix = cryptocurrencies_1.Nano.PARAMS.ADDRESS_PREFIX;
    static alphabet = cryptocurrencies_1.Nano.PARAMS.ALPHABET;
    static payloadPaddingDecoded = (0, utils_1.getBytes)(cryptocurrencies_1.Nano.PARAMS.PAYLOAD_PADDING_DECODED);
    static payloadPaddingEncoded = cryptocurrencies_1.Nano.PARAMS.PAYLOAD_PADDING_ENCODED;
    static getName() {
        return 'Nano';
    }
    static computeChecksum(publicKey) {
        return (0, utils_1.bytesReverse)((0, crypto_1.blake2b40)(publicKey));
    }
    static encode(publicKey) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Ed25519Blake2bPublicKey);
        const raw = pk.getRawCompressed().subarray(1);
        const checksum = this.computeChecksum((0, utils_1.getBytes)(raw));
        const payload = (0, utils_1.concatBytes)(this.payloadPaddingDecoded, raw, checksum);
        const b32 = (0, base32_1.encodeNoPadding)((0, utils_1.bytesToString)(payload), this.alphabet);
        return this.addressPrefix + b32.slice(this.payloadPaddingEncoded.length);
    }
    static decode(address) {
        const prefix = address.slice(0, this.addressPrefix.length);
        if (prefix !== this.addressPrefix) {
            throw new exceptions_1.AddressError('Invalid prefix', { expected: this.addressPrefix, got: prefix });
        }
        const body = address.slice(this.addressPrefix.length);
        const fullEncoded = this.payloadPaddingEncoded + body;
        const decoded = (0, utils_1.getBytes)((0, base32_1.decode)(fullEncoded, this.alphabet));
        const expectedLen = this.payloadPaddingDecoded.length + eccs_1.SLIP10Ed25519Blake2bPublicKey.getCompressedLength() - 1 + 5;
        if (decoded.length !== expectedLen) {
            throw new exceptions_1.AddressError('Invalid decoded length', { expected: expectedLen, got: decoded.length });
        }
        const data = decoded.subarray(this.payloadPaddingDecoded.length);
        const pubkey = data.subarray(0, data.length - 5);
        const checksum = data.subarray(-5);
        const gotChecksum = this.computeChecksum(pubkey);
        if (!(0, utils_1.equalBytes)(checksum, gotChecksum)) {
            throw new exceptions_1.AddressError('Invalid checksum', {
                expected: (0, utils_1.bytesToString)(checksum), got: (0, utils_1.bytesToString)(gotChecksum)
            });
        }
        if (!eccs_1.SLIP10Ed25519Blake2bPublicKey.isValidBytes(pubkey)) {
            throw new exceptions_1.AddressError('Invalid public key');
        }
        return (0, utils_1.bytesToString)(pubkey);
    }
}
exports.NanoAddress = NanoAddress;
//# sourceMappingURL=nano.js.map