// SPDX-License-Identifier: MIT
import { ed25519 } from '@noble/curves/ed25519';
import { bytesToNumberLE } from '@noble/curves/abstract/utils';
import { bytesToInteger, integerToBytes } from '../utils';
const COORD_LEN = 32;
const CURVE = ed25519.CURVE;
const L = CURVE.n; // group order
export function intDecode(le) {
    return bytesToInteger(le, true); // little-endian
}
export function intEncode(x) {
    return integerToBytes(x, COORD_LEN, 'little');
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
    return ed25519.Point.fromHex(p);
}
function encodePoint(P) {
    return P.toRawBytes();
}
export function pointAdd(p1, p2) {
    const P1 = decodePoint(p1);
    const P2 = decodePoint(p2);
    return encodePoint(P1.add(P2));
}
export function pointScalarMul(k, point) {
    const scalar = bytesToNumberLE(scalar32(k));
    const P = decodePoint(point);
    return encodePoint(P.multiply(scalar));
}
export function pointScalarMulBase(k) {
    const scalar = bytesToNumberLE(scalar32(k)) % L; // <- reduce scalar
    return encodePoint(ed25519.Point.BASE.multiply(scalar));
}
export function scalarReduce(s) {
    const scalar = bytesToNumberLE(s instanceof Uint8Array ? s : intEncode(BigInt(s)));
    const r = scalar % L;
    return intEncode(r);
}
//# sourceMappingURL=ed25519-utils.js.map