// SPDX-License-Identifier: MIT

import { EthereumAddress } from './ethereum';
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { PublicKey } from '../ecc';
import { OKTChain } from '../cryptocurrencies';
import { bytesToString, getBytes } from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
import { AddressError } from '../exceptions';

export class OKTChainAddress extends Address {

  static hrp: string = OKTChain.NETWORKS.MAINNET.HRP;

  static getName(): string {
    return 'OKT-Chain';
  }

  static encode(
    publicKey: Uint8Array | string | PublicKey, options: AddressOptionsInterface = {
      hrp: this.hrp
    }
  ): string {

    const baseEth = EthereumAddress.encode(publicKey, {
      skipChecksumEncode: true
    });
    const ethHexWithoutPrefix = baseEth.slice(2); // strip "0x"
    const bytes = getBytes(ethHexWithoutPrefix);
    const hrp = options.hrp ?? this.hrp;

    const encoded = bech32Encode(hrp, bytes);
    if (!encoded) {
      throw new AddressError('Failed to encode OKTChain Bech32 address');
    }
    return encoded;
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      hrp: this.hrp
    }
  ): string {
    const hrp = options.hrp ?? this.hrp;
    const [decodedHrp, data] = bech32Decode(hrp, address);

    if (!decodedHrp || !data) {
      throw new AddressError('Failed to decode OKTChain Bech32 address');
    }

    const ethHex = EthereumAddress.addressPrefix + bytesToString(data);
    return EthereumAddress.decode(ethHex, {
      skipChecksumEncode: true
    });
  }
}
