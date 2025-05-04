import crypto from "crypto";
import { Buffer } from "buffer";

export class DerivationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DerivationError";
  }
}

/**
 * Normalize any Buffer / Uint8Array / string into a Node.js Buffer.
 * - If input is already a Buffer, returns it.
 * - If input is a Uint8Array, turns it into a Buffer.
 * - If input is a hex string (even-length, 0-9 A-F, optional 0x prefix), decodes as hex.
 * - Otherwise encodes the string as UTF-8.
 */
export function toBuffer(data: Buffer | Uint8Array | string): Buffer {
  if (Buffer.isBuffer(data)) {
    return data;
  }

  if (data instanceof Uint8Array) {
    // Buffer.from(Uint8Array) works, but ensure slicing views correctly:
    return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  }

  if (typeof data === "string") {
    // strip 0x/0X prefix if present
    const str = data.startsWith("0x") || data.startsWith("0X")
      ? data.slice(2)
      : data;

    // hex-only check (even length, hex digits)
    if (/^[0-9a-fA-F]+$/.test(str) && str.length % 2 === 0) {
      return Buffer.from(str, "hex");
    }

    // fallback to UTF-8
    return Buffer.from(data, "utf8");
  }

  throw new TypeError(
    `toBuffer: unsupported data type (${typeof data}), expected Buffer, Uint8Array or string`
  );
}

/**
 * Convert a hex string to a Uint8Array of bytes.
 * @param hex - Hex string (may include 0x prefix)
 * @returns Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  const normalized = hex.startsWith('0x') ? hex.slice(2) : hex;
  if (normalized.length % 2 !== 0) {
    throw new Error(`Invalid hex string length: ${normalized.length}`);
  }
  const bytes = new Uint8Array(normalized.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(normalized.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * Convert a Uint8Array of bytes to a hex string.
 * @param bytes - The byte array
 * @param prefix - Include '0x' prefix (default: false)
 * @returns Hex string
 */
export function bytesToHex(bytes: Uint8Array, prefix = false): string {
  const hex = Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return prefix ? `0x${hex}` : hex;
}

/**
 * Convert a Uint8Array or string to a hex string.
 * - If input is a non-empty string of even length containing only hex digits, returns it (lowercased).
 * - Otherwise treats the string as UTF-8 and returns its hex encoding.
 * - Empty or null/undefined inputs yield ''.
 */
export function bytesToString(
  data: Uint8Array | string | null | undefined
): string {
  if (
    data == null ||
    (typeof data === "string" && data.length === 0) ||
    (data instanceof Uint8Array && data.length === 0)
  ) {
    return "";
  }

  if (typeof data === "string") {
    // pure hex? even length & only 0–9, A–F
    if (data.length % 2 === 0 && /^[0-9A-Fa-f]+$/.test(data)) {
      return data.toLowerCase();
    }
    // otherwise treat as UTF-8
    return Buffer.from(data, "utf-8").toString("hex");
  }

  // Uint8Array case
  return bytesToHex(data);
}

/**
 * Normalize input into a Uint8Array.
 * - If data is a hex string (with or without "0x"), it’s decoded.
 * - If data is a raw string and unhexlify=true, we hex-decode;
 *   otherwise we UTF-8 encode.
 */
export function getBytes(
  data: Uint8Array | string,
  unhexlify: boolean = true
): Uint8Array {
  if (!data) {
    return new Uint8Array();
  }
  if (data instanceof Uint8Array) {
    return data;
  }
  // string case
  let str = data;
  if (unhexlify) {
    if (str.startsWith("0x") || str.startsWith("0X")) {
      str = str.slice(2);
    }
    if (str.length % 2 === 1) {
      str = "0" + str;
    }
    return new Uint8Array(Buffer.from(str, "hex"));
  } else {
    return new TextEncoder().encode(str);
  }
}

