// SPDX-License-Identifier: MIT

import * as sodium from 'sodium-native';
import { bytesToInteger, integerToBytes } from '../utils';

// constants replaced with BigInt(...) calls
const ZERO = BigInt(0);
const MASK8 = BigInt(0xff);   // 255
const SHIFT8 = BigInt(8);     // 8 bits
const COORD_BYTE_LEN = 32;

/**
 * Decodes a little-endian Uint8Array into a bigint.
 * @param input Uint8Array representing the integer in little-endian format.
 * @returns bigint
 */
export function intDecode(input: Uint8Array): bigint {
  return bytesToInteger(input, true); // true = little-endian
}

/**
 * Encodes a bigint into a little-endian Uint8Array of length 32.
 * @param value bigint to encode.
 * @returns Uint8Array
 */
export function intEncode(value: bigint): Uint8Array {
  return integerToBytes(value, COORD_BYTE_LEN, 'little');
}

/** normalize a number|bigint|Uint8Array into a 32-byte LE Uint8Array */
function normalizeScalar32(input: Uint8Array | number | bigint): Uint8Array {
  if (input instanceof Uint8Array) {
    if (input.length !== 32) {
      throw new Error(`Invalid scalar length: expected 32 bytes, got ${input.length}`);
    }
    return input;
  }

  // number → bigint
  const big: bigint = typeof input === 'number'
    ? BigInt(input)
    : input;

  if (big < ZERO) {
    throw new Error('Scalar must be non-negative');
  }

  const buf = new Uint8Array(32);
  let tmp = big;
  for (let i = 0; i < 32; i++) {
    buf[i] = Number(tmp & MASK8);
    tmp = tmp >> SHIFT8;
    if (tmp === ZERO) break;
  }
  return buf;
}

/** normalize a number|bigint|Uint8Array into a 64-byte LE Buffer */
function normalizeScalar64(input: Uint8Array | number | bigint): Buffer {
  if (input instanceof Uint8Array) {
    if (input.length > 64) {
      throw new Error(`Invalid scalar length: expected ≤64 bytes, got ${input.length}`);
    }
    const b = Buffer.alloc(64, 0);
    b.set(input);
    return b;
  }

  const big: bigint = typeof input === 'number'
    ? BigInt(input)
    : input;

  if (big < ZERO) {
    throw new Error('Scalar must be non-negative');
  }

  const buf = Buffer.alloc(64, 0);
  let tmp = big;
  for (let i = 0; i < 64; i++) {
    buf[i] = Number(tmp & MASK8);
    tmp = tmp >> SHIFT8;
    if (tmp === ZERO) break;
  }
  return buf;
}

/**
 * Add two Ed25519 points.
 */
export function pointAdd(p1: Uint8Array, p2: Uint8Array): Uint8Array {
  if (p1.length !== 32 || p2.length !== 32) {
    throw new Error(`Invalid point length: expected 32 bytes each, got ${p1.length} and ${p2.length}`);
  }
  const out = Buffer.alloc(32);
  sodium.crypto_core_ed25519_add(out, Buffer.from(p1), Buffer.from(p2));
  return out;
}

/**
 * Scalar-multiply an arbitrary point without clamping.
 */
export function pointScalarMul(
  scalar: Uint8Array | number | bigint,
  point: Uint8Array
): Uint8Array {
  if (point.length !== 32) {
    throw new Error(`Invalid point length: expected 32 bytes, got ${point.length}`);
  }
  const scalarBytes = normalizeScalar32(scalar);
  const out = Buffer.alloc(32);
  sodium.crypto_scalarmult_ed25519_noclamp(out, Buffer.from(scalarBytes), Buffer.from(point));
  return out;
}

/**
 * Scalar-multiply the Ed25519 base point without clamping.
 */
export function pointScalarMulBase(scalar: Uint8Array | number | bigint): Uint8Array {
  const scalarBytes = normalizeScalar32(scalar);
  const out = Buffer.alloc(32);
  sodium.crypto_scalarmult_ed25519_base_noclamp(out, Buffer.from(scalarBytes));
  return out;
}

/**
 * Reduce a (up to) 64-byte scalar mod the Ed25519 group order.
 */
export function scalarReduce(scalar: Uint8Array | number | bigint): Uint8Array {
  const buf64 = normalizeScalar64(scalar);
  const out = Buffer.alloc(32);
  sodium.crypto_core_ed25519_scalar_reduce(out, buf64);
  return out;
}
