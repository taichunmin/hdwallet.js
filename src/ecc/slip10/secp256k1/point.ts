// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';
import BN from 'bn.js';

import { Point } from '../../point';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('secp256k1');
type BasePoint = elliptic.curve.base.BasePoint;

export class SLIP10Secp256k1Point extends Point {

  getName(): string {
    return 'SLIP10-Secp256k1';
  }

  static fromBytes(point: Uint8Array): Point {

    if (point.length === SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH) {
      const keyPair = ec.keyFromPublic(Buffer.from(point));
      const pubPoint = keyPair.getPublic();
      return new SLIP10Secp256k1Point(pubPoint);
    }

    if (point.length === SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH - 1) {
      const full = new Uint8Array(1 + point.length);
      full[0] = 0x04;
      full.set(point, 1);
      const keyPair = ec.keyFromPublic(Buffer.from(full));
      const pubPoint = keyPair.getPublic();
      return new SLIP10Secp256k1Point(pubPoint);
    }

    if (point.length === SLIP10_SECP256K1_CONST.PUBLIC_KEY_COMPRESSED_BYTE_LENGTH) {
      const keyPair = ec.keyFromPublic(Buffer.from(point));
      const pubPoint = keyPair.getPublic();
      return new SLIP10Secp256k1Point(pubPoint);
    }
    throw new Error('Invalid point bytes');
  }

  static fromCoordinates(x: bigint, y: bigint): Point {
    const bnX = new BN(x.toString());
    const bnY = new BN(y.toString());
    const point = ec.curve.point(bnX, bnY) as BasePoint;
    return new SLIP10Secp256k1Point(point);
  }

  getUnderlyingObject(): any {
    return this.point;
  }

  getX(): bigint {
    return BigInt(this.point.getX().toString());
  }

  getY(): bigint {
    return BigInt(this.point.getY().toString());
  }

  getRawEncoded(): Uint8Array {
    return new Uint8Array(this.point.encodeCompressed());
  }

  getRawDecoded(): Uint8Array {
    const encoded = this.point.encode('array', false) as number[];
    return new Uint8Array(encoded.slice(1));
  }

  add(point: Point): Point {
    const other = (point as this).getUnderlyingObject() as BasePoint;
    const sum = this.point.add(other) as BasePoint;
    return new SLIP10Secp256k1Point(sum);
  }

  multiply(scalar: bigint): Point {
    const bn = new BN(scalar.toString());
    const prod = this.point.mul(bn) as BasePoint;
    return new SLIP10Secp256k1Point(prod);
  }
}
