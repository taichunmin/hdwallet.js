import * as elliptic from "elliptic";
import { IPublicKey, IPoint } from "../../";
import { SLIP10_ED25519_CONST } from "../../../const";
import { SLIP10Ed25519Point } from "./point";

const ec = new elliptic.eddsa("ed25519");
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class SLIP10Ed25519PublicKey extends IPublicKey {
  constructor(publicKey: EdwardsPoint) {
    super(publicKey);
  }

  public static curve(): string {
    return "SLIP10-Ed25519";
  }

  public static fromBytes(bytes: Uint8Array): IPublicKey {
    let data = bytes;
    const prefixLen = SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX.length;
    if (
      data.length === SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH + prefixLen &&
      data[0] === SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX[0]
    ) {
      data = data.slice(prefixLen);
    }
    try {
      const hex = Buffer.from(data).toString("hex");
      const pt = ec.decodePoint(hex) as EdwardsPoint;
      if (!ec.curve.validate(pt)) throw new Error();
      return new SLIP10Ed25519PublicKey(pt);
    } catch {
      throw new Error("Invalid public key bytes");
    }
  }

  public static fromPoint(pt: IPoint): IPublicKey {
    return SLIP10Ed25519PublicKey.fromBytes((pt as SLIP10Ed25519Point).rawEncoded());
  }

  public static compressedLength(): number {
    return SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH + SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX.length;
  }

  public static uncompressedLength(): number {
    return SLIP10Ed25519PublicKey.compressedLength();
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

  public point(): IPoint {
    return new SLIP10Ed25519Point(this.publicKey);
  }
}
