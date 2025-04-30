import * as elliptic from "elliptic";
import { IPoint } from "../../ipoint";
import { IPublicKey } from "../../ipublic_key";
import { SLIP10Nist256p1Point } from "./point";
import { SLIP10_SECP256K1_CONST } from "../../../const";


const ec = new elliptic.ec("p256");
type BasePoint = elliptic.curve.base.BasePoint;

export class SLIP10Nist256p1PublicKey extends IPublicKey {

  constructor(publicKey: BasePoint) { super(publicKey); }

  public static curve(): string {
    return "SLIP10-Nist256p1";
  }

  public static fromBytes(bytes: Uint8Array): IPublicKey {
    try {
      const keyPair = ec.keyFromPublic(Buffer.from(bytes));
      const base = keyPair.getPublic();
      return new SLIP10Nist256p1PublicKey(base);
    } catch {
      throw new Error("Invalid public key bytes");
    }
  }

  public static fromPoint(pt: IPoint): IPublicKey {
    const base = (pt as SLIP10Nist256p1Point).underlyingObject() as BasePoint;
    return new SLIP10Nist256p1PublicKey(base);
  }

  public static compressedLength(): number {
    return SLIP10_SECP256K1_CONST.PUBLIC_KEY_COMPRESSED_BYTE_LENGTH;
  }

  public static uncompressedLength(): number {
    return SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH;
  }

  public underlyingObject(): any {
    return this.publicKey;
  }

  public rawCompressed(): Uint8Array {
    const arr = this.publicKey.encode("array", true) as number[];
    return new Uint8Array(arr);
  }

  public rawUncompressed(): Uint8Array {
    const arr = this.publicKey.encode("array", false) as number[];
    return new Uint8Array(arr);
  }

  public raw(): Uint8Array {
    return this.rawCompressed();
  }

  public point(): IPoint {
    return new SLIP10Nist256p1Point(this.publicKey);
  }
}
