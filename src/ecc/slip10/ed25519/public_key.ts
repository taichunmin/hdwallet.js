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
    const prefix = SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX;
    if (
      data.length === prefix.length + SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH &&
      data[0] === prefix[0]
    ) {
      data = data.slice(prefix.length);
    }
    if (data.length !== SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH) {
      throw new Error("Invalid public key bytes length");
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

  public static fromPoint(point: IPoint): IPublicKey {
    const raw = (point as any).rawEncoded() as Uint8Array;
    return SLIP10Ed25519PublicKey.fromBytes(raw);
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
    return new Uint8Array([
      ...SLIP10_ED25519_CONST.PUBLIC_KEY_PREFIX,
      ...ec.encodePoint(this.publicKey)
    ]);
  }

  public rawUncompressed(): Uint8Array {
    return this.rawCompressed();
  }

  public point(): IPoint {
    return new SLIP10Ed25519Point(this.publicKey);
  }
}
