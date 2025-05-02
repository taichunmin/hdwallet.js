// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';
import { bech32Encode, bech32Decode } from '../libs/bech32';
import {
  IPublicKey,
  SLIP10Secp256k1PublicKey,
  validateAndGetPublicKey
} from '../ecc';
import { Cosmos } from '../cryptocurrencies';
import { sha256, ripemd160 } from '../crypto';
import { bytesToString } from '../utils';
import { AddressOptionsInterface, IAddress } from './iaddress';
import { AddressError } from '../exceptions';

export class CosmosAddress implements IAddress {

  static readonly hrp: string = Cosmos.NETWORKS.MAINNET.HRP;

  static getName(): string {
    return 'Cosmos';
  }

  static encode(
    publicKey: Buffer | string | IPublicKey, options: AddressOptionsInterface = { hrp: this.hrp }
  ): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const hash = ripemd160(sha256(pk.rawCompressed()));
    const hrp = options.hrp ?? this.hrp;

    const encoded = bech32Encode(hrp, hash);
    if (encoded === null) {
      throw new AddressError('Failed to encode Bech32 address');
    }
    return encoded;
  }

  static decode(
    address: string, options: AddressOptionsInterface = { hrp: this.hrp }
  ): string {

    const hrp = options.hrp ?? this.hrp;
    const [gotHrp, decoded] = bech32Decode(hrp, address);

    if (typeof gotHrp !== 'string' || gotHrp !== hrp) {
      throw new AddressError('Invalid HRP prefix or decode failure', {
        expected: hrp,
        got: gotHrp
      });
    }
    return bytesToString(decoded);
  }
}
