import { IPublicKey } from "./ipublic_key";


export abstract class IPrivateKey {
  public static client(): string {
    throw new Error("Must override client()");
  }

  public static fromBytes(bytes: Uint8Array): IPrivateKey {
    throw new Error("Must override fromBytes()");
  }

  public abstract raw(): Uint8Array;
  public abstract publicKey(): IPublicKey;
  public abstract underlyingObject(): any;

  public static size(): number {
      throw new Error("Must override size()");
  }

  public static isValidBytes(bytes: Uint8Array): boolean {
    try {
      this.fromBytes(bytes);
      return true;
    } catch {
      return false;
    }
  }
}
