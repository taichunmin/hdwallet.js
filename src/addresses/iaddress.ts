// SPDX-License-Identifier: MIT

import { IPublicKey } from '../ecc';

export interface AddressOptionsInterface {
  hrp?: string,
  publicKeyAddressPrefix?: number;
  scriptAddressPrefix?: number;
  publicKeyType?: "uncompressed" | "compressed";
  witnessVersion?: number;
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
