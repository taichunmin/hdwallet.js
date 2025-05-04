// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';
import BN from 'bn.js';

import { IPoint } from '../../index';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('p256');
type BasePoint = elliptic.curve.base.BasePoint;

export class SLIP10Nist256p1Point extends IPoint {

  constructor(point: BasePoint) {
    super(point);
  }

  static getName(): string {
    return 'SLIP10-Nist256p1';
  }

  static fromBytes(bytes: Uint8Array): SLIP10Nist256p1Point {
    const len = bytes.length;
    try {
      const keyPair = ec.keyFromPublic(Buffer.from(bytes));
      return new SLIP10Nist256p1Point(keyPair.getPublic());
    } catch {
      if (len === SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH * 2) {
        const xBytes = bytes.slice(0, SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH);
        const yBytes = bytes.slice(SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH);
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

  raw(): Uint8Array {
    return this.rawDecoded();
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
    const p = (other as SLIP10Nist256p1Point).underlyingObject() as BasePoint;
    const sum = this.point.add(p) as BasePoint;
    return new SLIP10Nist256p1Point(sum);
  }

  radd(other: IPoint): SLIP10Nist256p1Point {
    return this.add(other);
  }

  multiply(scalar: bigint): SLIP10Nist256p1Point {
    const bn = new BN(scalar.toString());
    const prod = this.point.mul(bn) as BasePoint;
    return new SLIP10Nist256p1Point(prod);
  }

  rmul(scalar: bigint): SLIP10Nist256p1Point {
    return this.multiply(scalar);
  }
}
