// SPDX-License-Identifier: MIT

import { checkEncode, checkDecode } from './libs/base58';
import { getBytes, bytesToString, integerToBytes, toBuffer, concatBytes } from './utils';
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
    const versionBytes =
      typeof version === 'number' ? integerToBytes(version, 4) : getBytes(version);

    const raw = concatBytes(
      versionBytes,
      Buffer.from([depth & 0xff]),
      getBytes(parentFingerprint),
      Buffer.from([(index >>> 24) & 0xff, (index >>> 16) & 0xff, (index >>> 8) & 0xff, index & 0xff]),
      getBytes(chainCode),
      getBytes(key)
    );

    return encoded ? checkEncode(raw) : bytesToString(raw);
  } catch (err) {
    return null;
  }
}

export function deserialize(
  key: string,
  encoded = true
): [Buffer, number, Buffer, number, Buffer, Buffer] {
  const decodedKey = toBuffer(encoded ? checkDecode(key) : getBytes(key));

  const version = decodedKey.slice(0, 4);
  const depth = decodedKey[4];
  const parentFingerprint = decodedKey.slice(5, 9);
  const index = decodedKey.readUInt32BE(9);
  const chainCode = decodedKey.slice(13, 45);
  const keyData = decodedKey.slice(45);

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

  return (
    depth === 0 &&
    parentFingerprint.equals(Buffer.alloc(4)) &&
    index === 0
  );
}
