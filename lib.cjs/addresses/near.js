"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearAddress = void 0;
const exceptions_1 = require("../exceptions");
const eccs_1 = require("../eccs");
const utils_1 = require("../utils");
const address_1 = require("./address");
class NearAddress extends address_1.Address {
    static getName() {
        return 'Near';
    }
    static encode(publicKey) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Ed25519PublicKey);
        return (0, utils_1.bytesToString)(pk.getRawCompressed()).slice(2);
    }
    static decode(address) {
        const bytes = (0, utils_1.getBytes)(address);
        const expectedLength = 32;
        if (bytes.length !== expectedLength) {
            throw new exceptions_1.AddressError('Invalid address length', {
                expected: expectedLength, got: bytes.length
            });
        }
        (0, eccs_1.validateAndGetPublicKey)(bytes, eccs_1.SLIP10Ed25519PublicKey);
        return address;
    }
}
exports.NearAddress = NearAddress;
//# sourceMappingURL=near.js.map