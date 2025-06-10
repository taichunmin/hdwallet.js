// SPDX-License-Identifier: MIT

import { Bitcoin } from './cryptocurrencies';
import { encode as base58Encode, decode as base58Decode } from './libs/base58';
import { getBytes, integerToBytes, bytesToString, concatBytes, equalBytes } from './utils';
import { SLIP10_SECP256K1_CONST, WIF_TYPES } from './consts';
import { getChecksum } from './crypto';
import { WIFError, ECCError } from './exceptions';

export function encodeWIF(
  privateKey: string | Uint8Array, wifPrefix: number = Bitcoin.NETWORKS.MAINNET.WIF_PREFIX
): [string, string] {

  const keyBytes = getBytes(privateKey);
  if (keyBytes.length !== 32) {
    throw new ECCError('Invalid private key length', { expected: 32, got: keyBytes.length });
  }

  const prefix = integerToBytes(wifPrefix, 1);
  const compressedSuffix = integerToBytes(
    SLIP10_SECP256K1_CONST.PRIVATE_KEY_COMPRESSED_PREFIX, 1
  );

  const uncompressedPayload = concatBytes(prefix, keyBytes);
  const compressedPayload = concatBytes(prefix, keyBytes, compressedSuffix);

  return [
    base58Encode(concatBytes(uncompressedPayload, getChecksum(uncompressedPayload))),
    base58Encode(concatBytes(compressedPayload, getChecksum(compressedPayload)))
  ];
}

export function decodeWIF(
  wif: string, wifPrefix: number = Bitcoin.NETWORKS.MAINNET.WIF_PREFIX
): [Uint8Array, string, Uint8Array] {

  const raw = base58Decode(wif);
  const prefix = integerToBytes(wifPrefix, 1);
  if (!equalBytes(raw.subarray(0, prefix.length), prefix)) {
    throw new WIFError('Invalid Wallet Import Format (WIF) prefix');
  }

  const rawWithoutPrefix = raw.subarray(prefix.length);
  const checksum = rawWithoutPrefix.subarray(-4);
  let privateKey = rawWithoutPrefix.subarray(0, -4);
  let wifType = 'wif';

  if (privateKey.length === 33) {
    const compressedPrefix = integerToBytes(
      SLIP10_SECP256K1_CONST.PRIVATE_KEY_COMPRESSED_PREFIX, 1
    );
    if (equalBytes(privateKey.subarray(-1), compressedPrefix)) {
      privateKey = privateKey.subarray(0, -1);
      wifType = 'wif-compressed';
    }
  } else if (privateKey.length !== 32) {
    throw new WIFError('Invalid WIF length');
  }

  return [privateKey, wifType, checksum];
}

export function privateKeyToWIF(
  privateKey: string | Uint8Array,
  wifType: string = 'wif-compressed',
  wifPrefix: number = Bitcoin.NETWORKS.MAINNET.WIF_PREFIX
): string {

  if (!WIF_TYPES.getTypes().includes(wifType)) {
    throw new WIFError('Wrong WIF type', {
      expected: WIF_TYPES.getTypes(), got: wifType
    });
  }
  const [wif, wifCompressed] = encodeWIF(privateKey, wifPrefix);
  return wifType === 'wif' ? wif : wifCompressed;
}

export function wifToPrivateKey(
  wif: string, wifPrefix: number = Bitcoin.NETWORKS.MAINNET.WIF_PREFIX
): string {
  return bytesToString(decodeWIF(wif, wifPrefix)[0]);
}

export function getWIFType(
  wif: string, wifPrefix: number = Bitcoin.NETWORKS.MAINNET.WIF_PREFIX
): string {
  return decodeWIF(wif, wifPrefix)[1];
}

export function getWIFChecksum(
  wif: string, wifPrefix: number = Bitcoin.NETWORKS.MAINNET.WIF_PREFIX
): string {
  return bytesToString(decodeWIF(wif, wifPrefix)[2]);
}
