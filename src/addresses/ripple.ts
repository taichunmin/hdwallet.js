// SPDX-License-Identifier: MIT

import { P2PKHAddress } from './p2pkh';
import { Ripple } from '../cryptocurrencies';
import { IAddress } from './iaddress';

export class RippleAddress extends P2PKHAddress implements IAddress {

  static alphabet: string = Ripple.PARAMS.ALPHABET;

  static getName(): string {
    return 'Ripple';
  }
}
