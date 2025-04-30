import { IEllipticCurveCryptography } from "./iecc";
import { IPublicKey } from "./ipublic_key";
import { getBytes } from "../utils";
import { ECCError, PublicKeyError } from "../exceptions";
import {
  SLIP10Secp256k1ECC,
} from "./slip10";


export class ECCS {

  private static dictionary: Record<string, IEllipticCurveCryptography> = {
    [SLIP10Secp256k1ECC.NAME] : SLIP10Secp256k1ECC,
  };

  public static names(): string[] {
    return Object.keys(this.dictionary);
  }


  public static classes(): IEllipticCurveCryptography[] {
    return Object.values(this.dictionary);
  }


  public static ecc(name: string): IEllipticCurveCryptography {
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
  publicKeyCls: {
    name(): string;
    fromBytes(bytes: Uint8Array): IPublicKey;
  }
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
      const eccClass = ECCS.ecc(publicKeyCls.name());

      throw new PublicKeyError(
        `Invalid ${(<any>eccClass).NAME} public key instance`,
        { expected: publicKeyCls.name(), got: publicKey.constructor.name }
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
    SLIP10Secp256k1ECC
}