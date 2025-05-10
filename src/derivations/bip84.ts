// SPDX-License-Identifier: MIT

import { BIP44Derivation } from './bip44';

export class BIP84Derivation extends BIP44Derivation {
  protected _purpose: [number, boolean] = [84, true];

  getName(): string {
    return 'BIP84';
  }
}