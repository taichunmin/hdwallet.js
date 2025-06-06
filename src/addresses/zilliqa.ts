// SPDX-License-Identifier: MIT

import { bech32Encode, bech32Decode } from '../libs/bech32';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../ecc';
import { Zilliqa } from '../cryptocurrencies';
import { sha256 } from '../crypto';
import { bytesToString } from '../utils';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';
import { AddressError } from '../exceptions';

export class ZilliqaAddress extends Address {

  static readonly hrp: string = Zilliqa.NETWORKS.MAINNET.HRP;

  static getName(): string {
    return 'Zilliqa';
  }

  static encode(
    publicKey: Uint8Array | string | PublicKey, options: AddressOptionsInterface = {
      hrp: this.hrp
    }
  ): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const hash = sha256(pk.getRawCompressed()).slice(-20);
    const hrp = options.hrp ?? this.hrp;

    const encoded = bech32Encode(hrp, hash);
    if (!encoded) {
      throw new AddressError('Failed to encode Bech32 Zilliqa address');
    }
    return encoded;
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      hrp: this.hrp
    }
  ): string {

    const hrp = options.hrp ?? this.hrp;
    const [gotHrp, data] = bech32Decode(hrp, address);

    if (!gotHrp || !data) {
      throw new AddressError('Failed to decode Bech32 Zilliqa address');
    }

    if (data.length !== 20) {
      throw new AddressError('Invalid address length', {
        expected: 20, got: data.length
      });
    }
    return bytesToString(data);
  }
}
