// SPDX-License-Identifier: MIT

import { Algorand } from '../cryptocurrencies';
import { encodeNoPadding, decode as base32Decode } from '../libs/base32';
import { sha512_256 } from '../crypto';
import { SLIP10Ed25519PublicKey, PublicKey, validateAndGetPublicKey } from '../eccs';
import { bytesToString, concatBytes, getBytes, equalBytes } from '../utils';
import { AddressError } from '../exceptions';
import { Address } from './address';

export class AlgorandAddress extends Address {

  static checksumLength: number = Algorand.PARAMS.CHECKSUM_LENGTH;

  static getName(): string {
    return 'Algorand';
  }

  static computeChecksum(publicKey: Uint8Array): Uint8Array {
    return sha512_256(publicKey).subarray(-4);
  }

  static encode(publicKey: Uint8Array | string | PublicKey): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
    const raw = pk.getRawCompressed().subarray(1);
    const checksum = this.computeChecksum(raw);
    return encodeNoPadding(bytesToString(concatBytes(raw, checksum)));
  }

  static decode(address: string): string {

    const decoded = getBytes(base32Decode(address));
    const expectedLength = SLIP10Ed25519PublicKey.getCompressedLength() - 1 + this.checksumLength;

    if (decoded.length !== expectedLength) {
      throw new AddressError('Invalid decoded length', {
        expected: expectedLength, got: decoded.length
      });
    }

    const pubkey = decoded.subarray(0, decoded.length - this.checksumLength);
    const checksum = decoded.subarray(-this.checksumLength);
    const gotChecksum = this.computeChecksum(pubkey);

    if (!equalBytes(checksum, gotChecksum)) {
      throw new AddressError('Invalid checksum', {
        expected: bytesToString(checksum), got: bytesToString(gotChecksum)
      });
    }

    if (!SLIP10Ed25519PublicKey.isValidBytes(pubkey)) {
      throw new AddressError('Invalid public key');
    }
    return bytesToString(pubkey);
  }
}
