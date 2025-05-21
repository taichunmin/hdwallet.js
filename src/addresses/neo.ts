// SPDX-License-Identifier: MIT

import { Neo } from '../cryptocurrencies';
import { checkEncode, checkDecode, ensureString } from '../libs/base58';
import { hash160 } from '../crypto';
import { SLIP10Nist256p1PublicKey, PublicKey, validateAndGetPublicKey } from '../ecc';
import { integerToBytes, bytesToString, concatBytes, toBuffer } from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { AddressError } from '../exceptions';
import { Address } from './address';

export class NeoAddress implements Address {

  static addressPrefix = integerToBytes(Neo.PARAMS.ADDRESS_PREFIX);
  static addressSuffix = integerToBytes(Neo.PARAMS.ADDRESS_SUFFIX);
  static addressVersion = integerToBytes(Neo.PARAMS.ADDRESS_VERSION);
  static alphabet = Neo.PARAMS.ALPHABET;

  static getName(): string {
    return 'Neo';
  }

  static encode(publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = {
    addressVersion: this.addressVersion, alphabet: this.alphabet
  }): string {
    const pk = validateAndGetPublicKey(publicKey, SLIP10Nist256p1PublicKey);
    const payload = concatBytes(
      this.addressPrefix, pk.getRawCompressed(), this.addressSuffix
    );
    const hashed = hash160(payload);
    const version = toBuffer(options.addressVersion ?? this.addressVersion);
    return ensureString(checkEncode(
      toBuffer(concatBytes(version, hashed)), options.alphabet ?? this.alphabet
    ));
  }

  static decode(address: string,options: AddressOptionsInterface = {
    addressVersion: this.addressVersion, alphabet: this.alphabet
  }): string {
    const decoded = checkDecode(address, options.alphabet ?? this.alphabet);
    const version = toBuffer(options.addressVersion ?? this.addressVersion);

    const expectedLength = 20 + version.length;
    if (decoded.length !== expectedLength) {
      throw new AddressError('Invalid length', {
        expected: expectedLength, got: decoded.length
      });
    }

    const versionGot = decoded.subarray(0, version.length);
    if (!version.equals(versionGot)) {
      throw new AddressError('Invalid address version', {
        expected: bytesToString(version), got: bytesToString(versionGot)
      });
    }
    return bytesToString(decoded.subarray(version.length));
  }
}
