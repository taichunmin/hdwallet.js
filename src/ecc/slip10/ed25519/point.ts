// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';
import BN from 'bn.js';

import { IPoint } from '../../index';
import { SLIP10_ED25519_CONST } from '../../../const';

const ec = new elliptic.eddsa('ed25519');
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class SLIP10Ed25519Point extends IPoint {
  constructor(point: EdwardsPoint) {
    super(point);
  }

  static getName(): string {
    return 'SLIP10-Ed25519';
  }

  static fromBytes(bytes: Uint8Array): IPoint {
    if (bytes.length !== SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH) {
      throw new Error('Invalid point bytes length');
    }
    try {
      const hex = Buffer.from(bytes).toString('hex');
      const pt = ec.decodePoint(hex) as EdwardsPoint;
      if (!ec.curve.validate(pt)) throw new Error();
      return new SLIP10Ed25519Point(pt);
    } catch {
      throw new Error('Invalid point bytes');
    }
  }

  static fromCoordinates(x: bigint, y: bigint): IPoint {
    const bnX = new BN(x.toString(), 10);
    const bnY = new BN(y.toString(), 10);
    const pt = ec.curve.point(bnX, bnY) as EdwardsPoint;
    return new SLIP10Ed25519Point(pt);
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

  raw(): Uint8Array {
    return this.rawDecoded();
  }

  rawEncoded(): Uint8Array {
    const arr = this.point.encode('array', true) as number[];
    return new Uint8Array(arr);
  }

  rawDecoded(): Uint8Array {
    const arr = this.point.encode('array', false) as number[];
    return new Uint8Array(arr.slice(1));
  }

  add(point: IPoint): IPoint {
    const other = (point as SLIP10Ed25519Point).underlyingObject() as EdwardsPoint;
    const sum = this.point.add(other) as EdwardsPoint;
    return new SLIP10Ed25519Point(sum);
  }

  radd(point: IPoint): IPoint {
    return this.add(point);
  }

  multiply(scalar: bigint): IPoint {
    const bn = new BN(scalar.toString(), 10);
    const prod = this.point.mul(bn) as EdwardsPoint;
    return new SLIP10Ed25519Point(prod);
  }

  rmul(scalar: bigint): IPoint {
    return this.multiply(scalar);
  }
}
