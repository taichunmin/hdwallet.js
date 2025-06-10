// SPDX-License-Identifier: MIT

import { Nano } from '../cryptocurrencies';
import { AddressError } from '../exceptions';
import { decode as base32Decode, encodeNoPadding } from '../libs/base32';
import { blake2b40 } from '../crypto';
import { SLIP10Ed25519Blake2bPublicKey, PublicKey, validateAndGetPublicKey } from '../eccs';
import { bytesToString, bytesReverse, getBytes, concatBytes, equalBytes } from '../utils';
import { Address } from './address';

export class NanoAddress extends Address {

  static addressPrefix: string = Nano.PARAMS.ADDRESS_PREFIX;
  static alphabet: string = Nano.PARAMS.ALPHABET;
  static payloadPaddingDecoded: Uint8Array = getBytes(Nano.PARAMS.PAYLOAD_PADDING_DECODED);
  static payloadPaddingEncoded: string = Nano.PARAMS.PAYLOAD_PADDING_ENCODED;

  static getName(): string {
    return 'Nano';
  }

  static computeChecksum(publicKey: Uint8Array): Uint8Array {
    return bytesReverse(blake2b40(publicKey));
  }

  static encode(publicKey: Uint8Array | string | PublicKey): string {
    const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519Blake2bPublicKey);
    const raw = pk.getRawCompressed().subarray(1);
    const checksum = this.computeChecksum(getBytes(raw));
    const payload = concatBytes(this.payloadPaddingDecoded, raw, checksum);

    const b32 = encodeNoPadding(bytesToString(payload), this.alphabet);
    return this.addressPrefix + b32.slice(this.payloadPaddingEncoded.length);
  }

  static decode(address: string): string {
    const prefix = address.slice(0, this.addressPrefix.length);
    if (prefix !== this.addressPrefix) {
      throw new AddressError('Invalid prefix', { expected: this.addressPrefix, got: prefix });
    }

    const body = address.slice(this.addressPrefix.length);
    const fullEncoded = this.payloadPaddingEncoded + body;
    const decoded = getBytes(base32Decode(fullEncoded, this.alphabet));

    const expectedLen = this.payloadPaddingDecoded.length + SLIP10Ed25519Blake2bPublicKey.getCompressedLength() - 1 + 5;
    if (decoded.length !== expectedLen) {
      throw new AddressError('Invalid decoded length', { expected: expectedLen, got: decoded.length });
    }

    const data = decoded.subarray(this.payloadPaddingDecoded.length);
    const pubkey = data.subarray(0, data.length - 5);
    const checksum = data.subarray(-5);
    const gotChecksum = this.computeChecksum(pubkey);

    if (!equalBytes(checksum, gotChecksum)) {
      throw new AddressError('Invalid checksum', {
        expected: bytesToString(checksum), got: bytesToString(gotChecksum)
      });
    }

    if (!SLIP10Ed25519Blake2bPublicKey.isValidBytes(pubkey)) {
      throw new AddressError('Invalid public key');
    }
    return bytesToString(pubkey);
  }
}
