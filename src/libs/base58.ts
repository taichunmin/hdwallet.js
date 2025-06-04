// SPDX-License-Identifier: MIT

import { sha256, keccak256 } from '../crypto';
import { bytesToString } from '../utils';

const DEFAULT_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

/**
 * EIP-55 / XDC address checksum encoding.
 */
export function checksumEncode(
  address: string,
  crypto: "eth" | "xdc" = "eth"
): string {
  const prefix = crypto === "eth" ? "0x" : "xdc";
  let addr = address.toLowerCase().replace(/^0x|^xdc/, "");
  const hash = bytesToString(keccak256(addr));
  let out = "";
  for (let i = 0; i < addr.length; i++) {
    const c = addr[i];
    out += parseInt(hash[i], 16) >= 8
      ? c.toUpperCase()
      : c;
  }
  return prefix + out;
}

/**
 * Convert a Buffer or string into a BigInt.
 */
function stringToInt(data: Buffer | string): bigint {
  const buf = typeof data === "string"
    ? Buffer.from(data, "utf8")
    : data;
  let val = BigInt(0);
  for (let i = 0; i < buf.length; i++) {
    // shift left by 8 bits each iteration
    val = (val << BigInt(8)) + BigInt(buf[i]);
  }
  return val;
}

/**
 * Ensure the input is a UTF-8 string.
 */
export function ensureString(data: Buffer | string): string {
  if (Buffer.isBuffer(data)) {
    return data.toString("utf8");
  }
  if (typeof data === "string") {
    return data;
  }
  throw new TypeError("Invalid value for string");
}

/**
 * Base58 encode (no checksum).
 */
export function encode(
  data: Buffer | string,
  alphabet = DEFAULT_ALPHABET
): string {
  const buf = typeof data === "string"
    ? Buffer.from(data, "utf8")
    : data;

  let val = stringToInt(buf);
  const base = BigInt(alphabet.length);
  let enc = "";

  while (val >= base) {
    const mod = Number(val % base);
    enc = alphabet[mod] + enc;
    val = val / base;
  }

  if (val > BigInt(0)) {
    enc = alphabet[Number(val)] + enc;
  }

  // preserve leading zeros
  let leading = 0;
  for (const b of buf) {
    if (b === 0) leading++;
    else break;
  }
  return alphabet[0].repeat(leading) + enc;
}

/**
 * Base58Check encode.
 */
export function checkEncode(
  raw: Buffer | string,
  alphabet = DEFAULT_ALPHABET
): string {
  const buf = typeof raw === "string"
    ? Buffer.from(raw, "utf8")
    : raw;
  const hash1 = sha256(buf);
  const hash2 = sha256(hash1);
  const chk   = hash2.slice(0, 4);
  return encode(Buffer.concat([buf, chk]), alphabet);
}

/**
 * Decode a Base58 (no-checksum) string into a Buffer.
 */
export function decode(
  input: string,
  alphabet = DEFAULT_ALPHABET
): Buffer {
  const bytes = Buffer.from(input, "ascii");
  let val = BigInt(0);
  let prefixZeros = 0;

  for (const b of bytes) {
    const char = String.fromCharCode(b);
    const idx = alphabet.indexOf(char);
    if (idx < 0) {
      throw new Error(`Invalid Base58 character '${char}'`);
    }
    val = val * BigInt(alphabet.length) + BigInt(idx);
    // count leading zeros: when val stays zero
    if (val === BigInt(0)) {
      prefixZeros++;
    }
  }

  const outBytes: number[] = [];
  while (val > BigInt(0)) {
    const mod = Number(val % BigInt(256));
    outBytes.push(mod);
    val = val / BigInt(256);
  }

  for (let i = 0; i < prefixZeros; i++) {
    outBytes.push(0);
  }

  return Buffer.from(outBytes.reverse());
}

/**
 * Decode a Base58Check string, verify its 4-byte checksum, and return the raw payload.
 */
export function checkDecode(
  enc: string,
  alphabet = DEFAULT_ALPHABET
): Buffer {
  const full = decode(enc, alphabet);
  if (full.length < 5) {
    throw new Error("Input too short for Base58Check");
  }

  const raw = full.slice(0, -4);
  const chk = full.slice(-4);

  const hash1 = sha256(raw);
  const hash2 = sha256(hash1);

  const expected = hash2.slice(0, 4);
  if (!chk.equals(expected)) {
    throw new Error("Base58Check checksum failed");
  }

  return raw;
}

/**
 * Left-pad a Base58 string to a given length.
 */
export function pad(
  enc: string,
  padLen: number,
  alphabet = DEFAULT_ALPHABET
): string {
  return enc.padStart(padLen, alphabet[0]);
}

/**
 * Monero-style Base58 encoding.
 */
export function encodeMonero(data: Buffer): string {
  const blockEncLen = 11;
  const blockDecLen = 8;
  const sizes = [0, 2, 3, 5, 6, 7, 9, 10, 11];
  const buf = data;
  const fullBlocks = Math.floor(buf.length / blockDecLen);
  const lastLen = buf.length % blockDecLen;
  let out = "";

  for (let i = 0; i < fullBlocks; i++) {
    const block = buf.slice(i * blockDecLen, (i + 1) * blockDecLen);
    out += pad(encode(block), blockEncLen);
  }
  if (lastLen > 0) {
    const block = buf.slice(fullBlocks * blockDecLen);
    out += pad(encode(block), sizes[lastLen]);
  }
  return out;
}

/**
 * Remove left padding from a decoded Monero block.
 */
function unpad(dec: Buffer, unpadLen: number): Buffer {
  return dec.slice(dec.length - unpadLen);
}

/**
 * Monero-style Base58 decoding.
 */
export function decodeMonero(data: string): Buffer {
  const blockEncLen = 11;
  const blockDecLen = 8;
  const sizes = [0, 2, 3, 5, 6, 7, 9, 10, 11];

  const fullBlocks = Math.floor(data.length / blockEncLen);
  const lastEncLen = data.length % blockEncLen;
  const lastDecLen = sizes.indexOf(lastEncLen);

  const out: number[] = [];

  for (let i = 0; i < fullBlocks; i++) {
    const chunk = data.slice(i * blockEncLen, (i + 1) * blockEncLen);
    const dec   = decode(chunk);
    out.push(...unpad(dec, blockDecLen));
  }
  if (lastEncLen > 0) {
    const chunk = data.slice(fullBlocks * blockEncLen);
    const dec   = decode(chunk);
    out.push(...unpad(dec, lastDecLen));
  }
  return Buffer.from(out);
}
