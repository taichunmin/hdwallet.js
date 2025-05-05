// SPDX-License-Identifier: MIT

export abstract class IPoint {

  point: any;

  constructor(point: any) {
    this.point = point;
  }

  abstract getName(): string;

  static fromBytes(point: Uint8Array): IPoint {
    throw new Error('Must override fromBytes()');
  }

  static fromCoordinates(x: bigint, y: bigint): IPoint {
    throw new Error('Must override fromCoordinates()');
  }

  abstract x(): bigint;

  abstract y(): bigint;

  raw(): Uint8Array {
    return this.rawEncoded();
  }

  abstract rawEncoded(): Uint8Array;

  abstract rawDecoded(): Uint8Array;

  abstract underlyingObject(): any;

  abstract add(point: IPoint): IPoint;

  abstract multiply(scalar: bigint): IPoint;
}
