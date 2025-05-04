// SPDX-License-Identifier: MIT

import { IPoint } from '../../index';
import { SLIP10Ed25519PublicKey } from '../../slip10';
import { KholawEd25519Point } from './point';

export class KholawEd25519PublicKey extends SLIP10Ed25519PublicKey {

  getName(): string {
    return 'Kholaw-Ed25519';
  }

  point(): IPoint {
    return new KholawEd25519Point(this.publicKey);
  }
}
