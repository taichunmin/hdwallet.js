// SPDX-License-Identifier: MIT

import { secp256k1 } from '@noble/curves/secp256k1';
import { bytesToNumberBE, numberToBytesBE } from '@noble/curves/abstract/utils';

import { PrivateKey } from '../../private-key';
import { PublicKey } from '../../public-key';
import { SLIP10Secp256k1PublicKey } from './public-key';
import { SLIP10_SECP256K1_CONST } from '../../../consts';
import { getBytes } from '../../../utils';

export class SLIP10Secp256k1PrivateKey extends PrivateKey {

  getName(): string {
    return 'SLIP10-Secp256k1';
  }

  static fromBytes(privateKey: Uint8Array): PrivateKey {
    if (privateKey.length !== SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error('Invalid private key bytes length');
    }

    try {
      const priv = bytesToNumberBE(getBytes(privateKey));
      const point = secp256k1.Point.BASE.multiply(priv);
      return new SLIP10Secp256k1PrivateKey({ priv, point });
    } catch {
      throw new Error('Invalid private key bytes');
    }
  }

  static getLength(): number {
    return SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  getRaw(): Uint8Array {
    return numberToBytesBE(
      this.privateKey.priv, SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH
    );
  }

  getUnderlyingObject(): any {
    return this.privateKey;
  }

  getPublicKey(): PublicKey {
    return new SLIP10Secp256k1PublicKey(this.privateKey.point);
  }
}
