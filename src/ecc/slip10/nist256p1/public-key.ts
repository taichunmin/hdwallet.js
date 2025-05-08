// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPublicKey } from '../../ipublic-key';
import { IPoint } from '../../ipoint';
import { SLIP10Nist256p1Point } from './point';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('p256');
type BasePoint = elliptic.curve.base.BasePoint;

export class SLIP10Nist256p1PublicKey extends IPublicKey {

  getName(): string {
    return 'SLIP10-Nist256p1';
  }

  static fromBytes(publicKey: Uint8Array): IPublicKey {
    try {
      const keyPair = ec.keyFromPublic(Buffer.from(publicKey));
      const base = keyPair.getPublic();
      return new SLIP10Nist256p1PublicKey(base);
    } catch {
      throw new Error('Invalid key bytes');
    }
  }

  static fromPoint(point: IPoint): IPublicKey {
    const base = (point as SLIP10Nist256p1Point).underlyingObject() as BasePoint;
    return new SLIP10Nist256p1PublicKey(base);
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
    const arr = this.publicKey.encode('array', true) as number[];
    return new Uint8Array(arr);
  }

  rawUncompressed(): Uint8Array {
    const arr = this.publicKey.encode('array', false) as number[];
    return new Uint8Array(arr);
  }

  raw(): Uint8Array {
    return this.rawCompressed();
  }

  point(): IPoint {
    return new SLIP10Nist256p1Point(this.publicKey);
  }
}
