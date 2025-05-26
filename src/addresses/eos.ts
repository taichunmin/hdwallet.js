// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';
import { ensureString, encode, decode } from '../libs/base58';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { EOS } from '../cryptocurrencies';
import { ripemd160 } from '../crypto';
import { bytesToString, toBuffer } from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
import { AddressError } from '../exceptions';

export class EOSAddress extends Address {

  static addressPrefix: string = EOS.PARAMS.ADDRESS_PREFIX;
  static checksumLength: number = EOS.PARAMS.CHECKSUM_LENGTH;

  static getName(): string {
    return 'EOS';
  }

  static computeChecksum(pubKeyBytes: Buffer): Buffer {
    return ripemd160(pubKeyBytes).slice(0, this.checksumLength);
  }

  static encode(
    publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = {
      addressPrefix: this.addressPrefix
    }
  ): string {
    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const raw = toBuffer(pk.getRawCompressed());
    const checksum = this.computeChecksum(raw);
    const prefix = options.addressPrefix ?? this.addressPrefix;
    return prefix + ensureString(encode(Buffer.concat([raw, checksum])));
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

    if (!checksum.equals(computedChecksum)) {
      throw new AddressError('Invalid checksum', {
        expected: computedChecksum.toString('hex'), got: checksum.toString('hex')
      });
    }

    if (!SLIP10Secp256k1PublicKey.isValidBytes(publicKeyBytes)) {
      throw new AddressError('Invalid public key bytes', {
        got: publicKeyBytes.toString('hex')
      });
    }
    return bytesToString(publicKeyBytes);
  }
}
