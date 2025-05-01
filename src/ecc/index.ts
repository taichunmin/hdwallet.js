import { IEllipticCurveCryptography } from "./iecc";
import { IPublicKey } from "./ipublic_key";
import {IPoint} from "./ipoint";
import {IPrivateKey} from "./iprivate_key";
import { getBytes } from "../utils";
import { ECCError, PublicKeyError } from "../exceptions";

import {
  // Secp256k1
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1Point,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey,
  // Nist256p1
  SLIP10Nist256p1ECC,
  SLIP10Nist256p1Point,
  SLIP10Nist256p1PublicKey,
  SLIP10Nist256p1PrivateKey,
  //Ed25519
  SLIP10Ed25519ECC,
  SLIP10Ed25519Point,
  SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey,
  //Ed25519-Monero
  SLIP10Ed25519MoneroECC,
  SLIP10Ed25519MoneroPoint,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey,
  // Blake2b implementations
  SLIP10Ed25519Blake2bECC,
  SLIP10Ed25519Blake2bPoint,
  SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey
} from './slip10';

export class ECCS {

  private static dictionary: Record<string, typeof IEllipticCurveCryptography> = {
    [SLIP10Secp256k1ECC.NAME]: SLIP10Secp256k1ECC,
    [SLIP10Nist256p1ECC.NAME]: SLIP10Nist256p1ECC,
    [SLIP10Ed25519ECC.NAME]: SLIP10Ed25519ECC,
    [SLIP10Ed25519MoneroECC.NAME]: SLIP10Ed25519MoneroECC,
    [SLIP10Ed25519Blake2bECC.NAME]: SLIP10Ed25519Blake2bECC
  };

  public static names(): string[] {
    return Object.keys(this.dictionary);
  }


  public static classes(): typeof IEllipticCurveCryptography[] {
    return Object.values(this.dictionary);
  }


  public static ecc(name: string): typeof IEllipticCurveCryptography {
    if (!this.isECC(name)) {
      throw new ECCError(
        `Invalid ECC name: ${name}`,
        { expected: this.names(), got: name }
      );
    }
    return this.dictionary[name];
  }


  public static isECC(name: string): boolean {
    return this.names().includes(name);
  }
}


export function validateAndGetPublicKey(
  publicKey: Uint8Array | string | IPublicKey,
  publicKeyCls: typeof IPublicKey
): IPublicKey {
  try {
    if (publicKey instanceof Uint8Array) {
      return publicKeyCls.fromBytes(publicKey);
    }
    if (typeof publicKey === "string") {
      const bytes = getBytes(publicKey);
      return publicKeyCls.fromBytes(bytes);
    }
    if (!(publicKey instanceof (<any>publicKeyCls))) {
      // wrong instance type
      const eccClass = ECCS.ecc(publicKeyCls.curve());

      throw new PublicKeyError(
        `Invalid ${(<any>eccClass).NAME} public key instance`,
        { expected: publicKeyCls.curve(), got: publicKey.constructor.name }
      );
    }
    return publicKey as IPublicKey;
  } catch (err: any) {
    if (err instanceof PublicKeyError) throw err;
    throw new PublicKeyError(
      "Invalid public key data"
    );
  }
}

export {
  // interfaces/abstract classes
  IPublicKey,
  IPoint,
  IPrivateKey,
  IEllipticCurveCryptography,

  // Secp256k1
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1Point,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey,

  // Nist256p1
  SLIP10Nist256p1ECC,
  SLIP10Nist256p1Point,
  SLIP10Nist256p1PublicKey,
  SLIP10Nist256p1PrivateKey,

  //Ed25519
  SLIP10Ed25519ECC,
  SLIP10Ed25519Point,
  SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey,

  //Ed25519-Monero
  SLIP10Ed25519MoneroECC,
  SLIP10Ed25519MoneroPoint,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey,

  // Blake2b implementations
  SLIP10Ed25519Blake2bECC,
  SLIP10Ed25519Blake2bPoint,
  SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey
}