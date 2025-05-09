// SPDX-License-Identifier: MIT

import { P2PKHAddress } from './p2pkh';
import { Ripple } from '../cryptocurrencies';
import { Address } from './address';

export class RippleAddress extends P2PKHAddress implements Address {

  static alphabet: string = Ripple.PARAMS.ALPHABET;

  static getName(): string {
    return 'Ripple';
  }
}
