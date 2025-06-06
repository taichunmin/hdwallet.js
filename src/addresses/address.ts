// SPDX-License-Identifier: MIT

import { PublicKey } from '../ecc';
import { AddressOptionsInterface } from '../interfaces';

export abstract class Address {

  static getName(): string {
    throw new Error('Address.getName() not implemented');
  }

  static encode(
    publicKey: Uint8Array | string | PublicKey | Object, options?: AddressOptionsInterface
  ): string {
    throw new Error('Address.encode() not implemented');
  }

  public static decode(
    address: string, options?: AddressOptionsInterface
  ): string | [string, string] {
    throw new Error('Address.decode() not implemented');
  }
}
