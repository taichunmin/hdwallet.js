// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { Ethereum } from '../cryptocurrencies';
import { keccak256 } from '../crypto';
import { bytesToString } from '../utils';
import { AddressError } from '../exceptions';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';

export class EthereumAddress extends Address {

  static addressPrefix: string = Ethereum.PARAMS.ADDRESS_PREFIX;

  static getName(): string {
    return 'Ethereum';
  }

  static checksumEncode(address: string): string {

    let output = '';
    const addressHash = bytesToString(keccak256(
        Buffer.from(address.toLowerCase(), 'utf8')
    ));

    for (let i = 0; i < address.length; i++) {
      output += parseInt(addressHash[i], 16) >= 8
        ? address[i].toUpperCase()
        : address[i];
    }
    return output;
  }

  static encode(
    publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = {
      skipChecksumEncode: false
    }
  ): string {
    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const pubKeyHash = bytesToString(keccak256(pk.getRawUncompressed().slice(1))).slice(-40);

    return this.addressPrefix + (
      options.skipChecksumEncode ? pubKeyHash : this.checksumEncode(pubKeyHash)
    );
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      skipChecksumEncode: false
    }
  ): string {
    const prefix = address.slice(0, this.addressPrefix.length);
    if (prefix !== this.addressPrefix) {
      throw new AddressError('Invalid address prefix', {
        expected: this.addressPrefix,
        got: prefix
      });
    }

    const addressPart = address.slice(this.addressPrefix.length);

    if (addressPart.length !== 40) {
      throw new AddressError('Invalid length', {
        expected: 40,
        got: addressPart.length
      });
    }

    if (!options.skipChecksumEncode && addressPart !== this.checksumEncode(addressPart)) {
      throw new AddressError('Invalid checksum encode', {
        expected: this.checksumEncode(addressPart),
        got: addressPart
      });
    }
    return addressPart.toLowerCase();
  }
}
