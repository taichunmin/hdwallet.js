// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { Point } from '../../../point';
import { SLIP10Ed25519MoneroPoint } from './point';
import { SLIP10Ed25519PublicKey } from '../../ed25519';
import { SLIP10_ED25519_CONST } from '../../../../const';

const ec = new elliptic.eddsa('ed25519');

export class SLIP10Ed25519MoneroPublicKey extends SLIP10Ed25519PublicKey {

  getName(): string {
    return 'SLIP10-Ed25519-Monero';
  }

  rawCompressed(): Uint8Array {
    return new Uint8Array(ec.encodePoint(this.publicKey));
  }

  static getCompressedLength(): number {
    return SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH;
  }

  static getUncompressedLength(): number {
    return SLIP10Ed25519MoneroPublicKey.getCompressedLength();
  }

  point(): Point {
    return new SLIP10Ed25519MoneroPoint(this.publicKey);
  }
}