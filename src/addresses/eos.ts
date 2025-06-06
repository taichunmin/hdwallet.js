// SPDX-License-Identifier: MIT

import { encode, decode } from '../libs/base58';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { EOS } from '../cryptocurrencies';
import { ripemd160 } from '../crypto';
import {
  bytesToString, getBytes, concatBytes, ensureString, equalBytes, bytesToHex
} from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
import { AddressError } from '../exceptions';

export class EOSAddress extends Address {

  static addressPrefix: string = EOS.PARAMS.ADDRESS_PREFIX;
  static checksumLength: number = EOS.PARAMS.CHECKSUM_LENGTH;

  static getName(): string {
    return 'EOS';
  }

  static computeChecksum(pubKeyBytes: Uint8Array): Uint8Array {
    return ripemd160(pubKeyBytes).slice(0, this.checksumLength);
  }

  static encode(
    publicKey: Uint8Array | string | PublicKey, options: AddressOptionsInterface = {
      addressPrefix: this.addressPrefix
    }
  ): string {
    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const raw = getBytes(pk.getRawCompressed());
    const checksum = this.computeChecksum(raw);
    const prefix = options.addressPrefix ?? this.addressPrefix;
    return prefix + ensureString(encode(concatBytes(raw, checksum)));
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      addressPrefix: this.addressPrefix
    }
  ): string {
    const prefix = options.addressPrefix ?? this.addressPrefix;
    if (!address.startsWith(prefix)) {
      throw new AddressError('Invalid prefix', {
        expected: prefix, got: address.slice(0, prefix.length)
      });
    }

    const withoutPrefix = address.slice(prefix.length);
    const decoded = decode(withoutPrefix);

    const expectedLength = SLIP10Secp256k1PublicKey.getCompressedLength() + this.checksumLength;
    if (decoded.length !== expectedLength) {
      throw new AddressError('Invalid length', {
        expected: expectedLength, got: decoded.length
      });
    }

    const publicKeyBytes = decoded.slice(0, -this.checksumLength);
    const checksum = decoded.slice(-this.checksumLength);
    const computedChecksum = this.computeChecksum(publicKeyBytes);

    if (!equalBytes(checksum, computedChecksum)) {
      throw new AddressError('Invalid checksum', {
        expected: bytesToHex(computedChecksum), got: bytesToHex(checksum)
      });
    }

    if (!SLIP10Secp256k1PublicKey.isValidBytes(publicKeyBytes)) {
      throw new AddressError('Invalid public key bytes', {
        got: bytesToHex(publicKeyBytes)
      });
    }
    return bytesToString(publicKeyBytes);
  }
}
