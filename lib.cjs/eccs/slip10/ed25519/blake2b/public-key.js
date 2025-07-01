"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Ed25519Blake2bPublicKey = void 0;
const public_key_1 = require("../public-key");
const point_1 = require("./point");
class SLIP10Ed25519Blake2bPublicKey extends public_key_1.SLIP10Ed25519PublicKey {
    getName() {
        return 'SLIP10-Ed25519-Blake2b';
    }
    getPoint() {
        return new point_1.SLIP10Ed25519Blake2bPoint(this.publicKey);
    }
}
exports.SLIP10Ed25519Blake2bPublicKey = SLIP10Ed25519Blake2bPublicKey;
//# sourceMappingURL=public-key.js.map