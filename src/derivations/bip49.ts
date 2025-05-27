// SPDX-License-Identifier: MIT

import { BIP44Derivation, CHANGES } from './bip44';
import { DerivationType } from '../types';
import { DerivationOptionsInterface } from '../interfaces';
import { Bitcoin } from '../cryptocurrencies';

export class BIP49Derivation extends BIP44Derivation {

  protected purpose: DerivationType = [ 49, true ];

  constructor(options: DerivationOptionsInterface = {
    coinType: Bitcoin.COIN_TYPE, account: 0, change: CHANGES.EXTERNAL_CHAIN, address: 0
  }) {
    super(options);
    this.updateDerivation();
  }

  static getName(): string {
    return 'BIP49';
  }
}
