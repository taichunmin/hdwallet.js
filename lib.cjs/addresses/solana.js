"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaAddress = void 0;
const cryptocurrencies_1 = require("../cryptocurrencies");
const base58_1 = require("../libs/base58");
const eccs_1 = require("../eccs");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
const address_1 = require("./address");
class SolanaAddress extends address_1.Address {
    static alphabet = cryptocurrencies_1.Solana.PARAMS.ALPHABET;
    static getName() {
        return 'Solana';
    }
    static encode(publicKey) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Ed25519PublicKey);
        return (0, utils_1.ensureString)((0, base58_1.encode)((0, utils_1.getBytes)(pk.getRawCompressed().subarray(1))));
    }
    static decode(address) {
        const publicKey = (0, base58_1.decode)(address);
        const expectedLength = eccs_1.SLIP10Ed25519PublicKey.getCompressedLength() - 1;
        if (publicKey.length !== expectedLength) {
            throw new exceptions_1.AddressError('Invalid public key length', {
                expected: expectedLength, got: publicKey.length
            });
        }
        if (!eccs_1.SLIP10Ed25519PublicKey.isValidBytes(publicKey)) {
            throw new exceptions_1.AddressError(`Invalid SLIP10-Ed25519 public key`);
        }
        return (0, utils_1.bytesToString)(publicKey);
    }
}
exports.SolanaAddress = SolanaAddress;
//# sourceMappingURL=solana.js.map