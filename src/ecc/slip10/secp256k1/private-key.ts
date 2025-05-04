// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import {
  IPrivateKey, IPublicKey, SLIP10Secp256k1PublicKey
} from '../../index';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('secp256k1');
type KeyPair = elliptic.ec.KeyPair;

export class SLIP10Secp256k1PrivateKey extends IPrivateKey {

  constructor(privateKey: KeyPair) {
    super(privateKey);
  }

  static getName(): string {
    return 'SLIP10-Secp256k1';
  }

  static fromBytes(bytes: Uint8Array): IPrivateKey {
    if (bytes.length !== SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }

    try {
      const kp = ec.keyFromPrivate(Buffer.from(bytes));
      return new SLIP10Secp256k1PrivateKey(kp);
    } catch (err) {
      throw new Error('Invalid private key bytes');
    }
  }

  static size(): number {
    return SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  raw(): Uint8Array {
    const privHex = this.privateKey.getPrivate().toString(16).padStart(SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH * 2, '0');
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