/**
 * Convert a Uint8Array to a bigint, interpreting as big-endian by default.
 * @param bytes - The byte array.
 * @param littleEndian - If true, treat input as little-endian; otherwise big-endian.
 */
export function bytesToInteger(
  bytes: Uint8Array,
  littleEndian = false
): bigint {
  // if little-endian, reverse into a new array
  const data = littleEndian
    ? bytes.slice().reverse()
    : bytes;
  return data.reduce(
    (acc, b) => (acc << BigInt(8)) + BigInt(b),
    BigInt(0)
  );
}

/**
 * Convert a bigint or number to a Uint8Array.
 * @param value      The integer value to encode
 * @param length     Desired byte length (optional; pads)
 * @param endianness "big" (default) or "little"
 */
export function integerToBytes(
  value: bigint | number,
  length?: number,
  endianness: "big" | "little" = "big"
): Uint8Array {
  // coerce to BigInt without using 0n
  let val = typeof value === "number" ? BigInt(value) : value;
  if (val < BigInt(0)) {
    throw new Error(`Cannot convert negative integers: ${val}`);
  }

  // build big-endian array
  const bytes: number[] = [];
  const ZERO = BigInt(0);
  const SHIFT = BigInt(8);
  const MASK = BigInt(0xff);

  while (val > ZERO) {
    // val & 0xffn  →  val & MASK
    bytes.unshift(Number(val & MASK));
    // val >>= 8n   →  val = val >> SHIFT
    val = val >> SHIFT;
  }

  if (bytes.length === 0) {
    bytes.push(0);
  }

  // pad/truncate
  if (length !== undefined) {
    if (bytes.length > length) {
      throw new Error(`Integer too large to fit in ${length} bytes`);
    }
    while (bytes.length < length) {
      bytes.unshift(0);
    }
  }

  const result = new Uint8Array(bytes);
  return endianness === "little" ? result.reverse() : result;
}

/**
 * Convert a byte array to its binary string, optionally zero-padding.
 */
export function bytesToBinaryString(
  data: Uint8Array,
  zeroPadBits: number = 0
): string {
  const bits = Array.from(data)
    .map((b) => b.toString(2).padStart(8, "0"))
    .join("");
  return bits.length < zeroPadBits ? bits.padStart(zeroPadBits, "0") : bits;
}

/**
 * Convert a binary string (or byte array) into a bigint.
 */
export function binaryStringToInteger(
  data: Uint8Array | string
): bigint {
  const bin =
    typeof data === "string"
      ? data
      : bytesToBinaryString(data);
  const clean = bin.trim();
  return BigInt("0b" + clean);
}

/**
 * Convert a (possibly large) integer into its binary string, optionally zero-padded.
 */
export function integerToBinaryString(
  data: number | bigint,
  zeroPadBits: number = 0
): string {
  const big = typeof data === "bigint" ? data : BigInt(data);
  const bits = big.toString(2);
  return bits.length < zeroPadBits
    ? bits.padStart(zeroPadBits, "0")
    : bits;
}

/**
 * Convert a binary string (or byte array) back into a Uint8Array.
 */
export function binaryStringToBytes(
  data: Uint8Array | string,
  zeroPadByteLen: number = 0
): Uint8Array {
  const bits =
    typeof data === "string"
      ? data.trim()
      : bytesToBinaryString(data);
  const bitLen = bits.length;
  const val = BigInt("0b" + bits);
  let hex = val.toString(16);
  if (hex.length % 2 === 1) {
    hex = "0" + hex;
  }
  const byteLen =
    zeroPadByteLen > 0
      ? zeroPadByteLen
      : Math.ceil(bitLen / 8);
  const expectedHexLen = byteLen * 2;
  if (hex.length < expectedHexLen) {
    hex = hex.padStart(expectedHexLen, "0");
  }
  return new Uint8Array(Buffer.from(hex, "hex"));
}

