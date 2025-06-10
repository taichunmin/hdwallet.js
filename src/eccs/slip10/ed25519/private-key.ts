// SPDX-License-Identifier: MIT

import { ed25519 } from '@noble/curves/ed25519';

import { PrivateKey } from '../../private-key';
import { PublicKey } from '../../public-key';
import { SLIP10Ed25519PublicKey } from './public-key';
import { SLIP10_ED25519_CONST } from '../../../consts';

export class SLIP10Ed25519PrivateKey extends PrivateKey {

  getName(): string {
    return 'SLIP10-Ed25519';
  }

  static fromBytes(privateKey: Uint8Array): PrivateKey {
    if (privateKey.length !== SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }
    try {
      return new this(privateKey);
    } catch {
      throw new Error('Invalid private key bytes');
    }
  }

  static getLength(): number {
    return SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  getRaw(): Uint8Array {
    return this.privateKey as Uint8Array;
  }

  getUnderlyingObject(): any {
    return this.privateKey;
  }

  getPublicKey(): PublicKey {
    const pub = ed25519.getPublicKey(this.getRaw());
    return SLIP10Ed25519PublicKey.fromBytes(pub);
  }
}
