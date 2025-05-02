// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';
import { ensureString } from '../libs/base58';
import { segwitEncode, segwitDecode } from '../libs/segwit-bech32';
import { PUBLIC_KEY_TYPES } from '../const';
import { IPublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { Bitcoin } from '../cryptocurrencies';
import { hash160 } from '../crypto';
import { AddressError } from '../exceptions';
import { bytesToString } from '../utils';
import { AddressOptionsInterface, IAddress } from './iaddress';

export class P2WPKHAddress implements IAddress {

  static hrp: string = Bitcoin.NETWORKS.MAINNET.HRP;
  static witnessVersion: number = Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WPKH;

  static getName(): string {
    return 'P2WPKH';
  }

  static encode(
    publicKey: Buffer | string | IPublicKey, options: AddressOptionsInterface = {
      hrp: this.hrp,
      publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
      witnessVersion: this.witnessVersion
    }
  ): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);

    const rawPubBytes =
      options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
        ? pk.rawUncompressed() : pk.rawCompressed();

    const pubKeyHash = hash160(rawPubBytes);

    const hrp = options.hrp ?? this.hrp;
    const witnessVersion = options.witnessVersion ?? this.witnessVersion;

    return ensureString(segwitEncode(hrp, witnessVersion, pubKeyHash));
  }

  static decode(
    address: string, options: AddressOptionsInterface = { hrp: this.hrp }
  ): string {

    const hrp = options.hrp ?? this.hrp;

    const [witnessVersion, decoded] = segwitDecode(hrp, address);
    if (!decoded) {
      throw new AddressError('Invalid address decoding');
    }

    return bytesToString(decoded);
  }
}
