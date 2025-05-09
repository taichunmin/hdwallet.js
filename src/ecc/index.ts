// SPDX-License-Identifier: MIT

import {
  EllipticCurveCryptography as _EllipticCurveCryptography,
  Point as _Point,
  PublicKey as _PublicKey,
  PrivateKey as _PrivateKey
} from './ecc';
import {
  KholawEd25519ECC as _KholawEd25519ECC,
  KholawEd25519Point as _KholawEd25519Point,
  KholawEd25519PublicKey as _KholawEd25519PublicKey,
  KholawEd25519PrivateKey as _KholawEd25519PrivateKey
} from './kholaw';
import {
  SLIP10Ed25519ECC as _SLIP10Ed25519ECC,
  SLIP10Ed25519Point as _SLIP10Ed25519Point,
  SLIP10Ed25519PublicKey as _SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey as _SLIP10Ed25519PrivateKey,
  SLIP10Ed25519Blake2bECC as _SLIP10Ed25519Blake2bECC,
  SLIP10Ed25519Blake2bPoint as _SLIP10Ed25519Blake2bPoint,
  SLIP10Ed25519Blake2bPublicKey as _SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey as _SLIP10Ed25519Blake2bPrivateKey,
  SLIP10Ed25519MoneroECC as _SLIP10Ed25519MoneroECC,
  SLIP10Ed25519MoneroPoint as _SLIP10Ed25519MoneroPoint,
  SLIP10Ed25519MoneroPublicKey as _SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey as _SLIP10Ed25519MoneroPrivateKey,
  SLIP10Nist256p1ECC as _SLIP10Nist256p1ECC,
  SLIP10Nist256p1Point as _SLIP10Nist256p1Point,
  SLIP10Nist256p1PublicKey as _SLIP10Nist256p1PublicKey,
  SLIP10Nist256p1PrivateKey as _SLIP10Nist256p1PrivateKey,
  SLIP10Secp256k1ECC as _SLIP10Secp256k1ECC,
  SLIP10Secp256k1Point as _SLIP10Secp256k1Point,
  SLIP10Secp256k1PublicKey as _SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey as _SLIP10Secp256k1PrivateKey
} from './slip10';
import { getBytes } from '../utils';
import { ECCError, PublicKeyError } from '../exceptions';

export class ECCS {

  private static dictionary: Record<string, typeof _EllipticCurveCryptography> = {
    [_KholawEd25519ECC.NAME]: _KholawEd25519ECC,
    [_SLIP10Ed25519ECC.NAME]: _SLIP10Ed25519ECC,
    [_SLIP10Ed25519Blake2bECC.NAME]: _SLIP10Ed25519Blake2bECC,
    [_SLIP10Ed25519MoneroECC.NAME]: _SLIP10Ed25519MoneroECC,
    [_SLIP10Nist256p1ECC.NAME]: _SLIP10Nist256p1ECC,
    [_SLIP10Secp256k1ECC.NAME]: _SLIP10Secp256k1ECC
  };

  static getNames(): string[] {
    return Object.keys(this.dictionary);
  }

  static getClasses(): typeof _EllipticCurveCryptography[] {
    return Object.values(this.dictionary);
  }

  static getECCClass(name: string): typeof _EllipticCurveCryptography | any {
    if (!this.isECC(name)) {
      throw new ECCError(
        `Invalid ECC name: ${name}`, { expected: this.getNames(), got: name }
      );
    }
    return this.dictionary[name];
  }

  static isECC(name: string): boolean {
    return this.getNames().includes(name);
  }
}

export function validateAndGetPublicKey(
  publicKey: Uint8Array | string | _PublicKey, publicKeyCls: typeof _PublicKey
): _PublicKey {
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
        `Invalid public key instance`, {
          expected: publicKeyCls.constructor.name,
          got: publicKey.constructor.name
        }
      );
    }
    return publicKey;
  } catch (err: any) {
    if (err instanceof PublicKeyError) throw err;
    throw new PublicKeyError(
      'Invalid public key data'
    );
  }
}

export {
  _EllipticCurveCryptography as EllipticCurveCryptography,
  _Point as Point,
  _PublicKey as PublicKey,
  _PrivateKey as PrivateKey,
  _KholawEd25519ECC as KholawEd25519ECC,
  _KholawEd25519Point as KholawEd25519Point,
  _KholawEd25519PublicKey as KholawEd25519PublicKey,
  _KholawEd25519PrivateKey as KholawEd25519PrivateKey,
  _SLIP10Ed25519ECC as SLIP10Ed25519ECC,
  _SLIP10Ed25519Point as SLIP10Ed25519Point,
  _SLIP10Ed25519PublicKey as SLIP10Ed25519PublicKey,
  _SLIP10Ed25519PrivateKey as SLIP10Ed25519PrivateKey,
  _SLIP10Ed25519Blake2bECC as SLIP10Ed25519Blake2bECC,
  _SLIP10Ed25519Blake2bPoint as SLIP10Ed25519Blake2bPoint,
  _SLIP10Ed25519Blake2bPublicKey as SLIP10Ed25519Blake2bPublicKey,
  _SLIP10Ed25519Blake2bPrivateKey as SLIP10Ed25519Blake2bPrivateKey,
  _SLIP10Ed25519MoneroECC as SLIP10Ed25519MoneroECC,
  _SLIP10Ed25519MoneroPoint as SLIP10Ed25519MoneroPoint,
  _SLIP10Ed25519MoneroPublicKey as SLIP10Ed25519MoneroPublicKey,
  _SLIP10Ed25519MoneroPrivateKey as SLIP10Ed25519MoneroPrivateKey,
  _SLIP10Nist256p1ECC as SLIP10Nist256p1ECC,
  _SLIP10Nist256p1Point as SLIP10Nist256p1Point,
  _SLIP10Nist256p1PublicKey as SLIP10Nist256p1PublicKey,
  _SLIP10Nist256p1PrivateKey as SLIP10Nist256p1PrivateKey,
  _SLIP10Secp256k1ECC as SLIP10Secp256k1ECC,
  _SLIP10Secp256k1Point as SLIP10Secp256k1Point,
  _SLIP10Secp256k1PublicKey as SLIP10Secp256k1PublicKey,
  _SLIP10Secp256k1PrivateKey as SLIP10Secp256k1PrivateKey
};
