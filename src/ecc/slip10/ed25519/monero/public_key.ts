// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPublicKey, IPoint } from '../../../index';
import { SLIP10_ED25519_CONST } from '../../../../const';
import { SLIP10Ed25519MoneroPoint } from './point';
import { SLIP10Ed25519PublicKey } from '../../index';

const ec = new elliptic.eddsa('ed25519');

export class SLIP10Ed25519MoneroPublicKey extends SLIP10Ed25519PublicKey {

  static getName(): string {
    return 'SLIP10-Ed25519-Monero';
  }

  static fromBytes(bytes: Uint8Array): IPublicKey {
    return super.fromBytes(bytes) as SLIP10Ed25519MoneroPublicKey;
  }

  static compressedLength(): number {
    return SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH;
  }

  static uncompressedLength(): number {
    return this.compressedLength();
  }

  rawCompressed(): Uint8Array {
    return new Uint8Array(ec.encodePoint(this.publicKey));
  }

  rawUncompressed(): Uint8Array {
    return this.rawCompressed();
  }

  point(): IPoint {
    return new SLIP10Ed25519MoneroPoint(this.publicKey);
  }
}