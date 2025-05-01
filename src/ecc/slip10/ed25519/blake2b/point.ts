import { SLIP10Ed25519Point } from "../point";

export class SLIP10Ed25519Blake2bPoint extends SLIP10Ed25519Point {
  public static curve(): string {
    return "SLIP10-Ed25519-Blake2b";
  }
}