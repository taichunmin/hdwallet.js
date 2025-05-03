import * as elliptic from "elliptic";
import { IPrivateKey, IPublicKey } from "../../";
import { KHOLAW_ED25519_CONST } from "../../../const";
import { SLIP10Ed25519PrivateKey } from "../../slip10/ed25519/private_key";
import { KholawEd25519PublicKey } from "./public_key";

const ec = new elliptic.eddsa("ed25519");
type EdDSAKeyPair = elliptic.eddsa.KeyPair;

export class KholawEd25519PrivateKey extends SLIP10Ed25519PrivateKey {
  private extendedKey: Uint8Array;

  constructor(privateKey: EdDSAKeyPair, extendedKey: Uint8Array) {
    super(privateKey);
    if (extendedKey.length !== SLIP10Ed25519PrivateKey.size()) {
      throw new Error("Invalid extended key length");
    }
    this.extendedKey = extendedKey;
  }

  public static curve(): string {
    return "Kholaw-Ed25519";
  }

  public static fromBytes(bytes: Uint8Array): IPrivateKey {
    if (bytes.length !== KHOLAW_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error("Invalid private key bytes length");
    }
    const privateKeyBytes = bytes.slice(0, SLIP10Ed25519PrivateKey.size());
    const extendedKeyBytes = bytes.slice(SLIP10Ed25519PrivateKey.size());
    const kp = ec.keyFromSecret(Buffer.from(privateKeyBytes));
    return new KholawEd25519PrivateKey(kp, extendedKeyBytes);
  }

  public static size(): number {
    return KHOLAW_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  public raw(): Uint8Array {
    const secret = this.privateKey.secret();
    const combined = new Uint8Array(KholawEd25519PrivateKey.size());
    combined.set(new Uint8Array(secret));
    combined.set(this.extendedKey, SLIP10Ed25519PrivateKey.size());
    return combined;
  }

  public publicKey(): IPublicKey {
    const pubBytes = this.privateKey.pubBytes();
    return KholawEd25519PublicKey.fromBytes(new Uint8Array(pubBytes));
  }
}