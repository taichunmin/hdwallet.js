// SPDX-License-Identifier: MIT

import { secp256k1 } from '@noble/curves/secp256k1';

import { PublicKey } from '../../public-key';
import { Point } from '../../point';
import { SLIP10Secp256k1Point } from './point';
import { SLIP10_SECP256K1_CONST } from '../../../consts';
import { getBytes } from '../../../utils';

export class SLIP10Secp256k1PublicKey extends PublicKey {

  getName(): string {
    return 'SLIP10-Secp256k1';
  }

  static fromBytes(publicKey: Uint8Array): PublicKey {
    try {
      const point = secp256k1.Point.fromHex(getBytes(publicKey));
      return new SLIP10Secp256k1PublicKey(point);
    } catch {
      throw new Error('Invalid key bytes');
    }
  }

  static fromPoint(point: Point): PublicKey {
    const base = (point as SLIP10Secp256k1Point).getUnderlyingObject();
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
    return this.publicKey.toRawBytes(true);
  }

  getRawUncompressed(): Uint8Array {
    return this.publicKey.toRawBytes(false);
  }

  getRaw(): Uint8Array {
    return this.getRawCompressed();
  }

  getPoint(): Point {
    return new SLIP10Secp256k1Point(this.publicKey);
  }
}
