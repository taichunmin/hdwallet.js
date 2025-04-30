import * as elliptic from "elliptic";
import BN from "bn.js";
import { IPoint } from "../../";
import { SLIP10_ED25519_CONST } from "../../../const";

const ec = new elliptic.eddsa("ed25519");
type EdwardsPoint = elliptic.curve.edwards.EdwardsPoint;

export class SLIP10Ed25519Point extends IPoint {
  constructor(point: EdwardsPoint) {
    super(point);
  }

  public static curve(): string {
    return "SLIP10-Ed25519";
  }

  public static fromBytes(bytes: Uint8Array): IPoint {
    if (bytes.length !== SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH) {
      throw new Error("Invalid point bytes length");
    }
    try {
      const hex = Buffer.from(bytes).toString("hex");
      const pt = ec.decodePoint(hex) as EdwardsPoint;
      if (!ec.curve.validate(pt)) throw new Error();
      return new SLIP10Ed25519Point(pt);
    } catch {
      throw new Error("Invalid point bytes");
    }
  }

  public static fromCoordinates(x: bigint, y: bigint): IPoint {
    const bnX = new BN(x.toString(), 10);
    const bnY = new BN(y.toString(), 10);
    const pt = ec.curve.point(bnX, bnY) as EdwardsPoint;
    return new SLIP10Ed25519Point(pt);
  }

  public underlyingObject(): any {
    return this.point;
  }

  public x(): bigint {
    return BigInt(this.point.getX().toString(10));
  }

  public y(): bigint {
    return BigInt(this.point.getY().toString(10));
  }

  public raw(): Uint8Array {
    return this.rawDecoded();
  }

  public rawEncoded(): Uint8Array {
    const arr = this.point.encode("array", true) as number[];
    return new Uint8Array(arr);
  }

  public rawDecoded(): Uint8Array {
    const arr = this.point.encode("array", false) as number[];
    return new Uint8Array(arr.slice(1));
  }

  public add(point: IPoint): IPoint {
    const other = (point as SLIP10Ed25519Point).underlyingObject() as EdwardsPoint;
    const sum = this.point.add(other) as EdwardsPoint;
    return new SLIP10Ed25519Point(sum);
  }

  public radd(point: IPoint): IPoint {
    return this.add(point);
  }

  public multiply(scalar: bigint): IPoint {
    const bn = new BN(scalar.toString(), 10);
    const prod = this.point.mul(bn) as EdwardsPoint;
    return new SLIP10Ed25519Point(prod);
  }

  public rmul(scalar: bigint): IPoint {
    return this.multiply(scalar);
  }
}
