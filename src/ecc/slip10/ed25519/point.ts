// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';
import BN from 'bn.js';

import { IPoint } from '../../index';
import { SLIP10_ED25519_CONST } from '../../../const';

const ec = new elliptic.eddsa('ed25519');
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class SLIP10Ed25519Point extends IPoint {

  getName(): string {
    return 'SLIP10-Ed25519';
  }

  static fromBytes(point: Uint8Array): IPoint {
    if (point.length !== SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH) {
      throw new Error('Invalid point bytes length');
    }
    try {
      const hex = Buffer.from(point).toString('hex');
      const pt = ec.decodePoint(hex) as EdwardsPoint;
      if (!ec.curve.validate(pt)) throw new Error();
      return new this(pt);
    } catch {
      throw new Error('Invalid point bytes');
    }
  }

  static fromCoordinates(x: bigint, y: bigint): IPoint {
    const bnX = new BN(x.toString(), 10);
    const bnY = new BN(y.toString(), 10);
    const pt = ec.curve.point(bnX, bnY) as EdwardsPoint;
    return new this(pt);
  }

  underlyingObject(): any {
    return this.point;
  }

  x(): bigint {
    return BigInt(this.point.getX().toString(10));
  }

  y(): bigint {
    return BigInt(this.point.getY().toString(10));
  }

  rawEncoded(): Uint8Array {
    return new Uint8Array(ec.encodePoint(this.point));
  }

  rawDecoded(): Uint8Array {
    const xBytes = this.point.getX().toArray('be', 32);
    const yBytes = this.point.getY().toArray('be', 32);
    return new Uint8Array([...xBytes, ...yBytes]);
  }

  add(point: IPoint): IPoint {
    const other = (point as this).underlyingObject() as EdwardsPoint;
    const sum = this.point.add(other) as EdwardsPoint;
    return new SLIP10Ed25519Point(sum);
  }

  multiply(scalar: bigint): IPoint {
    const bn = new BN(scalar.toString(), 10);
    const prod = this.point.mul(bn) as EdwardsPoint;
    return new SLIP10Ed25519Point(prod);
  }
}
