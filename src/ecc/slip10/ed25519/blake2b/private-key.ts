// SPDX-License-Identifier: MIT

import * as nacl from 'tweetnacl-blake2b';

import { PrivateKey } from '../../../private-key';
import { PublicKey } from '../../../public-key';
import { SLIP10Ed25519Blake2bPublicKey } from './public-key';
import { SLIP10_ED25519_CONST } from '../../../../const';
import { getBytes } from '../../../../utils';

export class SLIP10Ed25519Blake2bPrivateKey extends PrivateKey {

  getName(): string {
    return 'SLIP10-Ed25519-Blake2b';
  }

  static fromBytes(privateKey: Uint8Array): PrivateKey {

    if (privateKey.length !== SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }
    try {
      const kp: nacl.SignKeyPair = nacl.sign.keyPair.fromSeed(
        getBytes(privateKey)
      );
      return new this(kp);
    } catch {
      throw new Error('Invalid private key bytes');
    }
  }

  static getLength(): number {
    return SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  getRaw(): Uint8Array {
    const secret = this.privateKey.secretKey;
    return new Uint8Array(secret.subarray(0, nacl.sign.seedLength));
  }

  getUnderlyingObject(): any {
    return this.privateKey;
  }

  getPublicKey(): PublicKey {
    const publicKey = this.privateKey.publicKey;
    return SLIP10Ed25519Blake2bPublicKey.fromBytes(publicKey);
  }
}
