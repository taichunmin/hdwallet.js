// SPDX-License-Identifier: MIT

import { Point } from '../../../point';
import { SLIP10Ed25519PublicKey } from '../public-key';
import { SLIP10Ed25519Blake2bPoint } from './point';

export class SLIP10Ed25519Blake2bPublicKey extends SLIP10Ed25519PublicKey {

  getName(): string {
    return 'SLIP10-Ed25519-Blake2b';
  }

  getPoint(): Point {
    return new SLIP10Ed25519Blake2bPoint(this.publicKey);
  }
}