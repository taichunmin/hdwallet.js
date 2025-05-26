// SPDX-License-Identifier: MIT

import { PublicKey } from '../ecc';
import { AddressOptionsInterface } from '../interfaces';

export class Address {

  static getName(): string {
    throw new Error('IAddress.getName() not implemented');
  }

  static encode(
    publicKey: Buffer | string | PublicKey | Object, options?: AddressOptionsInterface
  ): string {
    throw new Error('IAddress.encode() not implemented');
  }

  public static decode(
    address: string, options?: AddressOptionsInterface
  ): string | [string, string] {
    throw new Error('IAddress.decode() not implemented');
  }
}
