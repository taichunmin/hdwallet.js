"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Secp256k1PublicKey = void 0;
const secp256k1_1 = require("@noble/curves/secp256k1");
const public_key_1 = require("../../public-key");
const point_1 = require("./point");
const consts_1 = require("../../../consts");
const utils_1 = require("../../../utils");
class SLIP10Secp256k1PublicKey extends public_key_1.PublicKey {
    getName() {
        return 'SLIP10-Secp256k1';
    }
    static fromBytes(publicKey) {
        try {
            const point = secp256k1_1.secp256k1.Point.fromHex((0, utils_1.getBytes)(publicKey));
            return new SLIP10Secp256k1PublicKey(point);
        }
        catch {
            throw new Error('Invalid key bytes');
        }
    }
    static fromPoint(point) {
        const base = point.getUnderlyingObject();
        return new SLIP10Secp256k1PublicKey(base);
    }
    static getCompressedLength() {
        return consts_1.SLIP10_SECP256K1_CONST.PUBLIC_KEY_COMPRESSED_BYTE_LENGTH;
    }
    static getUncompressedLength() {
        return consts_1.SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH;
    }
    getUnderlyingObject() {
        return this.publicKey;
    }
    getRawCompressed() {
        return this.publicKey.toRawBytes(true);
    }
    getRawUncompressed() {
        return this.publicKey.toRawBytes(false);
    }
    getRaw() {
        return this.getRawCompressed();
    }
    getPoint() {
        return new point_1.SLIP10Secp256k1Point(this.publicKey);
    }
}
exports.SLIP10Secp256k1PublicKey = SLIP10Secp256k1PublicKey;
//# sourceMappingURL=public-key.js.map