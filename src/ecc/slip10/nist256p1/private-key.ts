// SPDX-License-Identifier: MIT

import * as elliptic from 'elliptic';

import { PrivateKey } from '../../private-key';
import { PublicKey } from '../../public-key';
import { SLIP10Nist256p1PublicKey } from './public-key';
import { SLIP10_SECP256K1_CONST } from '../../../const';

const ec = new elliptic.ec('p256');

export class SLIP10Nist256p1PrivateKey extends PrivateKey {

  getName(): string {
    return 'SLIP10-Nist256p1';
  }

  static fromBytes(privateKey: Uint8Array): SLIP10Nist256p1PrivateKey {
    if (privateKey.length !== SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }
    try {
      const kp = ec.keyFromPrivate(Buffer.from(privateKey));
      return new SLIP10Nist256p1PrivateKey(kp);
    } catch {
      throw new Error('Invalid private key bytes');
    }
  }

  static getLength(): number {
    return SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  getRaw(): Uint8Array {
    const privBN = this.privateKey.getPrivate();
    const hex = privBN.toString(16).padStart(
      SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH * 2,
      '0'
    );
    return Uint8Array.from(Buffer.from(hex, 'hex'));
  }

  getUnderlyingObject(): any {
    return this.privateKey;
  }

  getPublicKey(): PublicKey {
    const pubPt = this.privateKey.getPublic();
    return new SLIP10Nist256p1PublicKey(pubPt);
  }
}
