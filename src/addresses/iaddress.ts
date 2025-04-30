// SPDX-License-Identifier: MIT

import { IPublicKey } from '../ecc';
import { PUBLIC_KEY_TYPES } from '../const';

export interface AddressOptionsInterface {
  publicKeyAddressPrefix?: number;
  scriptAddressPrefix?: number;
  publicKeyType?: PUBLIC_KEY_TYPES;
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
