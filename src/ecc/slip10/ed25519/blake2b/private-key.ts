// SPDX-License-Identifier: MIT

import * as nacl from "tweetnacl-blake2b";
import { SignKeyPair } from 'tweetnacl-blake2b';

import { IPrivateKey, IPublicKey, SLIP10Ed25519Blake2bPublicKey } from '../../../index';
import { SLIP10_ED25519_CONST } from '../../../../const';

export class SLIP10Ed25519Blake2bPrivateKey extends IPrivateKey {

  getName(): string {
    return 'SLIP10-Ed25519-Blake2b';
  }

  static fromBytes(privateKey: Uint8Array): IPrivateKey {

    if (privateKey.length !== SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }
    try {
      const kp: SignKeyPair = nacl.sign.keyPair.fromSeed(
          Buffer.from(privateKey)
      );
      return new this(kp);
    } catch {
      throw new Error('Invalid private key bytes');
    }
  }

  static size(): number {
    return SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  raw(): Uint8Array {
    const secret = this.privateKey.secretKey;
    return new Uint8Array(secret.subarray(0, nacl.sign.seedLength));
  }

  underlyingObject(): any {
    return this.privateKey;
  }

  publicKey(): IPublicKey {
    const publicKey = this.privateKey.publicKey;
    return SLIP10Ed25519Blake2bPublicKey.fromBytes(publicKey);
  }
}
