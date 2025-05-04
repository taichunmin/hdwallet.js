// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPublicKey, IPoint } from '../../index';
import { SLIP10_ED25519_CONST } from '../../../const';
import { SLIP10Ed25519Point } from './point';

const ec = new elliptic.eddsa('ed25519');
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class SLIP10Ed25519PublicKey extends IPublicKey {

  getName(): string {
    return 'SLIP10-Ed25519';
  }

  static fromBytes(publicKey: Uint8Array): IPublicKey {
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

  static fromPoint(point: IPoint): IPublicKey {
    const raw = (point as any).rawEncoded() as Uint8Array;
    return this.fromBytes(raw);
  }

  static compressedLength(): number {
    return SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH + SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX.length;
  }

  static uncompressedLength(): number {
    return SLIP10Ed25519PublicKey.compressedLength();
  }

  underlyingObject(): any {
    return this.publicKey;
  }

  rawCompressed(): Uint8Array {
    return new Uint8Array([
      ...SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX,
      ...ec.encodePoint(this.publicKey)
    ]);
  }

  rawUncompressed(): Uint8Array {
    return this.rawCompressed();
  }

  point(): IPoint {
    return new SLIP10Ed25519Point(this.publicKey);
  }
}
