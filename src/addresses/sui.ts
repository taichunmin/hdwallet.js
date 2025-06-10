// SPDX-License-Identifier: MIT

import { Sui } from '../cryptocurrencies';
import { blake2b256 } from '../crypto';
import { SLIP10Ed25519PublicKey, PublicKey, validateAndGetPublicKey } from '../eccs';
import { bytesToString, integerToBytes, getBytes } from '../utils';
import { AddressError } from '../exceptions';
import { Address } from './address';

export class SuiAddress extends Address {

  static keyType: Uint8Array = integerToBytes(Sui.PARAMS.KEY_TYPE);
  static addressPrefix: string = Sui.PARAMS.ADDRESS_PREFIX;

  static getName(): string {
    return 'Sui';
  }

  static encode(publicKey: Uint8Array | string | PublicKey): string {
    const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
    const raw = pk.getRawCompressed().subarray(1);
    const hash = blake2b256(getBytes(new Uint8Array([...this.keyType, ...raw])));
    return this.addressPrefix + bytesToString(hash);
  }

  static decode(address: string): string {
    const prefix = address.slice(0, this.addressPrefix.length);
    if (prefix !== this.addressPrefix) {
      throw new AddressError('Invalid address prefix', {
        expected: this.addressPrefix, got: prefix
      });
    }

    const body = address.slice(this.addressPrefix.length);
    if (body.length !== 64) {
      throw new AddressError('Invalid address length', {
        expected: 64, got: body.length
      });
    }
    return body;
  }
}
