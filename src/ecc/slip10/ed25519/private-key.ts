// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPrivateKey, IPublicKey } from '../../index';
import { SLIP10_ED25519_CONST } from '../../../const';
import { SLIP10Ed25519PublicKey } from './public-key';

const ec = new elliptic.eddsa('ed25519');

export class SLIP10Ed25519PrivateKey extends IPrivateKey {

  getName(): string {
    return 'SLIP10-Ed25519';
  }

  static fromBytes(privateKey: Uint8Array): IPrivateKey {
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

  static size(): number {
    return SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  raw(): Uint8Array {
    const secret = this.privateKey.secret();
    return new Uint8Array(secret);
  }

  underlyingObject(): any {
    return this.privateKey;
  }

  publicKey(): IPublicKey {
    const pubBytes = this.privateKey.pubBytes();
    return SLIP10Ed25519PublicKey.fromBytes(new Uint8Array(pubBytes));
  }
}
