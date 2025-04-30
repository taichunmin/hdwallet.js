import * as elliptic from "elliptic";
import { IPublicKey, IPoint } from "../../../";
import { SLIP10_ED25519_CONST } from "../../../../const";
import { SLIP10Ed25519MoneroPoint } from "./point";
import { SLIP10Ed25519PublicKey } from "../../";

const ec = new elliptic.eddsa("ed25519");

export class SLIP10Ed25519MoneroPublicKey extends SLIP10Ed25519PublicKey {
  public static curve(): string {
    return "SLIP10-Ed25519-Monero";
  }

  public static compressedLength(): number {
    return SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH;
  }

  public static uncompressedLength(): number {
    return this.compressedLength();
  }

  public rawCompressed(): Uint8Array {
    return ec.encodePoint(this.publicKey);
  }

  public rawUncompressed(): Uint8Array {
    return this.rawCompressed();
  }

  public point(): IPoint {
    return new SLIP10Ed25519MoneroPoint(this.publicKey);
  }
}