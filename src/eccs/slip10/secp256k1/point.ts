// SPDX-License-Identifier: MIT

import { secp256k1 } from '@noble/curves/secp256k1';

import { Point } from '../../point';
import { getBytes } from '../../../utils';

export class SLIP10Secp256k1Point extends Point {

  getName(): string {
    return 'SLIP10-Secp256k1';
  }

  static fromBytes(point: Uint8Array): Point {
    try {
      const pubPoint = secp256k1.Point.fromHex(getBytes(point));
      return new SLIP10Secp256k1Point(pubPoint);
    } catch {
      throw new Error('Invalid point bytes');
    }
  }

  static fromCoordinates(x: bigint, y: bigint): Point {
    const pt = new secp256k1.Point(x, y, 1n);
    return new SLIP10Secp256k1Point(pt);
  }

  getUnderlyingObject(): any {
    return this.point;
  }

  getX(): bigint {
    return this.point.toAffine().x;
  }

  getY(): bigint {
    return this.point.toAffine().y;
  }

  getRawEncoded(): Uint8Array {
    return this.point.toRawBytes(true);
  }

  getRawDecoded(): Uint8Array {
    return this.point.toRawBytes(false).slice(1);
  }

  add(point: Point): Point {
    const other = (point as this).getUnderlyingObject();
    const sum = this.point.add(other);
    return new SLIP10Secp256k1Point(sum);
  }

  multiply(scalar: bigint): Point {
    const prod = this.point.multiply(scalar);
    return new SLIP10Secp256k1Point(prod);
  }
}
