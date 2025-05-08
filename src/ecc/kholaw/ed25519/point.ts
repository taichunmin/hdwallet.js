// SPDX-License-Identifier: MIT

import { SLIP10Ed25519Point } from '../../slip10/ed25519';

export class KholawEd25519Point extends SLIP10Ed25519Point {

  getName(): string {
    return 'Kholaw-Ed25519';
  }
}
