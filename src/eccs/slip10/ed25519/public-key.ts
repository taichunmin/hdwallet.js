// SPDX-License-Identifier: MIT

import { ed25519 } from '@noble/curves/ed25519';

import { PublicKey } from '../../public-key';
import { Point } from '../../point';
import { SLIP10_ED25519_CONST } from '../../../consts';
import { SLIP10Ed25519Point } from './point';
import { concatBytes } from '../../../utils';

export class SLIP10Ed25519PublicKey extends PublicKey {

  getName(): string {
    return 'SLIP10-Ed25519';
  }

  static fromBytes(publicKey: Uint8Array): PublicKey {
    let data = publicKey;
    const prefix = SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX;
    if (
      data.length === prefix.length + SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH &&
      data[0] === prefix[0]
    ) {
      data = data.slice(prefix.length);
    }
    if (data.length !== SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH) {
      throw new Error('Invalid key bytes length');
    }

    try {
      const pt = ed25519.Point.fromHex(data);
      return new this(pt);
    } catch {
      throw new Error('Invalid key bytes');
    }
  }

  static fromPoint(point: Point): PublicKey {
    const raw = (point as any).getRawEncoded() as Uint8Array;
    return this.fromBytes(raw);
  }

  static getCompressedLength(): number {
    return SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH + SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX.length;
  }

  static getUncompressedLength(): number {
    return this.getCompressedLength();
  }

  getUnderlyingObject(): any {
    return this.publicKey;
  }

  getRawCompressed(): Uint8Array {
    return concatBytes(
      SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX,
      this.publicKey.toRawBytes()
    );
  }

  getRawUncompressed(): Uint8Array {
    return this.getRawCompressed();
  }

  getPoint(): Point {
    return new SLIP10Ed25519Point(this.publicKey);
  }
}
