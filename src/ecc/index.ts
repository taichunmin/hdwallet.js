// SPDX-License-Identifier: MIT

import { IEllipticCurveCryptography } from './iecc';
import { IPoint } from './ipoint';
import { IPublicKey } from './ipublic-key';
import { IPrivateKey } from './iprivate-key';
import {
  KholawEd25519ECC,
  KholawEd25519Point,
  KholawEd25519PrivateKey,
  KholawEd25519PublicKey
} from './kholaw';
import {
  // Ed25519
  SLIP10Ed25519ECC,
  SLIP10Ed25519Point,
  SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey,
  // Ed25519-Blake2b
  SLIP10Ed25519Blake2bECC,
  SLIP10Ed25519Blake2bPoint,
  SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey,
  // Ed25519-Monero
  SLIP10Ed25519MoneroECC,
  SLIP10Ed25519MoneroPoint,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey,
  // Secp256k1
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1Point,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey,
  // Nist256p1
  SLIP10Nist256p1ECC,
  SLIP10Nist256p1Point,
  SLIP10Nist256p1PublicKey,
  SLIP10Nist256p1PrivateKey
} from './slip10';
import { getBytes } from '../utils';
import { ECCError, PublicKeyError } from '../exceptions';

export class ECCS {

  private static dictionary: Record<string, typeof IEllipticCurveCryptography> = {
    [KholawEd25519ECC.NAME]: KholawEd25519ECC,
    [SLIP10Ed25519ECC.NAME]: SLIP10Ed25519ECC,
    [SLIP10Ed25519Blake2bECC.NAME]: SLIP10Ed25519Blake2bECC,
    [SLIP10Ed25519MoneroECC.NAME]: SLIP10Ed25519MoneroECC,
    [SLIP10Nist256p1ECC.NAME]: SLIP10Nist256p1ECC,
    [SLIP10Secp256k1ECC.NAME]: SLIP10Secp256k1ECC
  };

  static names(): string[] {
    return Object.keys(this.dictionary);
  }

  static classes(): typeof IEllipticCurveCryptography[] {
    return Object.values(this.dictionary);
  }

  static ecc(name: string): typeof IEllipticCurveCryptography {
    if (!this.isECC(name)) {
      throw new ECCError(
        `Invalid ECC name: ${name}`,
        { expected: this.names(), got: name }
      );
    }
    return this.dictionary[name];
  }

  static isECC(name: string): boolean {
    return this.names().includes(name);
  }
}

export function validateAndGetPublicKey(
  publicKey: Uint8Array | string | IPublicKey, publicKeyCls: typeof IPublicKey
): IPublicKey {
  try {
    if (publicKey instanceof Uint8Array) {
      return publicKeyCls.fromBytes(publicKey);
    }
    if (typeof publicKey === 'string') {
      const bytes = getBytes(publicKey);
      return publicKeyCls.fromBytes(bytes);
    }
    if (!(publicKey instanceof (<any>publicKeyCls))) {
      throw new PublicKeyError(
        `Invalid ${publicKeyCls.getName()} key instance`, {
          expected: publicKeyCls.getName(), got: publicKey.constructor.name
        }
      );
    }
    return publicKey;
  } catch (err: any) {
    if (err instanceof PublicKeyError) throw err;
    throw new PublicKeyError(
      'Invalid key data'
    );
  }
}

export {
  IEllipticCurveCryptography,
  IPoint,
  IPublicKey,
  IPrivateKey,
  // Kholaw-Ed25519
  KholawEd25519ECC,
  KholawEd25519Point,
  KholawEd25519PublicKey,
  KholawEd25519PrivateKey,
  // Ed25519
  SLIP10Ed25519ECC,
  SLIP10Ed25519Point,
  SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey,
  // Ed25519-Blake2b
  SLIP10Ed25519Blake2bECC,
  SLIP10Ed25519Blake2bPoint,
  SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey,
  // Ed25519-Monero
  SLIP10Ed25519MoneroECC,
  SLIP10Ed25519MoneroPoint,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey,
  // Nist256p1
  SLIP10Nist256p1ECC,
  SLIP10Nist256p1Point,
  SLIP10Nist256p1PublicKey,
  SLIP10Nist256p1PrivateKey,
  // Secp256k1
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1Point,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey
}