/**
 * Returns true if every input (all of the same type) is equal:
 *  - strings, numbers or booleans compared with `===`
 *  - Buffer/Uint8Array/ArrayBuffer/TypedArray/DataView by length + byte-by-byte
 * If any two inputs differ in type, returns false.
 */
export function isAllEqual(
  ...inputs: (Uint8Array | Buffer | ArrayBuffer | ArrayBufferView | string | number | boolean)[]
): boolean {
  if (inputs.length < 2) return true;

  // classify into a simple type tag
  const getTag = (v: unknown): string => {
    if (typeof v === 'string')   return 'string';
    if (typeof v === 'number')   return 'number';
    if (typeof v === 'boolean')  return 'boolean';
    if (v instanceof Uint8Array) return 'uint8array';
    if (Buffer.isBuffer(v))      return 'buffer';
    if (v instanceof ArrayBuffer) return 'arraybuffer';
    if (ArrayBuffer.isView(v))   return 'view';
    return 'unknown';
  };

  const firstTag = getTag(inputs[0]);
  if (firstTag === 'unknown') return false;

  // all must share the same tag
  for (const v of inputs.slice(1)) {
    if (getTag(v) !== firstTag) return false;
  }

  // primitive equality
  if (firstTag === 'string' || firstTag === 'number' || firstTag === 'boolean') {
    const first = inputs[0] as string | number | boolean;
    return inputs.every(v => v === first);
  }

  // byte-array equality
  const normalize = (v: any): Uint8Array => {
    if (v instanceof Uint8Array) return v;
    if (Buffer.isBuffer(v))      return Uint8Array.from(v);
    if (v instanceof ArrayBuffer) return new Uint8Array(v);
    // any TypedArray or DataView
    const view = v as ArrayBufferView;
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  };

  const firstArr = normalize(inputs[0]);
  const len = firstArr.byteLength;

  return inputs.slice(1).every(item => {
    const arr = normalize(item);
    if (arr.byteLength !== len) return false;
    for (let i = 0; i < len; i++) {
      if (arr[i] !== firstArr[i]) return false;
    }
    return true;
  });
}

/**
 * Generate a random passphrase of ASCII letters and digits.
 */
export function generatePassphrase(length = 32): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

/**
 * Return the HMAC seed for the specified elliptic curve algorithm.
 */
export function getHMAC(eccName: string): Buffer {
  if ([
    "Kholaw-Ed25519",
    "SLIP10-Ed25519",
    "SLIP10-Ed25519-Blake2b",
    "SLIP10-Ed25519-Monero",
  ].includes(eccName)) {
    return Buffer.from("ed25519 seed", "utf-8");
  } else if (eccName === "SLIP10-Nist256p1") {
    return Buffer.from("Nist256p1 seed", "utf-8");
  } else if (eccName === "SLIP10-Secp256k1") {
    return Buffer.from("Bitcoin seed", "utf-8");
  }
  throw new DerivationError(`Unknown ECC name "${eccName}"`);
}

/**
 * Recursively exclude keys (after replacing "-"→"_") from a nested object.
 */
