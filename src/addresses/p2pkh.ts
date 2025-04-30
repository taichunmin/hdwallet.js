// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';
import { checkDecode, checkEncode, ensureString } from '../libs/base58';
import { PUBLIC_KEY_TYPES } from '../const';
import { IPublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { Bitcoin } from '../cryptocurrencies';
import { hash160 } from '../crypto';
import { AddressError } from '../exceptions';
import { bytesToString, integerToBytes, toBuffer } from '../utils';
import { AddressOptionsInterface, IAddress } from './iaddress';


export class P2PKHAddress implements IAddress {

  static getName(): string {
    return 'P2PKH';
  }

  static encode(
    publicKey: Buffer | string | IPublicKey, options: AddressOptionsInterface = {
      publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX,
      publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
      alphabet: Bitcoin.PARAMS.ALPHABET
    }
  ): string {

    if (options.publicKeyAddressPrefix == null) {
      throw new AddressError('Missing required option: publicKeyAddressPrefix');
    }
    const prefixValue = options.publicKeyAddressPrefix;
    const prefixBytes = integerToBytes(prefixValue);

    const pk = validateAndGetPublicKey(
      publicKey, SLIP10Secp256k1PublicKey
    );

    const rawPubBytes =
      options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
        ? pk.rawUncompressed() : pk.rawCompressed();

    const pubKeyHash = hash160(toBuffer(rawPubBytes));
    const payload = Buffer.concat([prefixBytes, pubKeyHash]);
    const alphabet = options.alphabet ?? Bitcoin.PARAMS.ALPHABET;
    return ensureString(checkEncode(payload, alphabet));
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX,
      alphabet: Bitcoin.PARAMS.ALPHABET
    }
  ): string {

    if (options.publicKeyAddressPrefix == null) {
      throw new AddressError('Missing required option: publicKeyAddressPrefix');
    }
    const prefixValue = options.publicKeyAddressPrefix;
    const prefixBytes = toBuffer(integerToBytes(prefixValue));

    const alphabet = options.alphabet ?? Bitcoin.PARAMS.ALPHABET;
    const decoded = checkDecode(address, alphabet);

    const expectedLen = prefixBytes.length + 20;
    if (decoded.length !== expectedLen) {
      throw new AddressError(
        'Invalid length', { expected: expectedLen, got: decoded.length }
      );
    }

    const gotPrefix = decoded.slice(0, prefixBytes.length);
    if (!prefixBytes.equals(gotPrefix)) {
      throw new AddressError(
        'Invalid prefix', { expected: prefixBytes.toString('hex'), got: gotPrefix.toString('hex') }
      );
    }

    const pubKeyHash = decoded.slice(prefixBytes.length);
    return bytesToString(pubKeyHash);
  }
}
