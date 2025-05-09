// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';

import { ensureString } from '../libs/base58';
import { segwitEncode } from '../libs/segwit-bech32';
import { PUBLIC_KEY_TYPES } from '../const';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { Bitcoin } from '../cryptocurrencies';
import { sha256 } from '../crypto';
import { bytesToString, getBytes } from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
import { P2WPKHAddress } from './p2wpkh';

export class P2WSHAddress extends P2WPKHAddress implements Address {

  static witnessVersion: number = Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WSH;

  static getName(): string {
    return 'P2WSH';
  }

  static encode(
    publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = {
      hrp: this.hrp,
      publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
      witnessVersion: this.witnessVersion
    }
  ): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);

    const rawPubBytes =
      options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
        ? pk.getRawUncompressed() : pk.getRawCompressed();

    const script = '5121' + bytesToString(rawPubBytes) + '51ae';
    const scriptHash = sha256(getBytes(script));

    const hrp = options.hrp ?? this.hrp;
    const version = options.witnessVersion ?? this.witnessVersion;
    return ensureString(segwitEncode(
      hrp, version, scriptHash
    ));
  }
}
