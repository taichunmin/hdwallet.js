import * as elliptic from "elliptic";

import { IPrivateKey } from "../../iprivate_key";
import { IPublicKey } from "../../ipublic_key";
import { SLIP10_SECP256K1_CONST } from "../../../const";
import { SLIP10Secp256k1PublicKey } from "./public_key";

const ec = new elliptic.ec("secp256k1");
type KeyPair = elliptic.ec.KeyPair;


export class SLIP10Secp256k1PrivateKey implements IPrivateKey {
  private readonly keyPair: KeyPair;

  private constructor(keyPair: KeyPair) {
    this.keyPair = keyPair;
  }

  public static client(): string {
    return "SLIP10-Secp256k1";
  }

  public static fromBytes(bytes: Uint8Array): IPrivateKey {
    if (bytes.length !== SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH) {
      throw new Error("Invalid private key bytes length");
    }

    try {
      const kp = ec.keyFromPrivate(Buffer.from(bytes));
      return new SLIP10Secp256k1PrivateKey(kp);
    } catch (err) {
      throw new Error("Invalid private key bytes");
    }
  }

  public static size(): number {
    return SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH;
  }

  public raw(): Uint8Array {
    const privHex = this.keyPair.getPrivate().toString(16).padStart(SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH * 2, '0');
    return Uint8Array.from(Buffer.from(privHex, 'hex'));
  }

  public underlyingObject(): any {
    return this.keyPair;
  }

  public publicKey(): IPublicKey {
    const pubPoint = this.keyPair.getPublic();
    return new SLIP10Secp256k1PublicKey(pubPoint);
  }
}
