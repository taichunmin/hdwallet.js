// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import {
  IPoint, IPublicKey, SLIP10Secp256k1Point
} from '../../index';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('secp256k1');
type BasePoint = elliptic.curve.base.BasePoint;

export class SLIP10Secp256k1PublicKey extends IPublicKey {

  getName(): string {
    return 'SLIP10-Secp256k1';
  }

  static fromBytes(publicKey: Uint8Array): IPublicKey {
    try {
      const keyPair = ec.keyFromPublic(Buffer.from(publicKey));
      const pubPoint = keyPair.getPublic();
      return new SLIP10Secp256k1PublicKey(pubPoint);
    } catch {
      throw new Error('Invalid key bytes');
    }
  }

  static fromPoint(point: IPoint): IPublicKey {
    const base = (point as SLIP10Secp256k1Point).underlyingObject() as BasePoint;
    return new SLIP10Secp256k1PublicKey(base);
  }

  static compressedLength(): number {
    return SLIP10_SECP256K1_CONST.PUBLIC_KEY_COMPRESSED_BYTE_LENGTH;
  }

  static uncompressedLength(): number {
    return SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH;
  }

  underlyingObject(): any {
    return this.publicKey;
  }

  rawCompressed(): Uint8Array {
    return new Uint8Array(this.publicKey.encodeCompressed());
  }

  rawUncompressed(): Uint8Array {
    const arr = this.publicKey.encode('array', false) as number[];
    return new Uint8Array(arr);
  }

  raw(): Uint8Array {
    return this.rawCompressed();
  }

  point(): IPoint {
    return new SLIP10Secp256k1Point(this.publicKey);
  }
}
