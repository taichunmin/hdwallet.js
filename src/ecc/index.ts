// SPDX-License-Identifier: MIT

import { IEllipticCurveCryptography } from './iecc';
import { IPoint } from './ipoint';
import { IPublicKey } from './ipublic-key';
import { IPrivateKey } from './iprivate-key';
import { KholawEd25519ECC } from './kholaw/ed25519';
import { SLIP10Ed25519ECC } from './slip10/ed25519';
import { SLIP10Ed25519Blake2bECC } from './slip10/ed25519/blake2b';
import { SLIP10Ed25519MoneroECC } from './slip10/ed25519/monero';
import { SLIP10Nist256p1ECC } from './slip10/nist256p1';
import { SLIP10Secp256k1ECC } from './slip10/secp256k1';
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

  static getNames(): string[] {
    return Object.keys(this.dictionary);
  }

  static getClasses(): typeof IEllipticCurveCryptography[] {
    return Object.values(this.dictionary);
  }

  static getECC(name: string): typeof IEllipticCurveCryptography {
    if (!this.isECC(name)) {
      throw new ECCError(
        `Invalid ECC name: ${name}`,
        { expected: this.getNames(), got: name }
      );
    }
    return this.dictionary[name];
  }

  static isECC(name: string): boolean {
    return this.getNames().includes(name);
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
      'Invalid key data'
    );
  }
}

export {
  IEllipticCurveCryptography,
  IPoint,
  IPublicKey,
  IPrivateKey
}
