// src/cryptoUtils.ts

import { createCipheriv, createDecipheriv, createHash, createHmac, pbkdf2Sync } from 'crypto';
import crc from 'crc';
import { keccak256 as keccak256Hash } from 'js-sha3';
import { SLIP10_SECP256K1_CONST } from './const';
import { toBuffer } from './utils';

/**
 * Convert a non-negative integer to big-endian bytes.
 */
function integerToBytes(num: number, bytes: number): Buffer {
  const buf = Buffer.alloc(bytes);
  for (let i = bytes - 1; i >= 0; i--) {
    buf[i] = num & 0xff;
    num >>>= 8;
  }
  return buf;
}

/**
 * HMAC-SHA256
 */
export function hmacSha256(key: Buffer | string, data: Buffer | string): Buffer {
  return createHmac('sha256', toBuffer(key))
    .update(toBuffer(data))
    .digest();
}

/**
 * HMAC-SHA512
 */
export function hmacSha512(key: Buffer | string, data: Buffer | string): Buffer {
  return createHmac('sha512', toBuffer(key))
    .update(toBuffer(data))
    .digest();
}


/**
 * Low-level BLAKE2b-512 with HMAC key, salt, and custom output length.
 */
export function blake2bSync(
  data: Buffer | string,
  digestSize: number,
  key: Buffer = Buffer.alloc(0),
  salt: Buffer = Buffer.alloc(0)
): Buffer {
  // By typing this as Blake2Options, TS will pick the 'blake2b512' overload.
  const opts = {
    outputLength: digestSize, key, salt
  };
  return createHash("blake2b512", opts)
    .update(data)
    .digest();
}

/**
 * Convenient BLAKE2b: accepts strings or Buffers for data, key, and salt.
 */
export function blake2b(
  data: Buffer | string,
  digestSize: number,
  key: Buffer | string = Buffer.alloc(0),
  salt: Buffer | string = Buffer.alloc(0)
): Buffer {
  const dataBuf = toBuffer(data);
  const keyBuf = toBuffer(key);
  const saltBuf = toBuffer(salt);
  return blake2bSync(dataBuf, digestSize, keyBuf, saltBuf);
}

/** 32-bit (4-byte) BLAKE2b */
export function blake2b32(data: Buffer | string, key?: Buffer | string, salt?: Buffer | string): Buffer {
  return blake2b(data, 4, key, salt);
}

/** 40-bit (5-byte) BLAKE2b */
export function blake2b40(data: Buffer | string, key?: Buffer | string, salt?: Buffer | string): Buffer {
  return blake2b(data, 5, key, salt);
}

/** 160-bit (20-byte) BLAKE2b */
export function blake2b160(data: Buffer | string, key?: Buffer | string, salt?: Buffer | string): Buffer {
  return blake2b(data, 20, key, salt);
}

/** 224-bit (28-byte) BLAKE2b */
export function blake2b224(data: Buffer | string, key?: Buffer | string, salt?: Buffer | string): Buffer {
  return blake2b(data, 28, key, salt);
}

/** 256-bit (32-byte) BLAKE2b */
export function blake2b256(data: Buffer | string, key?: Buffer | string, salt?: Buffer | string): Buffer {
  return blake2b(data, 32, key, salt);
}

/** 512-bit (64-byte) BLAKE2b */
export function blake2b512(data: Buffer | string, key?: Buffer | string, salt?: Buffer | string): Buffer {
  return blake2b(data, 64, key, salt);
}

/**
 * ChaCha20-Poly1305 AEAD encryption.
 */
