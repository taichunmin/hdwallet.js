// SPDX-License-Identifier: MIT

export abstract class IPoint {

  point: any;

  protected constructor(point: any) {
    this.point = point;
  }

  static getName(): string {
    throw new Error('Must override getName()');
  }

  static fromBytes(bytes: Uint8Array): IPoint {
    throw new Error('Must override fromBytes()');
  }

  static fromCoordinates(x: bigint, y: bigint): IPoint {
    throw new Error('Must override fromCoordinates()');
  }

  abstract x(): bigint;
  abstract y(): bigint;
  abstract raw(): Uint8Array;
  abstract rawEncoded(): Uint8Array;
  abstract rawDecoded(): Uint8Array;
  abstract underlyingObject(): any;
  abstract add(point: IPoint): IPoint;
  abstract radd(point: IPoint): IPoint;
  abstract multiply(scalar: bigint): IPoint;
  abstract rmul(scalar: bigint): IPoint;
}
