// SPDX-License-Identifier: MIT

import { BIP44Derivation } from './bip44';

export class BIP49Derivation extends BIP44Derivation {
  protected _purpose: [number, boolean] = [49, true];

  getName(): string {
    return 'BIP49';
  }
}