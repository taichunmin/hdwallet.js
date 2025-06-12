"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Ed25519Point = void 0;
const ed25519_1 = require("@noble/curves/ed25519");
const point_1 = require("../../point");
const consts_1 = require("../../../consts");
const utils_1 = require("../../../utils");
class SLIP10Ed25519Point extends point_1.Point {
    getName() {
        return 'SLIP10-Ed25519';
    }
    static fromBytes(point) {
        if (point.length !== consts_1.SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH) {
            throw new Error('Invalid point bytes length');
        }
        try {
            const pt = ed25519_1.ed25519.Point.fromHex(point);
            return new this(pt);
        }
        catch {
            throw new Error('Invalid point bytes');
        }
    }
    static fromCoordinates(x, y) {
        try {
            const pt = ed25519_1.ed25519.Point.fromAffine({ x, y });
            return new this(pt);
        }
        catch {
            throw new Error('Invalid coordinates for ed25519');
        }
    }
    getUnderlyingObject() {
        return this.point;
    }
    getX() {
        return this.point.x;
    }
    getY() {
        return this.point.y;
    }
    getRawEncoded() {
        return this.point.toRawBytes();
    }
    getRawDecoded() {
        const xBytes = this.point.x.toString(16).padStart(64, '0');
        const yBytes = this.point.y.toString(16).padStart(64, '0');
        return Uint8Array.from((0, utils_1.toBuffer)(xBytes + yBytes, 'hex'));
    }
    add(point) {
        const other = point.getUnderlyingObject();
        const sum = this.point.add(other);
        return new SLIP10Ed25519Point(sum);
    }
    multiply(scalar) {
        const prod = this.point.multiply(scalar);
        return new SLIP10Ed25519Point(prod);
    }
}
exports.SLIP10Ed25519Point = SLIP10Ed25519Point;
//# sourceMappingURL=point.js.map