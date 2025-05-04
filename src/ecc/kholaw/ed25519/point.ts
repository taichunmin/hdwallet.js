// SPDX-License-Identifier: MIT

import { SLIP10Ed25519Point } from '../../slip10';

export class KholawEd25519Point extends SLIP10Ed25519Point {

  static getName(): string {
    return 'Kholaw-Ed25519';
  }
}
