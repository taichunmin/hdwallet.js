// SPDX-License-Identifier: MIT

import { IAddress } from './iaddress';
import { P2PKHAddress } from './p2pkh';
import { P2SHAddress } from './p2sh';
import { AddressError } from '../exceptions';

export class ADDRESSES {

  private static readonly dictionary: Record<string, typeof IAddress> = {
    [P2PKHAddress.getName()]: P2PKHAddress,
    [P2SHAddress.getName()]: P2SHAddress,
  };

  public static getNames(): string[] {
    return Object.keys(this.dictionary);
  }

  public static getClasses(): Array<typeof IAddress> {
    return Object.values(this.dictionary);
  }

  public static address(name: string): typeof IAddress {
    if (!this.isAddress(name)) {
      throw new AddressError(
        'Invalid address name', { expected: this.getNames(), got: name }
      );
    }
    return this.dictionary[name];
  }

  public static isAddress(name: string): boolean {
    return name in this.dictionary;
  }
}

export {
  IAddress,
  P2PKHAddress,
  P2SHAddress
};
