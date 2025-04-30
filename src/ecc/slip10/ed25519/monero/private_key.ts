import * as elliptic from "elliptic";
import { IPrivateKey, IPublicKey } from "../../../";
import { SLIP10Ed25519PrivateKey } from "../../";
import { SLIP10Ed25519MoneroPublicKey } from "./public_key";

const ec = new elliptic.eddsa("ed25519");

export class SLIP10Ed25519MoneroPrivateKey extends SLIP10Ed25519PrivateKey {
  public static curve(): string {
    return "SLIP10-Ed25519-Monero";
  }

  public static fromBytes(bytes: Uint8Array): IPrivateKey {
    return super.fromBytes(bytes);
  }

  public publicKey(): IPublicKey {
    const pubBytes = this.privateKey.pubBytes();
    return SLIP10Ed25519MoneroPublicKey.fromBytes(new Uint8Array(pubBytes));
  }
}
