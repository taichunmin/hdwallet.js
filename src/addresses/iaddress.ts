// SPDX-License-Identifier: MIT

import { IPublicKey } from '../ecc';
import { INetwork } from '../cryptocurrencies/icryptocurrency';

export interface AddressOptionsInterface {
  hrp?: string,
  addressPrefix?: string;
  addressType?: string;
  networkType?: string | INetwork;
  publicKeyAddressPrefix?: number;
  scriptAddressPrefix?: number;
  publicKeyType?: "uncompressed" | "compressed";
  witnessVersion?: number;
  skipChecksumEncode?: boolean;
  alphabet?: string;
}

export abstract class IAddress {

  static getName(): string {
    throw new Error('IAddress.getName() not implemented');
  }

  static encode(
    publicKey: Buffer | string | IPublicKey, options?: AddressOptionsInterface
  ): string {
    throw new Error('IAddress.encode() not implemented');
  }

  public static decode(
    address: string, options?: AddressOptionsInterface
  ): string {
    throw new Error('IAddress.decode() not implemented');
  }
}
