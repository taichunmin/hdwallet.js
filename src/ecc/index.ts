import { IEllipticCurveCryptography } from "./iecc";
import { IPublicKey } from "./ipublic_key";
import { getBytes } from "../utils";
import { ECCError, PublicKeyError } from "../exceptions";
import {
  SLIP10Secp256k1ECC,
  SLIP10Nist256p1ECC
} from "./slip10";


export class ECCS {

  private static dictionary: Record<string, typeof IEllipticCurveCryptography> = {
    [SLIP10Secp256k1ECC.NAME]: SLIP10Secp256k1ECC,
    [SLIP10Nist256p1ECC.NAME]: SLIP10Nist256p1ECC,
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
    SLIP10Secp256k1ECC,
    SLIP10Nist256p1ECC
}