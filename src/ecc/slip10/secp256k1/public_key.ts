import * as elliptic from "elliptic";
import {
  IPoint,
  IPublicKey,
  SLIP10Secp256k1Point
} from "../../";
import { SLIP10_SECP256K1_CONST } from "../../../const";


const ec = new elliptic.ec("secp256k1");
type BasePoint = elliptic.curve.base.BasePoint;


export class SLIP10Secp256k1PublicKey extends IPublicKey {

  constructor(publicKey: BasePoint) { super(publicKey); }

  public static curve(): string {
    return "SLIP10-Secp256k1";
  }

  public static fromBytes(bytes: Uint8Array): IPublicKey {
    try {
      const keyPair = ec.keyFromPublic(Buffer.from(bytes));
      const pubPoint = keyPair.getPublic();
      return new SLIP10Secp256k1PublicKey(pubPoint);
    } catch {
      throw new Error("Invalid public key bytes");
    }
  }

  public static fromPoint(pt: IPoint): IPublicKey {
    const base = (pt as SLIP10Secp256k1Point).underlyingObject() as BasePoint;
    return new SLIP10Secp256k1PublicKey(base);
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
    return new Uint8Array(this.publicKey.encodeCompressed());
  }

  public rawUncompressed(): Uint8Array {
    const arr = this.publicKey.encode("array", false) as number[];
    return new Uint8Array(arr);
  }

  public raw(): Uint8Array {
    return this.rawCompressed();
  }

  public point(): IPoint {
    return new SLIP10Secp256k1Point(this.publicKey);
  }
}
