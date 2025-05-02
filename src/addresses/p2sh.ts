// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';
import { checkDecode, checkEncode, ensureString } from '../libs/base58';
import { PUBLIC_KEY_TYPES } from '../const';
import { IPublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { Bitcoin } from '../cryptocurrencies';
import { hash160 } from '../crypto';
import { AddressError } from '../exceptions';
import { bytesToString, getBytes, integerToBytes, toBuffer } from '../utils';
import { AddressOptionsInterface, IAddress } from './iaddress';

export class P2SHAddress implements IAddress {

  static scriptAddressPrefix: number = Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX;
  static alphabet: string = Bitcoin.PARAMS.ALPHABET;

  static getName(): string {
    return 'P2SH';
  }

  static encode(
    publicKey: Buffer | string | IPublicKey, options: AddressOptionsInterface = {
      scriptAddressPrefix: this.scriptAddressPrefix,
      publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
      alphabet: this.alphabet
    }
  ): string {

    const prefixValue = options.scriptAddressPrefix ?? this.scriptAddressPrefix;
    const prefixBytes = integerToBytes(prefixValue);

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);

    const rawBytes =
      options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
        ? pk.rawUncompressed() : pk.rawCompressed();
    const pubKeyHash = hash160(rawBytes);

    const redeemScriptHex = '76a914' + bytesToString(pubKeyHash) + '88ac';
    const redeemScript = getBytes(redeemScriptHex);
    const scriptHash = hash160(redeemScript);

    const payload = Buffer.concat([prefixBytes, scriptHash]);
    const alphabet = options.alphabet ?? this.alphabet;
    return ensureString(checkEncode(payload, alphabet));
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      scriptAddressPrefix: this.scriptAddressPrefix,
      alphabet: this.alphabet
    }
  ): string {

    const prefixValue = options.scriptAddressPrefix ?? this.scriptAddressPrefix;
    const prefixBytes = toBuffer(integerToBytes(prefixValue));

    const alphabet = options.alphabet ?? this.alphabet;
    const decoded = checkDecode(address, alphabet);

    const expectedLen = prefixBytes.length + 20;
    if (decoded.length !== expectedLen) {
      throw new AddressError(
        'Invalid length', { expected: expectedLen, got: decoded.length}
      );
    }

    const gotPrefix = decoded.slice(0, prefixBytes.length);
    if (!prefixBytes.equals(gotPrefix)) {
      throw new AddressError(
        'Invalid prefix', { expected: prefixBytes.toString('hex'), got: gotPrefix.toString('hex') }
      );
    }

    const scriptHash = decoded.slice(prefixBytes.length);
    return bytesToString(scriptHash);
  }
}
