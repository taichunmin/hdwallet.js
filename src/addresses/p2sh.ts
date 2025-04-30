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

  static getName(): string {
    return 'P2SH';
  }

  static encode(
    publicKey: Buffer | string | IPublicKey, options: AddressOptionsInterface = {
      publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX,
      publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
      alphabet: Bitcoin.PARAMS.ALPHABET
    }
  ): string {

    if (options.scriptAddressPrefix == null) {
      throw new AddressError('Missing required option: scriptAddressPrefix');
    }
    const prefixValue = options.scriptAddressPrefix;
    const prefixBytes = integerToBytes(prefixValue);

    const pk = validateAndGetPublicKey(
      publicKey, SLIP10Secp256k1PublicKey
    );

    const rawBytes =
      options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
        ? pk.rawUncompressed() : pk.rawCompressed();
    const pubKeyHash = hash160(rawBytes);

    const redeemScriptHex = '76a914' + bytesToString(pubKeyHash) + '88ac';
    const redeemScript = getBytes(redeemScriptHex);
    const scriptHash = hash160(redeemScript);

    const payload = Buffer.concat([prefixBytes, scriptHash]);
    const alphabet = options.alphabet ?? Bitcoin.PARAMS.ALPHABET;
    return ensureString(checkEncode(payload, alphabet));
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX,
      alphabet: Bitcoin.PARAMS.ALPHABET
    }
  ): string {

    if (options.scriptAddressPrefix == null) {
      throw new AddressError('Missing required option: scriptAddressPrefix');
    }
    const prefixValue = options.scriptAddressPrefix;
    const prefixBytes = toBuffer(integerToBytes(prefixValue));

    const alphabet = options.alphabet ?? Bitcoin.PARAMS.ALPHABET;
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
