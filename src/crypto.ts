// SPDX-License-Identifier: MIT

import crc from 'crc';
import { hmac } from '@noble/hashes/hmac';
import {
  sha256 as nobleSha256, sha512 as nobleSha512, sha512_256 as nobleSha512_256
} from '@noble/hashes/sha2';
import { sha3_256 as nobleSha3_256, keccak_256 as nobleKeccak256 } from '@noble/hashes/sha3';
import { blake2b as nobleBlake2b } from '@noble/hashes/blake2';
import { pbkdf2 } from '@noble/hashes/pbkdf2';
import { ripemd160 as nobleRipemd160 } from '@noble/hashes/legacy';
import { ChaCha20Poly1305 } from '@stablelib/chacha20poly1305';

import { toBuffer, integerToBytes, concatBytes } from './utils';
import { SLIP10_SECP256K1_CONST } from './const';


/* ------------------------------------------------------------------
 * HMAC helpers (SHA-256 & SHA-512) via @noble/hashes
 * ---------------------------------------------------------------- */
export function hmacSha256(
  key: Buffer | Uint8Array | string,
  data: Buffer | Uint8Array | string
): Buffer {
  const mac = hmac(nobleSha256, toBuffer(key), toBuffer(data)); // ← key first!
  return Buffer.from(mac);
}

export function hmacSha512(
  key: Buffer | Uint8Array | string,
  data: Buffer | Uint8Array | string
): Buffer {
  const mac = hmac(nobleSha512, toBuffer(key), toBuffer(data)); // ← key first!
  return Buffer.from(mac);
}

/* ------------------------------------------------------------------
 * Blake2b helpers (fully browser-compatible via @noble/hashes)
 * ---------------------------------------------------------------- */
function blake2b(
  data: Buffer | Uint8Array | string,
  digestSize: number,
  key: Buffer | Uint8Array | string = Buffer.alloc(0),
  salt: Buffer | Uint8Array | string = Buffer.alloc(0),
  personalize?: Buffer | Uint8Array | string
): Buffer {
  const msg = toBuffer(data);
  const k   = toBuffer(key);
  const s   = toBuffer(salt);
  const p   = personalize ? toBuffer(personalize) : undefined;

  const hashBytes = nobleBlake2b(msg, {
    dkLen: digestSize,
    key: k.length > 0 ? k : undefined,
    salt: s.length > 0 ? s : undefined,
    personalize: p,
  });
  return Buffer.from(hashBytes);
}

export const blake2b32  = (d: any, k?: any, s?: any) => blake2b(d,  4, k, s);
export const blake2b40  = (d: any, k?: any, s?: any) => blake2b(d,  5, k, s);
export const blake2b160 = (d: any, k?: any, s?: any) => blake2b(d, 20, k, s);
export const blake2b224 = (d: any, k?: any, s?: any) => blake2b(d, 28, k, s);
export const blake2b256 = (d: any, k?: any, s?: any) => blake2b(d, 32, k, s);
export const blake2b512 = (d: any, k?: any, s?: any) => blake2b(d, 64, k, s);

/* ------------------------------------------------------------------
 * ChaCha20-Poly1305 (via @stablelib/chacha20poly1305)
 * ---------------------------------------------------------------- */
export function chacha20Poly1305Encrypt(
  key: Buffer | Uint8Array | string,
  nonce: Buffer | Uint8Array | string,
  aad: Buffer | Uint8Array | string,
  plaintext: Buffer | Uint8Array | string
): { cipherText: Buffer; tag: Buffer } {
  const aead = new ChaCha20Poly1305(toBuffer(key)); // key must be 32 bytes
  const ciphertextWithTag = aead.seal(
    toBuffer(nonce),
    toBuffer(plaintext),
    toBuffer(aad)
  );
  // split cipher & tag (last 16 bytes)
  const ct  = ciphertextWithTag.slice(0, -16);
  const tag = ciphertextWithTag.slice(-16);
  return { cipherText: Buffer.from(ct), tag: Buffer.from(tag) };
}

