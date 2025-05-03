// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';
import BN from 'bn.js';

import { IPoint } from '../../index';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('secp256k1');
type BasePoint = elliptic.curve.base.BasePoint;

export class SLIP10Secp256k1Point extends IPoint {

  constructor(point: BasePoint) { super(point); }

  static getName(): string {
    return 'SLIP10-Secp256k1';
  }

  static fromBytes(bytes: Uint8Array): IPoint {
    const len = bytes.length;

    if (len === SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH) {
      const keyPair = ec.keyFromPublic(Buffer.from(bytes));
      const pubPoint = keyPair.getPublic();
      return new SLIP10Secp256k1Point(pubPoint);
    }

    if (len === SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH - 1) {
      const full = new Uint8Array(1 + len);
      full[0] = 0x04;
      full.set(bytes, 1);
      const keyPair = ec.keyFromPublic(Buffer.from(full));
      const pubPoint = keyPair.getPublic();
      return new SLIP10Secp256k1Point(pubPoint);
    }

    if (len === SLIP10_SECP256K1_CONST.PUBLIC_KEY_COMPRESSED_BYTE_LENGTH) {
      const keyPair = ec.keyFromPublic(Buffer.from(bytes));
      const pubPoint = keyPair.getPublic();
      return new SLIP10Secp256k1Point(pubPoint);
    }
    throw new Error('Invalid point bytes');
  }

  static fromCoordinates(x: bigint, y: bigint): IPoint {
    const bnX = new BN(x.toString());
    const bnY = new BN(y.toString());
    const point = ec.curve.point(bnX, bnY) as BasePoint;
    return new SLIP10Secp256k1Point(point);
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
    return new Uint8Array(this.point.encodeCompressed());
  }

  rawDecoded(): Uint8Array {
    const encoded = this.point.encode('array', false) as number[];
    return new Uint8Array(encoded.slice(1));
  }

  add(point: IPoint): IPoint {
    const other = (point as SLIP10Secp256k1Point).underlyingObject() as BasePoint;
    const sum = this.point.add(other) as BasePoint;
    return new SLIP10Secp256k1Point(sum);
  }

  radd(point: IPoint): IPoint {
    return this.add(point);
  }

  multiply(scalar: bigint): IPoint {
    const bn = new BN(scalar.toString());
    const prod = this.point.mul(bn) as BasePoint;
    return new SLIP10Secp256k1Point(prod);
  }

  rmul(scalar: bigint): IPoint {
    return this.multiply(scalar);
  }
}
