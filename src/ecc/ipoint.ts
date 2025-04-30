export abstract class IPoint {
  public static client(): string {
    throw new Error("Must override client()");
  }

  public static fromBytes(bytes: Uint8Array): IPoint {
    throw new Error("Must override fromBytes()");
  }

  public static fromCoordinates(x: bigint, y: bigint): IPoint {
    throw new Error("Must override fromCoordinates()");
  }

  public abstract x(): bigint;
  public abstract y(): bigint;
  public abstract raw(): Uint8Array;
  public abstract rawEncoded(): Uint8Array;
  public abstract rawDecoded(): Uint8Array;
  public abstract underlyingObject(): any;
  public abstract add(point: IPoint): IPoint;
  public abstract radd(point: IPoint): IPoint;
  public abstract multiply(scalar: bigint): IPoint;
  public abstract rmul(scalar: bigint): IPoint;
}
