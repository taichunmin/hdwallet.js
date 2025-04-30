import * as elliptic from "elliptic";
import { IPrivateKey, IPublicKey } from "../../";
import { SLIP10_ED25519_CONST } from "../../../const";
import { SLIP10Ed25519PublicKey } from "./public_key";

const ec = new elliptic.eddsa("ed25519");
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;
type EdDSAKeyPair = elliptic.eddsa.KeyPair;

export class SLIP10Ed25519PrivateKey extends IPrivateKey {
  constructor(privateKey: EdDSAKeyPair) {
    super(privateKey);
  }

  public static curve(): string {
    return "SLIP10-Ed25519";
  }

  public static fromBytes(bytes: Uint8Array): IPrivateKey {
    if (bytes.length !== SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error("Invalid private key bytes length");
    }
    try {
      const kp = ec.keyFromSecret(Buffer.from(bytes));
      return new SLIP10Ed25519PrivateKey(kp);
    } catch {
      throw new Error("Invalid private key bytes");
    }
  }

  public static size(): number {
    return SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  public raw(): Uint8Array {
    const secret = this.privateKey.secret();
    return new Uint8Array(secret);
  }

  public underlyingObject(): any {
    return this.privateKey;
  }

  public publicKey(): IPublicKey {
    const pubBytes = this.privateKey.pubBytes();
    return SLIP10Ed25519PublicKey.fromBytes(new Uint8Array(pubBytes));
  }
}
