import { SLIP10Ed25519Point } from "../../slip10/ed25519/point";

export class KholawEd25519Point extends SLIP10Ed25519Point {
  public static curve(): string {
    return "Kholaw-Ed25519";
  }
}