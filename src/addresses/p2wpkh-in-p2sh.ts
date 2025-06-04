// SPDX-License-Identifier: MIT

import { ensureString, checkEncode } from '../libs/base58';
import { PUBLIC_KEY_TYPES } from '../const';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { hash160 } from '../crypto';
import { getBytes, integerToBytes, bytesToString, concatBytes } from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
import { P2SHAddress } from './p2sh';

export class P2WPKHInP2SHAddress extends P2SHAddress implements Address {

  static getName(): string {
    return 'P2WPKH-In-P2SH';
  }

  static encode(
    publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = {
      scriptAddressPrefix: this.scriptAddressPrefix,
      publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
      alphabet: this.alphabet
    }
  ): string {

    const prefixValue = options.scriptAddressPrefix ?? this.scriptAddressPrefix;
    const prefixBytes = integerToBytes(prefixValue);

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);

    const rawPubBytes =
      options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
        ? pk.getRawUncompressed() : pk.getRawCompressed();

    const pubKeyHash = hash160(rawPubBytes);
    const redeemScript = getBytes(
        '0014' + bytesToString(pubKeyHash)
    );
    const scriptHash = hash160(redeemScript);

    const alphabet = options.alphabet ?? this.alphabet;
    return ensureString(checkEncode(
      concatBytes(prefixBytes, scriptHash), alphabet
    ));
  }
}
