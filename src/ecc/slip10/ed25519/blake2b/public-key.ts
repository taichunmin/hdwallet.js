// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPublicKey, IPoint } from '../../../index';
import { SLIP10Ed25519PublicKey } from '../public-key';
import { SLIP10Ed25519Blake2bPoint } from './point';

type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class SLIP10Ed25519Blake2bPublicKey extends SLIP10Ed25519PublicKey {

  constructor(publicKey: EdwardsPoint) {
    super(publicKey);
  }

  static getName(): string {
    return 'SLIP10-Ed25519-Blake2b';
  }

  static fromBytes(bytes: Uint8Array): IPublicKey {
    return super.fromBytes(bytes) as SLIP10Ed25519Blake2bPublicKey;
  }

  static fromPoint(point: IPoint): IPublicKey {
    const raw = (point as any).rawEncoded() as Uint8Array;
    return SLIP10Ed25519Blake2bPublicKey.fromBytes(raw);
  }

  point(): IPoint {
    return new SLIP10Ed25519Blake2bPoint(this.publicKey);
  }
}