// SPDX-License-Identifier: MIT

import { MultiversX } from '../cryptocurrencies';
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { SLIP10Ed25519PublicKey, PublicKey, validateAndGetPublicKey } from '../ecc';
import { bytesToString, toBuffer } from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { AddressError } from '../exceptions';
import { Address } from './address';

export class MultiversXAddress implements Address {

  static hrp: string = MultiversX.NETWORKS.MAINNET.HRP;

  static getName(): string {
    return 'MultiversX';
  }

  static encode(publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = {
    hrp: this.hrp
  }): string {
    const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
    const raw = pk.getRawCompressed().subarray(1);
    return bech32Encode(options.hrp ?? this.hrp, toBuffer(raw));
  }

  static decode(address: string, options: AddressOptionsInterface = {
    hrp: this.hrp
  }): string {
    const [hrpGot, data] = bech32Decode(options.hrp ?? this.hrp, address);
    if (!data) {
      throw new AddressError('Invalid Bech32 decoding result');
    }
    return bytesToString(data);
  }
}
