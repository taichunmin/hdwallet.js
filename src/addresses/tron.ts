// SPDX-License-Identifier: MIT

import { checkEncode, checkDecode } from '../libs/base58';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Tron } from '../cryptocurrencies';
import { keccak256 } from '../crypto';
import {
  integerToBytes, bytesToString, ensureString, concatBytes, hexToBytes, getBytes, equalBytes, bytesToHex
} from '../utils';
import { Address } from './address';
import { AddressError } from '../exceptions';
import { AddressOptionsInterface } from '../interfaces';

export class TronAddress extends Address {

  static publicKeyAddressPrefix: number = Tron.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX;
  static alphabet: string = Tron.PARAMS.ALPHABET;

  static getName(): string {
    return 'Tron';
  }

  static encode(
    publicKey: Uint8Array | string | PublicKey, options: AddressOptionsInterface = {
      publicKeyAddressPrefix: this.publicKeyAddressPrefix,
      alphabet: this.alphabet
    }
  ): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const addressHash = bytesToString(keccak256(pk.getRawUncompressed().slice(1))).slice(-40); // last 20 bytes
    const prefixBytes = integerToBytes(
        options.publicKeyAddressPrefix ?? this.publicKeyAddressPrefix
    );
    const alphabet = options.alphabet ?? this.alphabet;
    const payload = concatBytes(prefixBytes, hexToBytes(addressHash));
    return ensureString(checkEncode(
      payload, alphabet
    ));
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      publicKeyAddressPrefix: this.publicKeyAddressPrefix,
      alphabet: this.alphabet
    }
  ): string {

    const alphabet = options.alphabet ?? this.alphabet;
    const decoded = checkDecode(address, alphabet);
    const prefixValue = integerToBytes(
        options.publicKeyAddressPrefix ?? this.publicKeyAddressPrefix
    );
    const prefixBytes = getBytes(prefixValue);

    const expectedLength = 20 + prefixBytes.length;
    if (decoded.length !== expectedLength) {
      throw new AddressError('Invalid length', {
        expected: expectedLength, got: decoded.length
      });
    }

    const prefixGot = decoded.slice(0, prefixBytes.length);
    if (!equalBytes(prefixGot, prefixBytes)) {
      throw new AddressError('Invalid prefix', {
        expected: bytesToHex(prefixBytes), got: bytesToHex(prefixGot)
      });
    }
    return bytesToString(decoded.slice(
      prefixBytes.length
    ));
  }
}
