// SPDX-License-Identifier: MIT

import { IPoint } from '../../ipoint';
import { SLIP10Ed25519PublicKey } from '../../slip10/ed25519';
import { KholawEd25519Point } from './point';

export class KholawEd25519PublicKey extends SLIP10Ed25519PublicKey {

  getName(): string {
    return 'Kholaw-Ed25519';
  }

  getPoint(): IPoint {
    return new KholawEd25519Point(this.publicKey);
  }
}
