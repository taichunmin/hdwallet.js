import { SLIP10Ed25519Point } from "../../";

export class SLIP10Ed25519MoneroPoint extends SLIP10Ed25519Point {
  public static curve(): string {
    return "SLIP10-Ed25519-Monero";
  }
}