// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPublicKey } from '../../ipublic-key';
import { IPoint } from '../../ipoint';
import { SLIP10Secp256k1Point } from './point';
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
    const base = (point as SLIP10Secp256k1Point).getUnderlyingObject() as BasePoint;
    return new SLIP10Secp256k1PublicKey(base);
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
    return new Uint8Array(this.publicKey.encodeCompressed());
  }

  getRawUncompressed(): Uint8Array {
    const arr = this.publicKey.encode('array', false) as number[];
    return new Uint8Array(arr);
  }

  getRaw(): Uint8Array {
    return this.getRawCompressed();
  }

  getPoint(): IPoint {
    return new SLIP10Secp256k1Point(this.publicKey);
  }
}
