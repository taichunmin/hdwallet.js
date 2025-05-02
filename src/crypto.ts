// SPDX-License-Identifier: MIT

import { createCipheriv, createDecipheriv, createHash, createHmac, pbkdf2Sync } from 'crypto';
import crc from 'crc';
import { keccak256 as keccak256Hash } from 'js-sha3';
import { SLIP10_SECP256K1_CONST } from './const';
import { toBuffer } from './utils';

function integerToBytes(num: number, bytes: number): Buffer {
  const buf = Buffer.alloc(bytes);
  for (let i = bytes - 1; i >= 0; i--) {
    buf[i] = num & 0xff;
    num >>>= 8;
  }
  return buf;
}

export function hmacSha256(key: Buffer | Uint8Array | string, data: Buffer | Uint8Array | string): Buffer {
  return createHmac('sha256', toBuffer(key))
    .update(toBuffer(data))
    .digest();
}

export function hmacSha512(key: Buffer | Uint8Array | string, data: Buffer | Uint8Array | string): Buffer {
  return createHmac('sha512', toBuffer(key))
    .update(toBuffer(data))
    .digest();
}

export function blake2bSync(
  data: Buffer | Uint8Array | string,
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

export function blake2b(
  data: Buffer | Uint8Array | string,
  digestSize: number,
  key: Buffer | Uint8Array | string = Buffer.alloc(0),
  salt: Buffer | Uint8Array | string = Buffer.alloc(0)
): Buffer {
  const dataBuf = toBuffer(data);
  const keyBuf = toBuffer(key);
  const saltBuf = toBuffer(salt);
  return blake2bSync(dataBuf, digestSize, keyBuf, saltBuf);
}

export function blake2b32(data: Buffer | Uint8Array | string, key?: Buffer | Uint8Array | string, salt?: Buffer | Uint8Array | string): Buffer {
  return blake2b(data, 4, key, salt);
}

export function blake2b40(data: Buffer | Uint8Array | string, key?: Buffer | Uint8Array | string, salt?: Buffer | Uint8Array | string): Buffer {
  return blake2b(data, 5, key, salt);
}

export function blake2b160(data: Buffer | Uint8Array | string, key?: Buffer | Uint8Array | string, salt?: Buffer | Uint8Array | string): Buffer {
  return blake2b(data, 20, key, salt);
}

export function blake2b224(data: Buffer | Uint8Array | string, key?: Buffer | Uint8Array | string, salt?: Buffer | Uint8Array | string): Buffer {
  return blake2b(data, 28, key, salt);
}

export function blake2b256(data: Buffer | Uint8Array | string, key?: Buffer | Uint8Array | string, salt?: Buffer | Uint8Array | string): Buffer {
  return blake2b(data, 32, key, salt);
}

export function blake2b512(data: Buffer | Uint8Array | string, key?: Buffer | Uint8Array | string, salt?: Buffer | Uint8Array | string): Buffer {
  return blake2b(data, 64, key, salt);
}

export function chacha20Poly1305Encrypt(
  key: Buffer | Uint8Array | string,
  nonce: Buffer | Uint8Array | string,
  aad: Buffer | Uint8Array | string,
  plaintext: Buffer | Uint8Array | string
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

export function chacha20Poly1305Decrypt(
  key: Buffer | Uint8Array | string,
  nonce: Buffer | Uint8Array | string,
  aad: Buffer | Uint8Array | string,
  ciphertext: Buffer | Uint8Array | string,
  tag: Buffer | Uint8Array | string
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

export function sha256(data: Buffer | Uint8Array | string): Buffer {
  return createHash('sha256').update(toBuffer(data)).digest();
}

export function doubleSha256(data: Buffer | Uint8Array | string): Buffer {
  return sha256(sha256(data));
}

export function hash160(data: Buffer | Uint8Array | string): Buffer {
  const sha = sha256(data);
  return createHash('ripemd160').update(sha).digest();
}

export function crc32(data: Buffer | Uint8Array | string): Buffer {
  const n = crc.crc32(toBuffer(data)) >>> 0;
  return integerToBytes(n, 4);
}

export function xmodemCrc(data: Buffer | Uint8Array | string): Buffer {
  const n = crc.crc16xmodem(toBuffer(data)) & 0xffff;
  return integerToBytes(n, 2);
}

export function pbkdf2HmacSha512(
  password: Buffer | Uint8Array | string,
  salt: Buffer | Uint8Array | string,
  iterations: number,
  keyLen?: number
): Buffer {
  return pbkdf2Sync(toBuffer(password), toBuffer(salt), iterations, keyLen ?? 64, 'sha512');
}

export function keccak256(data: Buffer | Uint8Array | string): Buffer {
  const hex = keccak256Hash(toBuffer(data));
  return Buffer.from(hex, 'hex');
}

export function ripemd160(data: Buffer | Uint8Array | string): Buffer {
  return createHash('ripemd160').update(toBuffer(data)).digest();
}

export function getChecksum(data: Buffer | Uint8Array | string): Buffer {
  return doubleSha256(data).slice(0, SLIP10_SECP256K1_CONST.CHECKSUM_BYTE_LENGTH);
}

export function sha512(data: Buffer | Uint8Array | string): Buffer {
  return createHash('sha512').update(toBuffer(data)).digest();
}

export function sha512_256(data: Buffer | Uint8Array | string): Buffer {
  return createHash('sha512-256').update(toBuffer(data)).digest();
}

export function sha3_256(data: Buffer | Uint8Array | string): Buffer {
  return createHash('sha3-256').update(toBuffer(data)).digest();
}
