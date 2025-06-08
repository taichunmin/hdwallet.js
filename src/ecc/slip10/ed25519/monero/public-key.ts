// SPDX-License-Identifier: MIT

import { Point } from '../../../point';
import { SLIP10Ed25519MoneroPoint } from './point';
import { SLIP10Ed25519PublicKey } from '../../ed25519';
import { SLIP10_ED25519_CONST } from '../../../../const';

export class SLIP10Ed25519MoneroPublicKey extends SLIP10Ed25519PublicKey {

  getName(): string {
    return 'SLIP10-Ed25519-Monero';
  }

  getRawCompressed(): Uint8Array {
    return this.publicKey.toRawBytes();
  }

  static getCompressedLength(): number {
    return SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH;
  }

  getPoint(): Point {
    return new SLIP10Ed25519MoneroPoint(this.publicKey);
  }
}
