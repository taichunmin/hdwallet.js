// lib.esm/libs/ed25519-utils.ts
// SPDX-License-Identifier: MIT
// Ed25519 helpers implemented with the pure-JS “elliptic” package
// (no native sodium bindings).

import { eddsa as EDDSA } from 'elliptic';
import BN from 'bn.js';
import { bytesToInteger, integerToBytes } from '../utils';

const ed: any = new EDDSA('ed25519');        // Twisted-Edwards Ed25519 curve
const L  = new BN(ed.curve.n);          // group order (≈ 2^252 + …)

const COORD_LEN = 32;                   // 32-byte compressed keys

/* ------------------------------------------------------------------ */
/*  basic bigint / Uint8 helpers (little-endian)                      */
/* ------------------------------------------------------------------ */

export function intDecode(le: Uint8Array): bigint {
  return bytesToInteger(le, true); // little-endian
}

export function intEncode(x: bigint): Uint8Array {
  return integerToBytes(x, COORD_LEN, 'little');
}

function toBN(input: Uint8Array | number | bigint): BN {
  if (typeof input === 'number')  input = BigInt(input);
  if (typeof input === 'bigint')  return new BN(input.toString());
  // Uint8Array → BN (little-endian)
  return new BN([...input].reverse());  // BN ctor assumes big-endian
}

function scalar32(input: Uint8Array | number | bigint): Uint8Array {
  if (input instanceof Uint8Array) {
    if (input.length !== COORD_LEN) throw new Error('scalar must be 32 bytes');
    return input;
  }
  return intEncode(BigInt(input));
}

/* ------------------------------------------------------------------ */
/*  Point helpers                                                     */
/* ------------------------------------------------------------------ */

function decodePoint(p: Uint8Array) {
  if (p.length !== COORD_LEN) throw new Error('point must be 32 bytes');
  return ed.decodePoint(p);
}
function encodePoint(P: any): Uint8Array {
  return Uint8Array.from(ed.encodePoint(P));
}

/**
 * Add two Ed25519 public keys (compressed 32-byte form).
 */
export function pointAdd(p1: Uint8Array, p2: Uint8Array): Uint8Array {
  const P1 = decodePoint(p1);
  const P2 = decodePoint(p2);
  return encodePoint(P1.add(P2));
}

/**
 * Scalar-multiply an arbitrary point (no clamping).
 */
export function pointScalarMul(
  k: Uint8Array | number | bigint,
  point: Uint8Array
): Uint8Array {
  const K = toBN(scalar32(k));
  const P = decodePoint(point);
  return encodePoint(P.mul(K));
}

/**
 * Scalar-multiply the Ed25519 base point (no clamping).
 */
export function pointScalarMulBase(k: Uint8Array | number | bigint): Uint8Array {
  const K = toBN(scalar32(k));
  return encodePoint(ed.g.mul(K));
}

/**
 * Reduce up-to-64-byte scalar mod group order L.
 */
export function scalarReduce(s: Uint8Array | number | bigint): Uint8Array {
  const bn = toBN(s instanceof Uint8Array ? s : intEncode(BigInt(s)));
  const r  = bn.umod(L);                 // r = s mod L
  return intEncode(BigInt(r.toString()));
}
