// SPDX-License-Identifier: MIT

import { EthereumAddress } from './ethereum';
import { XinFin } from '../cryptocurrencies';
import { Address } from './address';

export class XinFinAddress extends EthereumAddress implements Address {

  static addressPrefix: string = XinFin.PARAMS.ADDRESS_PREFIX;

  static getName(): string {
    return 'XinFin';
  }
}
