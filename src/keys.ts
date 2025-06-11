// SPDX-License-Identifier: MIT

import { checkEncode, checkDecode } from './libs/base58';
import {
  getBytes, bytesToString, integerToBytes, concatBytes, equalBytes
} from './utils';
import { ExtendedKeyError } from './exceptions';

export function serialize(
  version: string | Uint8Array | number,
  depth: number,
  parentFingerprint: string | Uint8Array,
  index: number,
  chainCode: string | Uint8Array,
  key: string | Uint8Array,
  encoded = false
): string | null {
  try {
    // 1. versionBytes: exactly 4 bytes
    const versionBytes: Uint8Array =
      typeof version === 'number'
        ? integerToBytes(version, 4)
        : getBytes(version);

    // 2. depthByte: 1 byte
    if (depth < 0 || depth > 0xff) {
      throw new ExtendedKeyError(`Depth must be 0–255; got ${depth}`);
    }
    const depthByte = integerToBytes(depth, 1);

    // 3. parentFingerprintBytes: exactly 4 bytes
    const parentBytes = getBytes(parentFingerprint);
    if (parentBytes.length !== 4) {
      throw new ExtendedKeyError(
        `Parent fingerprint must be 4 bytes; got ${parentBytes.length}`
      );
    }

    // 4. indexBytes: exactly 4 bytes, big-endian
    if (!Number.isInteger(index) || index < 0 || index > 0xffffffff) {
      throw new ExtendedKeyError(`Index must be 0–2^32-1; got ${index}`);
    }
    const indexBytes = integerToBytes(index, 4);

    // 5. chainCodeBytes: exactly 32 bytes
    const chainBytes = getBytes(chainCode);
    if (chainBytes.length !== 32) {
      throw new ExtendedKeyError(
        `Chain code must be 32 bytes; got ${chainBytes.length}`
      );
    }

    // 6. keyBytes: exactly 33 bytes
    const keyBytes = getBytes(key);
    if (keyBytes.length !== 33) {
      throw new ExtendedKeyError(
        `Key data must be 33 bytes; got ${keyBytes.length}`
      );
    }

    // 7. Concatenate all parts in order
    const raw = concatBytes(
      versionBytes,     // 4 bytes
      depthByte,        // 1 byte
      parentBytes,      // 4 bytes
      indexBytes,       // 4 bytes
      chainBytes,       // 32 bytes
      keyBytes          // 33 bytes
    );

    // 8. Return Base58Check if requested, else hex string
    return encoded ? checkEncode(raw) : bytesToString(raw);
  } catch (err) {
    return null;
  }
}

export function deserialize(
  key: string,
  encoded = true
): [Uint8Array, number, Uint8Array, number, Uint8Array, Uint8Array] {
  // 1. Decode Base58Check if needed, otherwise parse hex
  const rawBytes = encoded ? checkDecode(key) : getBytes(key);

  // 2. Ensure total length is exactly 78 bytes
  if (![78, 110].includes(rawBytes.length)) {
    throw new ExtendedKeyError(
      'Invalid extended key length', { expected: [78, 110], got: rawBytes.length }
    );
  }

  // 3. Parse fields at known offsets
  const version = rawBytes.slice(0, 4);         // 4 bytes
  const depth = rawBytes[4];                    // 1 byte

  const parentFingerprint = rawBytes.slice(5, 9);  // 4 bytes

  // Index: bytes 9..13 → big-endian uint32
  const indexView = new DataView(
    rawBytes.buffer,
    rawBytes.byteOffset + 9,
    4
  );
  const index = indexView.getUint32(0, false);  // false = big-endian

  const chainCode = rawBytes.slice(13, 45);     // 32 bytes
  const keyData = rawBytes.slice(45);

  return [version, depth, parentFingerprint, index, chainCode, keyData];
}

export function isValidKey(key: string, encoded = true): boolean {
  try {
    deserialize(key, encoded);
    return true;
  } catch {
    return false;
  }
}

export function isRootKey(key: string, encoded = true): boolean {
  if (!isValidKey(key, encoded)) {
    throw new ExtendedKeyError('Invalid extended(x) key');
  }

  const [_, depth, parentFingerprint, index] = deserialize(key, encoded);

  // Check that depth === 0, parentFingerprint is all zero bytes, and index === 0
  const zeroFingerprint = new Uint8Array(4); // [0,0,0,0]
  return depth === 0 && equalBytes(parentFingerprint, zeroFingerprint) && index === 0;
}
