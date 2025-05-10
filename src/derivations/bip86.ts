// SPDX-License-Identifier: MIT

import { BIP44Derivation } from './bip44';

export class BIP86Derivation extends BIP44Derivation {
  protected _purpose: [number, boolean] = [86, true];

  getName(): string {
    return 'BIP86';
  }
}