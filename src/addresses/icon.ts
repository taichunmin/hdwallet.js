// SPDX-License-Identifier: MIT

import { Icon } from '../cryptocurrencies';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { sha3_256 } from '../crypto';
import { getBytes, bytesToString } from '../utils';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';
import { AddressError } from '../exceptions';

export class IconAddress implements Address {

  static addressPrefix: string = Icon.PARAMS.ADDRESS_PREFIX;
  static keyHashLength: number = Icon.PARAMS.KEY_HASH_LENGTH;

  static getName(): string {
    return 'Icon';
  }

  static encode(
    publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = { }
  ): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const raw = pk.getRawUncompressed().slice(1); // Remove prefix byte (0x04)
    const hash = sha3_256(raw).slice(-this.keyHashLength);
    return this.addressPrefix + bytesToString(hash);
  }

  static decode(
    address: string, options: AddressOptionsInterface = { }
  ): string {
    const prefix = this.addressPrefix;
    if (!address.startsWith(prefix)) {
      throw new AddressError('Invalid prefix', {
        expected: prefix, got: address.slice(0, prefix.length)
      });
    }

    const withoutPrefix = address.slice(prefix.length);
    const keyHash = getBytes(withoutPrefix);

    if (keyHash.length !== this.keyHashLength) {
      throw new AddressError('Invalid length', {
        expected: this.keyHashLength, got: keyHash.length
      });
    }
    return bytesToString(keyHash);
  }
}
