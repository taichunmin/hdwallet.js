// SPDX-License-Identifier: MIT

import { EthereumAddress } from './ethereum';
import { XinFin } from '../cryptocurrencies';
import { IAddress } from './iaddress';

export class XinFinAddress extends EthereumAddress implements IAddress {

  static addressPrefix: string = XinFin.PARAMS.ADDRESS_PREFIX;

  static getName(): string {
    return 'XinFin';
  }
}
