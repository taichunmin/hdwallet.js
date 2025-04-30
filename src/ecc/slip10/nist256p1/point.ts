import * as elliptic from "elliptic";
import BN from "bn.js";
import { IPoint } from "../../";
import { SLIP10_SECP256K1_CONST } from "../../../const";


const ec = new elliptic.ec("p256");
type BasePoint = elliptic.curve.base.BasePoint;


export class SLIP10Nist256p1Point extends IPoint {

  constructor(point: BasePoint) { super(point); }

  public static curve(): string {
    return "SLIP10-Nist256p1";
  }

  public static fromBytes(bytes: Uint8Array): SLIP10Nist256p1Point {
    const len = bytes.length;
    try {
      const keyPair = ec.keyFromPublic(Buffer.from(bytes));
      return new SLIP10Nist256p1Point(keyPair.getPublic());
    } catch {
      if (len === SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH * 2) {
        const xBytes = bytes.slice(0, SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH);
        const yBytes = bytes.slice(SLIP10_SECP256K1_CONST.POINT_COORDINATE_BYTE_LENGTH);
        const x = BigInt(new BN(xBytes).toString(10));
        const y = BigInt(new BN(yBytes).toString(10));
        return SLIP10Nist256p1Point.fromCoordinates(x, y);
      }
      throw new Error("Invalid point bytes");
    }
  }

  public static fromCoordinates(x: bigint, y: bigint): SLIP10Nist256p1Point {
    const bnX = new BN(x.toString());
    const bnY = new BN(y.toString());
    const pt = ec.curve.point(bnX, bnY) as BasePoint;
    return new SLIP10Nist256p1Point(pt);
  }

  public underlyingObject(): any {
    return this.point;
  }

  public x(): bigint {
    return BigInt(this.point.getX().toString());
  }

  public y(): bigint {
    return BigInt(this.point.getY().toString());
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
    return new Uint8Array(arr[0] === 4 ? arr.slice(1) : arr);
  }

  public add(other: IPoint): SLIP10Nist256p1Point {
    const p = (other as SLIP10Nist256p1Point).underlyingObject() as BasePoint;
    const sum = this.point.add(p) as BasePoint;
    return new SLIP10Nist256p1Point(sum);
  }

  public radd(other: IPoint): SLIP10Nist256p1Point {
    return this.add(other);
  }

  public multiply(scalar: bigint): SLIP10Nist256p1Point {
    const bn = new BN(scalar.toString());
    const prod = this.point.mul(bn) as BasePoint;
    return new SLIP10Nist256p1Point(prod);
  }

  public rmul(scalar: bigint): SLIP10Nist256p1Point {
    return this.multiply(scalar);
  }
}
