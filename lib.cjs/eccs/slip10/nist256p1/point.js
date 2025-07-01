"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Nist256p1Point = void 0;
const p256_1 = require("@noble/curves/p256");
const utils_1 = require("@noble/curves/abstract/utils");
const point_1 = require("../../point");
const consts_1 = require("../../../consts");
const utils_2 = require("../../../utils");
class SLIP10Nist256p1Point extends point_1.Point {
    getName() {
        return 'SLIP10-Nist256p1';
    }
    static fromBytes(point) {
        try {
            const pt = p256_1.p256.Point.fromHex((0, utils_2.getBytes)(point));
            return new SLIP10Nist256p1Point(pt);
        }
        catch {
            if (point.length === consts_1.SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH * 2) {
                const x = (0, utils_1.bytesToNumberBE)(point.slice(0, consts_1.SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH));
                const y = (0, utils_1.bytesToNumberBE)(point.slice(consts_1.SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH));
                return SLIP10Nist256p1Point.fromCoordinates(BigInt(x), BigInt(y));
            }
            throw new Error('Invalid point bytes');
        }
    }
    static fromCoordinates(x, y) {
        const pt = new p256_1.p256.Point(BigInt(x), BigInt(y), 1n);
        return new SLIP10Nist256p1Point(pt);
    }
    getUnderlyingObject() {
        return this.point;
    }
    getX() {
        return this.point.toAffine().x;
    }
    getY() {
        return this.point.toAffine().y;
    }
    getRawEncoded() {
        return this.point.toRawBytes(true);
    }
    getRawDecoded() {
        return this.point.toRawBytes(false).slice(1); // strip leading `0x04`
    }
    add(other) {
        const p = other.getUnderlyingObject();
        return new SLIP10Nist256p1Point(this.point.add(p));
    }
    multiply(scalar) {
        return new SLIP10Nist256p1Point(this.point.multiply(scalar));
    }
}
exports.SLIP10Nist256p1Point = SLIP10Nist256p1Point;
//# sourceMappingURL=point.js.map