"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Ed25519MoneroPublicKey = void 0;
const point_1 = require("./point");
const ed25519_1 = require("../../ed25519");
const consts_1 = require("../../../../consts");
class SLIP10Ed25519MoneroPublicKey extends ed25519_1.SLIP10Ed25519PublicKey {
    getName() {
        return 'SLIP10-Ed25519-Monero';
    }
    getRawCompressed() {
        return this.publicKey.toRawBytes();
    }
    static getCompressedLength() {
        return consts_1.SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH;
    }
    getPoint() {
        return new point_1.SLIP10Ed25519MoneroPoint(this.publicKey);
    }
}
exports.SLIP10Ed25519MoneroPublicKey = SLIP10Ed25519MoneroPublicKey;
//# sourceMappingURL=public-key.js.map