// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { PublicKey } from '../../public-key';
import { Point } from '../../point';
import { SLIP10Nist256p1Point } from './point';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('p256');
type BasePoint = elliptic.curve.base.BasePoint;

export class SLIP10Nist256p1PublicKey extends PublicKey {

  getName(): string {
    return 'SLIP10-Nist256p1';
  }

  static fromBytes(publicKey: Uint8Array): PublicKey {
    try {
      const keyPair = ec.keyFromPublic(Buffer.from(publicKey));
      const base = keyPair.getPublic();
      return new SLIP10Nist256p1PublicKey(base);
    } catch {
      throw new Error('Invalid key bytes');
    }
  }

  static fromPoint(point: Point): PublicKey {
    const base = (point as SLIP10Nist256p1Point).getUnderlyingObject() as BasePoint;
    return new SLIP10Nist256p1PublicKey(base);
  }

  static getCompressedLength(): number {
    return SLIP10_SECP256K1_CONST.PUBLIC_KEY_COMPRESSED_BYTE_LENGTH;
  }

  static getUncompressedLength(): number {
    return SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH;
  }

  getUnderlyingObject(): any {
    return this.publicKey;
  }

  getRawCompressed(): Uint8Array {
    const arr = this.publicKey.encode('array', true) as number[];
    return new Uint8Array(arr);
  }

  getRawUncompressed(): Uint8Array {
    const arr = this.publicKey.encode('array', false) as number[];
    return new Uint8Array(arr);
  }

  getRaw(): Uint8Array {
    return this.getRawCompressed();
  }

  getPoint(): Point {
    return new SLIP10Nist256p1Point(this.publicKey);
  }
}
