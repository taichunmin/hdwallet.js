// SPDX-License-Identifier: MIT

import { IAddress } from './iaddress';
import { P2PKHAddress } from './p2pkh';
import { P2SHAddress } from './p2sh';
import { P2TRAddress } from './p2tr';
import { P2WPKHAddress } from './p2wpkh';
import { P2WPKHInP2SHAddress } from './p2wpkh-in-p2sh';
import { P2WSHAddress } from './p2wsh';
import { P2WSHInP2SHAddress } from './p2wsh-in-p2sh';
import { EthereumAddress } from './ethereum';
import { CosmosAddress } from './cosmos';
import { XinFinAddress } from './xinfin';
import { TronAddress } from './tron';
import { AddressError } from '../exceptions';
import { RippleAddress } from './ripple';
import { FilecoinAddress } from './filecoin';
import { AvalancheAddress } from './avalanche';
import { EOSAddress } from './eos';
import { ErgoAddress } from './ergo';

export class ADDRESSES {

  private static readonly dictionary: Record<string, typeof IAddress> = {
    [P2PKHAddress.getName()]: P2PKHAddress,
    [P2SHAddress.getName()]: P2SHAddress,
    [P2TRAddress.getName()]: P2TRAddress,
    [P2WPKHAddress.getName()]: P2WPKHAddress,
    [P2WPKHInP2SHAddress.getName()]: P2WPKHInP2SHAddress,
    [P2WSHAddress.getName()]: P2WSHAddress,
    [P2WSHInP2SHAddress.getName()]: P2WSHInP2SHAddress,
    [EthereumAddress.getName()]: EthereumAddress,
    [CosmosAddress.getName()]: CosmosAddress,
    [XinFinAddress.getName()]: XinFinAddress,
    [TronAddress.getName()]: TronAddress,
    [RippleAddress.getName()]: RippleAddress,
    [FilecoinAddress.getName()]: FilecoinAddress,
    [AvalancheAddress.getName()]: AvalancheAddress,
    [EOSAddress.getName()]: EOSAddress,
    [ErgoAddress.getName()]: ErgoAddress,
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
  P2SHAddress,
  P2TRAddress,
  P2WPKHAddress,
  P2WPKHInP2SHAddress,
  P2WSHAddress,
  P2WSHInP2SHAddress,
  EthereumAddress,
  CosmosAddress,
  XinFinAddress,
  TronAddress,
  RippleAddress,
  FilecoinAddress,
  AvalancheAddress,
  EOSAddress,
  ErgoAddress
};
