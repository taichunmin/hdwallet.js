// SPDX-License-Identifier: MIT

import { segwitEncode, segwitDecode } from '../libs/segwit-bech32';
import { PUBLIC_KEY_TYPES } from '../const';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { Bitcoin } from '../cryptocurrencies';
import { hash160 } from '../crypto';
import { bytesToString, ensureString } from '../utils';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';
import { AddressError } from '../exceptions';

export class P2WPKHAddress extends Address {

  static hrp: string = Bitcoin.NETWORKS.MAINNET.HRP;
  static witnessVersion: number = Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WPKH;

  static getName(): string {
    return 'P2WPKH';
  }

  static encode(
    publicKey: Uint8Array | string | PublicKey, options: AddressOptionsInterface = {
      hrp: this.hrp,
      publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
      witnessVersion: this.witnessVersion
    }
  ): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);

    const rawPubBytes =
      options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
        ? pk.getRawUncompressed() : pk.getRawCompressed();

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
