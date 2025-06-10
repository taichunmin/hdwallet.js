// SPDX-License-Identifier: MIT

import { EthereumAddress } from './ethereum';
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { PublicKey, SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Injective } from '../cryptocurrencies';
import { bytesToString, getBytes } from '../utils';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';
import { AddressError } from '../exceptions';

export class InjectiveAddress extends Address {

  static readonly hrp: string = Injective.NETWORKS.MAINNET.HRP;

  static getName(): string {
    return 'Injective';
  }

  static encode(
    publicKey: Uint8Array | string | PublicKey, options: AddressOptionsInterface = {
      hrp: this.hrp
    }
  ): string {

    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const ethEncoded = EthereumAddress.encode(pk, {
      skipChecksumEncode: true
    });
    const rawBytes = getBytes(ethEncoded.slice(2)); // remove "0x"

    const hrp = options.hrp ?? this.hrp;
    const encoded = bech32Encode(hrp, rawBytes);
    if (!encoded) {
      throw new AddressError('Failed to encode Bech32 Injective address');
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
      throw new AddressError('Failed to decode Bech32 Injective address');
    }

    if (data.length !== 20) {
      throw new AddressError('Invalid length', {
        expected: 20, got: data.length
      });
    }
    return bytesToString(data);
  }
}
