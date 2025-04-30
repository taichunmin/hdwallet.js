import { IPoint } from "./ipoint";


export abstract class IPublicKey {
  public static client(): string {
    throw new Error("Must override client()");
  }

  public static fromBytes(bytes: Uint8Array): IPublicKey {
    throw new Error("Must override fromBytes()");
  }

  public static fromPoint(point: IPoint): IPublicKey {
    throw new Error("Must override fromPoint()");
  }

  public abstract rawCompressed(): Uint8Array;
  public abstract rawUncompressed(): Uint8Array;
  public abstract point(): IPoint;
  public abstract underlyingObject(): any;

  public static compressedLength(): number {
    throw new Error("Must override compressedLength()");
  }

  public static uncompressedLength(): number {
    throw new Error("Must override uncompressedLength()");
  }

  public static isValidBytes(bytes: Uint8Array): boolean {
    try {
      this.fromBytes(bytes);
      return true;
    } catch {
      return false;
    }
  }

  public static isValidPoint(point: IPoint): boolean {
    try {
      this.fromPoint(point);
      return true;
    } catch {
      return false;
    }
  }
}
