"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.intDecode = intDecode;
exports.intEncode = intEncode;
exports.pointAdd = pointAdd;
exports.pointScalarMul = pointScalarMul;
exports.pointScalarMulBase = pointScalarMulBase;
exports.scalarReduce = scalarReduce;
const ed25519_1 = require("@noble/curves/ed25519");
const utils_1 = require("@noble/curves/abstract/utils");
const utils_2 = require("../utils");
const COORD_LEN = 32;
const CURVE = ed25519_1.ed25519.CURVE;
const L = CURVE.n; // group order
function intDecode(le) {
    return (0, utils_2.bytesToInteger)(le, true); // little-endian
}
function intEncode(x) {
    return (0, utils_2.integerToBytes)(x, COORD_LEN, 'little');
}
function scalar32(input) {
    if (input instanceof Uint8Array) {
        if (input.length !== COORD_LEN)
            throw new Error('scalar must be 32 bytes');
        return input;
    }
    return intEncode(BigInt(input));
}
function decodePoint(p) {
    if (p.length !== COORD_LEN)
        throw new Error('point must be 32 bytes');
    return ed25519_1.ed25519.Point.fromHex(p);
}
function encodePoint(P) {
    return P.toRawBytes();
}
function pointAdd(p1, p2) {
    const P1 = decodePoint(p1);
    const P2 = decodePoint(p2);
    return encodePoint(P1.add(P2));
}
function pointScalarMul(k, point) {
    const scalar = (0, utils_1.bytesToNumberLE)(scalar32(k));
    const P = decodePoint(point);
    return encodePoint(P.multiply(scalar));
}
function pointScalarMulBase(k) {
    const scalar = (0, utils_1.bytesToNumberLE)(scalar32(k)) % L; // <- reduce scalar
    return encodePoint(ed25519_1.ed25519.Point.BASE.multiply(scalar));
}
function scalarReduce(s) {
    const scalar = (0, utils_1.bytesToNumberLE)(s instanceof Uint8Array ? s : intEncode(BigInt(s)));
    const r = scalar % L;
    return intEncode(r);
}
//# sourceMappingURL=ed25519-utils.js.map