export function chacha20Poly1305Encrypt(
  key: Buffer | string,
  nonce: Buffer | string,
  aad: Buffer | string,
  plaintext: Buffer | string
): { ciphertext: Buffer; tag: Buffer } {
  const keyBuf = toBuffer(key);
  const iv = toBuffer(nonce);
  const ptBuf = toBuffer(plaintext);
  const aadBuf = toBuffer(aad);

  // create cipher with 16-byte auth tag
  const cipher = createCipheriv(
    "chacha20-poly1305", keyBuf, iv, { authTagLength: 16 }
  );

  // supply AAD plus plaintext length for AEAD
  cipher.setAAD(aadBuf, { plaintextLength: ptBuf.length });

  // encrypt
  const ciphertext = Buffer.concat([
    cipher.update(ptBuf),
    cipher.final(),
  ]);

  // grab the auth tag
  const tag = cipher.getAuthTag();
  return { ciphertext, tag };
}

/**
 * ChaCha20-Poly1305 AEAD decryption.
 */
export function chacha20Poly1305Decrypt(
  key: Buffer | string,
  nonce: Buffer | string,
  aad: Buffer | string,
  ciphertext: Buffer | string,
  tag: Buffer | string
): Buffer {
  const keyBuf = toBuffer(key);
  const iv = toBuffer(nonce);
  const aadBuf = toBuffer(aad);
  const ctBuf = toBuffer(ciphertext);
  const tagBuf = toBuffer(tag);

  const decipher = createDecipheriv(
    "chacha20-poly1305", keyBuf, iv, { authTagLength: 16 }
  );

  // supply AAD plus plaintext length (i.e. decrypted output length = ciphertext length)
  decipher.setAAD(aadBuf, { plaintextLength: ctBuf.length });

  // set the auth tag before finalizing
  decipher.setAuthTag(tagBuf);

  // perform decryption
  return Buffer.concat([
    decipher.update(ctBuf),
    decipher.final(),
  ]);
}

/** SHA-256 */
export function sha256(data: Buffer | string): Buffer {
  return createHash('sha256').update(toBuffer(data)).digest();
}

/** Double SHA-256 */
export function doubleSha256(data: Buffer | string): Buffer {
  return sha256(sha256(data));
}

/** RIPEMD-160 of SHA-256 (“HASH160”) */
export function hash160(data: Buffer | string): Buffer {
  const sha = sha256(data);
  return createHash('ripemd160').update(sha).digest();
}

/** CRC-32 (big-endian 4-byte) */
export function crc32(data: Buffer | string): Buffer {
  const n = crc.crc32(toBuffer(data)) >>> 0;
  return integerToBytes(n, 4);
}

/** XMODEM CRC (big-endian 2-byte) */
export function xmodemCrc(data: Buffer | string): Buffer {
  const n = crc.crc16xmodem(toBuffer(data)) & 0xffff;
  return integerToBytes(n, 2);
}

/**
 * PBKDF2-HMAC-SHA512 key derivation.
 */
export function pbkdf2HmacSha512(
  password: Buffer | string,
  salt: Buffer | string,
  iterations: number,
  keyLen?: number
): Buffer {
  return pbkdf2Sync(toBuffer(password), toBuffer(salt), iterations, keyLen ?? 64, 'sha512');
}

/** Keccak-256 (Ethereum style) */
export function keccak256(data: Buffer | string): Buffer {
  const hex = keccak256Hash(toBuffer(data));
  return Buffer.from(hex, 'hex');
}

/** RIPEMD-160 */
export function ripemd160(data: Buffer | string): Buffer {
  return createHash('ripemd160').update(toBuffer(data)).digest();
}

/**
 * Checksum: first N bytes of double SHA-256, where N = SLIP10_SECP256K1_CONST.CHECKSUM_BYTE_LENGTH.
 */
export function getChecksum(data: Buffer | string): Buffer {
  return doubleSha256(data).slice(0, SLIP10_SECP256K1_CONST.CHECKSUM_BYTE_LENGTH);
}

/** SHA-512 */
export function sha512(data: Buffer | string): Buffer {
  return createHash('sha512').update(toBuffer(data)).digest();
}

/** SHA-512/256 */
export function sha512_256(data: Buffer | string): Buffer {
  return createHash('sha512-256').update(toBuffer(data)).digest();
}

/** SHA3-256 */
export function sha3_256(data: Buffer | string): Buffer {
  return createHash('sha3-256').update(toBuffer(data)).digest();
}
