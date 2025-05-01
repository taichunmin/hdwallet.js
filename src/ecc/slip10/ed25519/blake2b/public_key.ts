import * as elliptic from "elliptic";
import { IPublicKey, IPoint } from "../../../";
import { SLIP10_ED25519_CONST } from "../../../../const";
import { SLIP10Ed25519PublicKey } from "../public_key";
import { SLIP10Ed25519Blake2bPoint } from "./point";

const ec = new elliptic.eddsa("ed25519");
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class SLIP10Ed25519Blake2bPublicKey extends SLIP10Ed25519PublicKey {
  constructor(publicKey: EdwardsPoint) {
    super(publicKey);
  }

  public static curve(): string {
    return "SLIP10-Ed25519-Blake2b";
  }

  public static fromBytes(bytes: Uint8Array): IPublicKey {
    return super.fromBytes(bytes) as SLIP10Ed25519Blake2bPublicKey;
  }

  public static fromPoint(point: IPoint): IPublicKey {
    const raw = (point as any).rawEncoded() as Uint8Array;
    return SLIP10Ed25519Blake2bPublicKey.fromBytes(raw);
  }

  public point(): IPoint {
    return new SLIP10Ed25519Blake2bPoint(this.publicKey);
  }
}