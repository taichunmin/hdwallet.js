// SPDX-License-Identifier: MIT

import { Point } from '../../point';
import { SLIP10Ed25519PublicKey } from '../../slip10';
import { KholawEd25519Point } from './point';

export class KholawEd25519PublicKey extends SLIP10Ed25519PublicKey {

  getName(): string {
    return 'Kholaw-Ed25519';
  }

  getPoint(): Point {
    return new KholawEd25519Point(this.publicKey);
  }
}
