// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { PublicKey } from '../../public-key';
import { Point } from '../../point';
import { SLIP10_ED25519_CONST } from '../../../const';
import { SLIP10Ed25519Point } from './point';

const ec = new elliptic.eddsa('ed25519');
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

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
      const hex = Buffer.from(data).toString('hex');
      const pt = ec.decodePoint(hex) as EdwardsPoint;
      if (!ec.curve.validate(pt)) throw new Error();
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
    return new Uint8Array([
      ...SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX,
      ...ec.encodePoint(this.publicKey)
    ]);
  }

  getRawUncompressed(): Uint8Array {
    return this.getRawCompressed();
  }

  getPoint(): Point {
    return new SLIP10Ed25519Point(this.publicKey);
  }
}
