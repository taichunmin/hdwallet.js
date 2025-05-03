import * as elliptic from "elliptic";
import { IPublicKey, IPoint } from "../../";
import { SLIP10Ed25519PublicKey } from "../../slip10/ed25519/public_key";
import { KholawEd25519Point } from "./point";

const ec = new elliptic.eddsa("ed25519");
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class KholawEd25519PublicKey extends SLIP10Ed25519PublicKey {
  constructor(publicKey: EdwardsPoint) {
    super(publicKey);
  }

  public static curve(): string {
    return "Kholaw-Ed25519";
  }

  public static fromBytes(bytes: Uint8Array): IPublicKey {
    return super.fromBytes(bytes) as KholawEd25519PublicKey;
  }

  public point(): IPoint {
    return new KholawEd25519Point(this.publicKey);
  }
}