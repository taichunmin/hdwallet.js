// SPDX-License-Identifier: MIT

import { Tezos } from '../cryptocurrencies';
import { checkEncode, checkDecode, ensureString } from '../libs/base58';
import { SLIP10Ed25519PublicKey, PublicKey, validateAndGetPublicKey } from '../ecc';
import { blake2b160 } from '../crypto';
import { bytesToString, concatBytes, getBytes, toBuffer } from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { AddressError } from '../exceptions';
import { Address } from './address';

export class TezosAddress extends Address {

  static addressPrefix = Tezos.DEFAULT_ADDRESS_PREFIX;
  static addressPrefixes: Record<string, Uint8Array> = {
    tz1: Tezos.PARAMS.ADDRESS_PREFIXES.TZ1,
    tz2: Tezos.PARAMS.ADDRESS_PREFIXES.TZ2,
    tz3: Tezos.PARAMS.ADDRESS_PREFIXES.TZ3
  };

  static getName(): string {
    return 'Tezos';
  }

  static encode(publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = {
    addressPrefix: this.addressPrefix
  }): string {

    const prefixKey = options.addressPrefix ?? this.addressPrefix;
    if (!(prefixKey in this.addressPrefixes)) {
      throw new AddressError('Invalid Tezos address prefix', {
        expected: Object.keys(this.addressPrefixes), got: prefixKey
      });
    }

    const prefix = getBytes(this.addressPrefixes[prefixKey]);
    const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
    const hashed = blake2b160(pk.getRawCompressed().subarray(1));
    return ensureString(checkEncode(toBuffer(concatBytes(prefix, hashed))));
  }

  static decode(address: string,options: AddressOptionsInterface = {
    addressPrefix: this.addressPrefix
  }): string {

    const prefixKey = options.addressPrefix ?? this.addressPrefix;
    if (!(prefixKey in this.addressPrefixes)) {
      throw new AddressError('Invalid Tezos address prefix', {
        expected: Object.keys(this.addressPrefixes), got: prefixKey
      });
    }

    const prefix = getBytes(this.addressPrefixes[prefixKey]);
    const decoded = checkDecode(address);

    const expectedLen = prefix.length + 20;
    if (decoded.length !== expectedLen) {
      throw new AddressError('Invalid length', {
        expected: expectedLen, got: decoded.length
      });
    }

    const prefixGot = decoded.subarray(0, prefix.length);
    if (!prefixGot.equals(prefix)) {
      throw new AddressError('Invalid prefix', {
        expected: bytesToString(prefix), got: bytesToString(prefixGot)
      });
    }
    return bytesToString(decoded.subarray(prefix.length));
  }
}
