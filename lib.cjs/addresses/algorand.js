"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorandAddress = void 0;
const cryptocurrencies_1 = require("../cryptocurrencies");
const base32_1 = require("../libs/base32");
const crypto_1 = require("../crypto");
const eccs_1 = require("../eccs");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
const address_1 = require("./address");
class AlgorandAddress extends address_1.Address {
    static checksumLength = cryptocurrencies_1.Algorand.PARAMS.CHECKSUM_LENGTH;
    static getName() {
        return 'Algorand';
    }
    static computeChecksum(publicKey) {
        return (0, crypto_1.sha512_256)(publicKey).subarray(-4);
    }
    static encode(publicKey) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Ed25519PublicKey);
        const raw = pk.getRawCompressed().subarray(1);
        const checksum = this.computeChecksum(raw);
        return (0, base32_1.encodeNoPadding)((0, utils_1.bytesToString)((0, utils_1.concatBytes)(raw, checksum)));
    }
    static decode(address) {
        const decoded = (0, utils_1.getBytes)((0, base32_1.decode)(address));
        const expectedLength = eccs_1.SLIP10Ed25519PublicKey.getCompressedLength() - 1 + this.checksumLength;
        if (decoded.length !== expectedLength) {
            throw new exceptions_1.AddressError('Invalid decoded length', {
                expected: expectedLength, got: decoded.length
            });
        }
        const pubkey = decoded.subarray(0, decoded.length - this.checksumLength);
        const checksum = decoded.subarray(-this.checksumLength);
        const gotChecksum = this.computeChecksum(pubkey);
        if (!(0, utils_1.equalBytes)(checksum, gotChecksum)) {
            throw new exceptions_1.AddressError('Invalid checksum', {
                expected: (0, utils_1.bytesToString)(checksum), got: (0, utils_1.bytesToString)(gotChecksum)
            });
        }
        if (!eccs_1.SLIP10Ed25519PublicKey.isValidBytes(pubkey)) {
            throw new exceptions_1.AddressError('Invalid public key');
        }
        return (0, utils_1.bytesToString)(pubkey);
    }
}
exports.AlgorandAddress = AlgorandAddress;
//# sourceMappingURL=algorand.js.map