export function chacha20Poly1305Decrypt(
  key: Buffer | Uint8Array | string,
  nonce: Buffer | Uint8Array | string,
  aad: Buffer | Uint8Array | string,
  ciphertext: Buffer | Uint8Array | string,
  tag: Buffer | Uint8Array | string
): Buffer {
  const aead     = new ChaCha20Poly1305(toBuffer(key));
  const combined = concatBytes(toBuffer(ciphertext), toBuffer(tag));
  const pt = aead.open(toBuffer(nonce), combined, toBuffer(aad));
  if (!pt) throw new Error('ChaCha20-Poly1305: authentication failed');
  return Buffer.from(pt);
}

/* ------------------------------------------------------------------
 * SHA family (SHA-256, double SHA-256, SHA-512, SHA-512/256)
 * ---------------------------------------------------------------- */
export function sha256(data: Buffer | Uint8Array | string): Buffer {
  const bytes       = toBuffer(data);
  const digestBytes = nobleSha256(bytes);
  return Buffer.from(digestBytes);
}

export const doubleSha256 = (d: any) => sha256(sha256(d));

export function sha512(data: Buffer | Uint8Array | string): Buffer {
  const bytes       = toBuffer(data);
  const digestBytes = nobleSha512(bytes);
  return Buffer.from(digestBytes);
}

export function sha512_256(data: Buffer | Uint8Array | string): Buffer {
  const bytes       = toBuffer(data);
  const digestBytes = nobleSha512_256(bytes);
  return Buffer.from(digestBytes);
}

/* ------------------------------------------------------------------
 * KECCAK-256 & SHA3-256 (via @noble/hashes/sha3)
 * ---------------------------------------------------------------- */
export function keccak256(data: Buffer | Uint8Array | string): Buffer {
  const bytes       = toBuffer(data);
  const digestBytes = nobleKeccak256(bytes);
  return Buffer.from(digestBytes);
}

export function sha3_256(data: Buffer | Uint8Array | string): Buffer {
  const bytes       = toBuffer(data);
  const digestBytes = nobleSha3_256(bytes);
  return Buffer.from(digestBytes);
}

/* ------------------------------------------------------------------
 * RIPEMD-160 (via standalone ripemd160 package)
 * ---------------------------------------------------------------- */
export function ripemd160(data: Buffer | Uint8Array | string): Buffer {
  const bytes = toBuffer(data);          // whatever util you already use
  return Buffer.from(nobleRipemd160(bytes));
}

/* ------------------------------------------------------------------
 * HASH160 = RIPEMD-160(SHA-256(data))
 * ---------------------------------------------------------------- */
export function hash160(data: Buffer | Uint8Array | string): Buffer {
  const sha = sha256(data);
  return ripemd160(sha);
}

/* ------------------------------------------------------------------
 * CRC helpers (unchanged)
 * ---------------------------------------------------------------- */
export function crc32(data: Buffer | Uint8Array | string): Buffer {
  const n = crc.crc32(toBuffer(data)) >>> 0;
  return toBuffer(integerToBytes(n, 4));
}

export function xmodemCrc(data: Buffer | Uint8Array | string): Buffer {
  const n = crc.crc16xmodem(toBuffer(data)) & 0xffff;
  return toBuffer(integerToBytes(n, 2));
}

/* ------------------------------------------------------------------
 * PBKDF2-HMAC-SHA-512  (via @noble/hashes)
 * ---------------------------------------------------------------- */
export function pbkdf2HmacSha512(
  password: Buffer | Uint8Array | string,
  salt: Buffer | Uint8Array | string,
  iterations: number,
  keyLen = 64
): Buffer {
  if (iterations <= 0 || !Number.isSafeInteger(iterations))
    throw new RangeError('iterations must be a positive integer');
  if (keyLen <= 0)
    throw new RangeError('keyLen must be > 0');

  const dk = pbkdf2(
    nobleSha512,
    toBuffer(password),
    toBuffer(salt),
    { c: iterations, dkLen: keyLen }    // <-- single call does it all
  );

  return Buffer.from(dk);               // keep your existing Buffer API
}

/* ------------------------------------------------------------------
 * SLIP-10 checksum (double SHA-256 first 4 bytes)
 * ---------------------------------------------------------------- */
export const getChecksum = (d: any): Buffer =>
  doubleSha256(d).slice(0, SLIP10_SECP256K1_CONST.CHECKSUM_BYTE_LENGTH);
