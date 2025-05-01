import * as elliptic from "elliptic";
import { IPrivateKey, IPublicKey } from "../../../";
import { SLIP10_ED25519_CONST } from "../../../../const";
import { SLIP10Ed25519PrivateKey } from "../private_key";
import { SLIP10Ed25519Blake2bPublicKey } from "./public_key";

const ec = new elliptic.eddsa("ed25519");
type EdDSAKeyPair = elliptic.eddsa.KeyPair;

export class SLIP10Ed25519Blake2bPrivateKey extends SLIP10Ed25519PrivateKey {
  constructor(privateKey: EdDSAKeyPair) {
    super(privateKey);
  }

  public static curve(): string {
    return "SLIP10-Ed25519-Blake2b";
  }

  public static fromBytes(bytes: Uint8Array): IPrivateKey {
    return super.fromBytes(bytes) as SLIP10Ed25519Blake2bPrivateKey;
  }

  public publicKey(): IPublicKey {
    const pubBytes = this.privateKey.pubBytes();
    return SLIP10Ed25519Blake2bPublicKey.fromBytes(new Uint8Array(pubBytes));
  }
}