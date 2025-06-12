"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Secp256k1Point = void 0;
const secp256k1_1 = require("@noble/curves/secp256k1");
const point_1 = require("../../point");
const utils_1 = require("../../../utils");
class SLIP10Secp256k1Point extends point_1.Point {
    getName() {
        return 'SLIP10-Secp256k1';
    }
    static fromBytes(point) {
        try {
            const pubPoint = secp256k1_1.secp256k1.Point.fromHex((0, utils_1.getBytes)(point));
            return new SLIP10Secp256k1Point(pubPoint);
        }
        catch {
            throw new Error('Invalid point bytes');
        }
    }
    static fromCoordinates(x, y) {
        const pt = new secp256k1_1.secp256k1.Point(x, y, 1n);
        return new SLIP10Secp256k1Point(pt);
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
        return this.point.toRawBytes(false).slice(1);
    }
    add(point) {
        const other = point.getUnderlyingObject();
        const sum = this.point.add(other);
        return new SLIP10Secp256k1Point(sum);
    }
    multiply(scalar) {
        const prod = this.point.multiply(scalar);
        return new SLIP10Secp256k1Point(prod);
    }
}
exports.SLIP10Secp256k1Point = SLIP10Secp256k1Point;
//# sourceMappingURL=point.js.map