// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';
import BN from 'bn.js';

import { IPoint } from '../../index';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('p256');
type BasePoint = elliptic.curve.base.BasePoint;

export class SLIP10Nist256p1Point extends IPoint {

  getName(): string {
    return 'SLIP10-Nist256p1';
  }

  static fromBytes(point: Uint8Array): SLIP10Nist256p1Point {
    try {
      const keyPair = ec.keyFromPublic(Buffer.from(point));
      return new SLIP10Nist256p1Point(keyPair.getPublic());
    } catch {
      if (point.length === SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH * 2) {
        const xBytes = point.slice(0, SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH);
        const yBytes = point.slice(SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH);
        const x = BigInt(new BN(xBytes).toString(10));
        const y = BigInt(new BN(yBytes).toString(10));
        return SLIP10Nist256p1Point.fromCoordinates(x, y);
      }
      throw new Error('Invalid point bytes');
    }
  }

  static fromCoordinates(x: bigint, y: bigint): SLIP10Nist256p1Point {
    const bnX = new BN(x.toString());
    const bnY = new BN(y.toString());
    const pt = ec.curve.point(bnX, bnY) as BasePoint;
    return new SLIP10Nist256p1Point(pt);
  }

  underlyingObject(): any {
    return this.point;
  }

  x(): bigint {
    return BigInt(this.point.getX().toString());
  }

  y(): bigint {
    return BigInt(this.point.getY().toString());
  }

  rawEncoded(): Uint8Array {
    const arr = this.point.encode('array', true) as number[];
    return new Uint8Array(arr);
  }

  rawDecoded(): Uint8Array {
    const arr = this.point.encode('array', false) as number[];
    return new Uint8Array(arr[0] === 4 ? arr.slice(1) : arr);
  }

  add(other: IPoint): SLIP10Nist256p1Point {
    const p = (other as this).underlyingObject() as BasePoint;
    const sum = this.point.add(p) as BasePoint;
    return new SLIP10Nist256p1Point(sum);
  }

  multiply(scalar: bigint): SLIP10Nist256p1Point {
    const bn = new BN(scalar.toString());
    const prod = this.point.mul(bn) as BasePoint;
    return new SLIP10Nist256p1Point(prod);
  }
}
