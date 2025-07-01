"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Ed25519PublicKey = void 0;
const ed25519_1 = require("@noble/curves/ed25519");
const public_key_1 = require("../../public-key");
const consts_1 = require("../../../consts");
const point_1 = require("./point");
const utils_1 = require("../../../utils");
class SLIP10Ed25519PublicKey extends public_key_1.PublicKey {
    getName() {
        return 'SLIP10-Ed25519';
    }
    static fromBytes(publicKey) {
        let data = publicKey;
        const prefix = consts_1.SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX;
        if (data.length === prefix.length + consts_1.SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH &&
            data[0] === prefix[0]) {
            data = data.slice(prefix.length);
        }
        if (data.length !== consts_1.SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH) {
            throw new Error('Invalid key bytes length');
        }
        try {
            const pt = ed25519_1.ed25519.Point.fromHex(data);
            return new this(pt);
        }
        catch {
            throw new Error('Invalid key bytes');
        }
    }
    static fromPoint(point) {
        const raw = point.getRawEncoded();
        return this.fromBytes(raw);
    }
    static getCompressedLength() {
        return consts_1.SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH + consts_1.SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX.length;
    }
    static getUncompressedLength() {
        return this.getCompressedLength();
    }
    getUnderlyingObject() {
        return this.publicKey;
    }
    getRawCompressed() {
        return (0, utils_1.concatBytes)(consts_1.SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX, this.publicKey.toRawBytes());
    }
    getRawUncompressed() {
        return this.getRawCompressed();
    }
    getPoint() {
        return new point_1.SLIP10Ed25519Point(this.publicKey);
    }
}
exports.SLIP10Ed25519PublicKey = SLIP10Ed25519PublicKey;
//# sourceMappingURL=public-key.js.map