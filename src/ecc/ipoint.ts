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

  abstract getX(): bigint;

  abstract getY(): bigint;

  getRaw(): Uint8Array {
    return this.getRawEncoded();
  }

  abstract getRawEncoded(): Uint8Array;

  abstract getRawDecoded(): Uint8Array;

  abstract getUnderlyingObject(): any;

  abstract add(point: IPoint): IPoint;

  abstract multiply(scalar: bigint): IPoint;
}
