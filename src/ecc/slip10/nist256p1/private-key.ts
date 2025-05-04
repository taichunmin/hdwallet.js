// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import {
  IPublicKey, IPrivateKey, SLIP10Nist256p1PublicKey
} from '../../index';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('p256');
type KeyPair = elliptic.ec.KeyPair;

export class SLIP10Nist256p1PrivateKey extends IPrivateKey {

  constructor(privateKey: KeyPair) {
    super(privateKey);
  }

  static getName(): string {
    return 'SLIP10-Nist256p1';
  }

  static fromBytes(bytes: Uint8Array): SLIP10Nist256p1PrivateKey {
    if (bytes.length !== SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }
    try {
      const kp = ec.keyFromPrivate(Buffer.from(bytes));
      return new SLIP10Nist256p1PrivateKey(kp);
    } catch {
      throw new Error('Invalid private key bytes');
    }
  }

  static size(): number {
    return SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  raw(): Uint8Array {
    const privBN = this.privateKey.getPrivate();
    const hex = privBN.toString(16).padStart(
      SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH * 2,
      '0'
    );
    return Uint8Array.from(Buffer.from(hex, 'hex'));
  }

  underlyingObject(): any {
    return this.privateKey;
  }

  publicKey(): IPublicKey {
    const pubPt = this.privateKey.getPublic();
    return new SLIP10Nist256p1PublicKey(pubPt);
  }
}
