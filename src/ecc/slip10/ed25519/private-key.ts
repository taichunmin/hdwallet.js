// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { PrivateKey } from '../../private-key';
import { PublicKey } from '../../public-key';
import { SLIP10Ed25519PublicKey } from './public-key';
import { SLIP10_ED25519_CONST } from '../../../const';

const ec = new elliptic.eddsa('ed25519');

export class SLIP10Ed25519PrivateKey extends PrivateKey {

  getName(): string {
    return 'SLIP10-Ed25519';
  }

  static fromBytes(privateKey: Uint8Array): PrivateKey {
    if (privateKey.length !== SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }
    try {
      const kp = ec.keyFromSecret(Buffer.from(privateKey));
      return new this(kp);
    } catch {
      throw new Error('Invalid private key bytes');
    }
  }

  static getLength(): number {
    return SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  getRaw(): Uint8Array {
    const secret = this.privateKey.secret();
    return new Uint8Array(secret);
  }

  getUnderlyingObject(): any {
    return this.privateKey;
  }

  getPublicKey(): PublicKey {
    const pubBytes = this.privateKey.pubBytes();
    return SLIP10Ed25519PublicKey.fromBytes(new Uint8Array(pubBytes));
  }
}
