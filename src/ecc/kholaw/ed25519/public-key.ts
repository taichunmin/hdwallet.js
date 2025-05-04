// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPublicKey, IPoint } from '../../index';
import { SLIP10Ed25519PublicKey } from '../../slip10';
import { KholawEd25519Point } from './point';

type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class KholawEd25519PublicKey extends SLIP10Ed25519PublicKey {

  constructor(publicKey: EdwardsPoint) {
    super(publicKey);
  }

  static getName(): string {
    return 'Kholaw-Ed25519';
  }

  static fromBytes(bytes: Uint8Array): IPublicKey {
    return super.fromBytes(bytes) as KholawEd25519PublicKey;
  }

  point(): IPoint {
    return new KholawEd25519Point(this.publicKey);
  }
}