export function excludeKeys(
  nested: Record<string, any>,
  keys: Set<string>
): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(nested)) {
    const normKey = k.replace(/-/g, "_");
    if (v && typeof v === "object" && !Buffer.isBuffer(v)) {
      out[k] = excludeKeys(v, keys);
    } else if (!keys.has(normKey)) {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Convert a BIP-32 path string to an array of indexes.
 */
export function pathToIndexes(path: string): number[] {
  if (path === "m" || path === "m/") return [];
  if (!path.startsWith("m/")) {
    throw new DerivationError(
      `Bad path format, expected "m/0'/0", got "${path}"`
    );
  }
  return path
    .slice(2)
    .split("/")
    .map(i =>
      i.endsWith("'")
        ? parseInt(i.slice(0, -1), 10) + 0x80000000
        : parseInt(i, 10)
    );
}

/**
 * Convert an array of indexes to a BIP-32 path string.
 */
export function indexesToPath(indexes: number[]): string {
  return (
    "m" +
    indexes
      .map(i =>
        i & 0x80000000
          ? `/${(i & ~0x80000000).toString()}'`
          : `/${i.toString()}`
      )
      .join("")
  );
}

export type IndexTuple = [number, boolean] | [number, number, boolean];

/**
 * Normalize an index input.
 */
export function normalizeIndex(
  index: number | string | [number, number],
  hardened = false
): IndexTuple {
  if (typeof index === "number") {
    if (index < 0) throw new DerivationError(`Bad index: ${index}`);
    return [index, hardened];
  }
  if (typeof index === "string") {
    const m = index.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) {
      throw new DerivationError(
        `Bad index format, got "${index}"`
      );
    }
    const from = parseInt(m[1], 10);
    const to = m[2] ? parseInt(m[2], 10) : undefined;
    if (to === undefined) return [from, hardened];
    if (from > to) {
      throw new DerivationError(
        `Range start ${from} > end ${to}`
      );
    }
    return [from, to, hardened];
  }
  if (Array.isArray(index)) {
    const [a, b] = index;
    if (index.length !== 2 || typeof a !== "number" || typeof b !== "number") {
      throw new DerivationError(`Bad index tuple: ${JSON.stringify(index)}`);
    }
    if (a < 0 || b < 0) {
      throw new DerivationError(`Negative in tuple: ${index}`);
    }
    if (a > b) {
      throw new DerivationError(`Range start ${a} > end ${b}`);
    }
    return [a, b, hardened];
  }
  throw new DerivationError(
    `Invalid index instance, got ${typeof index}`
  );
}

/**
 * Normalize either a path or an index array.
 */
export function normalizeDerivation(
  path?: string,
  indexes?: number[]
): [string, number[], IndexTuple[]] {
  let _path = "m";
  const _indexes: number[] = [];
  const _deriv: IndexTuple[] = [];

  if (indexes && path) {
    throw new DerivationError("Provide either path or indexes, not both");
  }
  if (indexes) {
    path = indexesToPath(indexes);
  }
  if (!path || path === "m" || path === "m/") {
    return [`${_path}/`, _indexes, _deriv];
  }
  if (!path.startsWith("m/")) {
    throw new DerivationError(
      `Bad path format, got "${path}"`
    );
  }

  for (const seg of path.slice(2).split("/")) {
    const hardened = seg.endsWith("'");
    const core = hardened ? seg.slice(0, -1) : seg;
    const parts = core.split("-").map(x => parseInt(x, 10));
    if (parts.length === 2) {
      const [from, to] = parts;
      if (from > to) {
        throw new DerivationError(`Range start ${from} > end ${to}`);
      }
      _deriv.push([from, to, hardened]);
      _indexes.push(to + (hardened ? 0x80000000 : 0));
      _path += hardened ? `/${to}'` : `/${to}`;
    } else {
      const idx = parts[0];
      _deriv.push([idx, hardened]);
      _indexes.push(idx + (hardened ? 0x80000000 : 0));
      _path += hardened ? `/${idx}'` : `/${idx}`;
    }
  }

  return [_path, _indexes, _deriv];
}

/**
 * Convert an IndexTuple back to a single integer.
 */
export function indexTupleToInteger(idx: IndexTuple): number {
  if (idx.length === 2) {
    const [i, h] = idx;
    return i + (h ? 0x80000000 : 0);
  } else {
    const [from, to, h] = idx;
    return to + (h ? 0x80000000 : 0);
  }
}

/**
 * Convert an IndexTuple to its string form.
 */
export function indexTupleToString(idx: IndexTuple): string {
  if (idx.length === 2) {
    const [i, h] = idx;
    return `${i}${h ? "'" : ""}`;
  } else {
    const [from, to, h] = idx;
    return `${from}-${to}${h ? "'" : ""}`;
  }
}

/**
 * Parse a single "n" or "n'" string to [number, hardened].
 */
export function indexStringToTuple(i: string): [number, boolean] {
  const hardened = i.endsWith("'");
  const num = parseInt(hardened ? i.slice(0, -1) : i, 10);
  return [num, hardened];
}

/**
 * Byte-wise XOR of two buffers.
 */
export function xor(a: Buffer, b: Buffer): Buffer {
  if (a.length !== b.length)
    throw new DerivationError("Buffers must match length for XOR");
  return Buffer.from(a.map((x, i) => x ^ b[i]));
}

/**
 * Byte-wise addition without carry.
 */
export function addNoCarry(a: Buffer, b: Buffer): Buffer {
  if (a.length !== b.length)
    throw new DerivationError("Buffers must match length for addNoCarry");
  return Buffer.from(a.map((x, i) => (x + b[i]) & 0xff));
}

/**
 * Multiply each byte by scalar without carry.
 */
export function multiplyScalarNoCarry(
  data: Buffer,
  scalar: number
): Buffer {
  return Buffer.from(data.map(x => (x * scalar) & 0xff));
}

/**
 * Check/set/reset bits.
 */
export function isBitsSet(value: number, bitNum: number): boolean {
  return (value & (1 << bitNum)) !== 0;
}
export function areBitsSet(value: number, mask: number): boolean {
  return (value & mask) !== 0;
}
export function setBit(value: number, bitNum: number): number {
  return value | (1 << bitNum);
}
export function setBits(value: number, mask: number): number {
  return value | mask;
}
export function resetBit(value: number, bitNum: number): number {
  return value & ~(1 << bitNum);
}
export function resetBits(value: number, mask: number): number {
  return value & ~mask;
}

/**
 * Reverse a Buffer’s bytes.
 */
export function bytesReverse(data: Buffer): Buffer {
  return Buffer.from(data).reverse();
}

/**
 * Convert data between bit-widths.
 */
export function convertBits(
  data: number[] | Buffer,
  fromBits: number,
  toBits: number
): number[] | null {
  const input = Array.isArray(data) ? data : Array.from(data);
  const maxVal = (1 << toBits) - 1;
  let acc = 0;
  let bits = 0;
  const out: number[] = [];

  for (const val of input) {
    if (val < 0 || val >> fromBits) {
      return null;
    }
    acc |= val << bits;
    bits += fromBits;
    while (bits >= toBits) {
      out.push(acc & maxVal);
      acc >>= toBits;
      bits -= toBits;
    }
  }

  if (bits > 0) {
    out.push(acc & maxVal);
  }

  return out;
}

/**
 * Map a 4-byte chunk into three words.
 */
export function bytesChunkToWords(
  bytesChunk: Buffer,
  wordsList: string[],
  endianness: "little" | "big"
): [string, string, string] {
  const len = BigInt(wordsList.length);
  let chunkNum = bytesToInteger(new Uint8Array(bytesChunk), endianness !== "big");
  const i1 = Number(chunkNum % len);
  const i2 = Number(((chunkNum / len) + BigInt(i1)) % len);
  const i3 = Number(((chunkNum / len / len) + BigInt(i2)) % len);
  return [wordsList[i1], wordsList[i2], wordsList[i3]];
}

/**
 * Inverse: three words → 4-byte Buffer.
 */
export function wordsToBytesChunk(
  w1: string,
  w2: string,
  w3: string,
  wordsList: string[],
  endianness: "little" | "big"
): Buffer {
  const len = BigInt(wordsList.length);
  const idxMap = new Map(wordsList.map((w, i) => [w, BigInt(i)]));
  const i1 = idxMap.get(w1)!;
  const i2 = idxMap.get(w2)!;
  const i3 = idxMap.get(w3)!;
  const chunk = i1 + len * ((i2 - i1 + len) % len) + len * len * ((i3 - i2 + len) % len);
  const u8 = integerToBytes(chunk, 4, endianness);
  return Buffer.from(u8);
}
