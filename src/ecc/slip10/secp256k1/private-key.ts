// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { IPrivateKey } from '../../iprivate-key';
import { IPublicKey } from '../../ipublic-key';
import { SLIP10Secp256k1PublicKey } from './public-key';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('secp256k1');

export class SLIP10Secp256k1PrivateKey extends IPrivateKey {

  getName(): string {
    return 'SLIP10-Secp256k1';
  }

  static fromBytes(privateKey: Uint8Array): IPrivateKey {
    if (privateKey.length !== SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }

    try {
      const kp = ec.keyFromPrivate(Buffer.from(privateKey));
      return new SLIP10Secp256k1PrivateKey(kp);
    } catch (err) {
      throw new Error('Invalid private key bytes');
    }
  }

  static size(): number {
    return SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  raw(): Uint8Array {
    const privHex = this.privateKey.getPrivate().toString(16).padStart(
        SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH * 2, '0'
    );
    return Uint8Array.from(Buffer.from(privHex, 'hex'));
  }

  underlyingObject(): any {
    return this.privateKey;
  }

  publicKey(): IPublicKey {
    const pubPoint = this.privateKey.getPublic();
    return new SLIP10Secp256k1PublicKey(pubPoint);
  }
}
