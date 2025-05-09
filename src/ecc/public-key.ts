// SPDX-License-Identifier: MIT

import { Point } from './point';

export abstract class PublicKey {

  publicKey: any;

  constructor(publicKey: any) {
    this.publicKey = publicKey;
  }

  getName(): string {
    throw new Error('Must override getName()');
  }

  static fromBytes(publicKey: Uint8Array): PublicKey {
    throw new Error('Must override fromBytes()');
  }

  static fromPoint(point: Point): PublicKey {
    throw new Error('Must override fromPoint()');
  }

  abstract getRawCompressed(): Uint8Array;

  abstract getRawUncompressed(): Uint8Array;

  abstract getPoint(): Point;

  abstract getUnderlyingObject(): any;

  static getCompressedLength(): number {
    throw new Error('Must override compressedLength()');
  }

  static getUncompressedLength(): number {
    throw new Error('Must override uncompressedLength()');
  }

  static isValidBytes(bytes: Uint8Array): boolean {
    try {
      this.fromBytes(bytes);
      return true;
    } catch {
      return false;
    }
  }

  static isValidPoint(point: Point): boolean {
    try {
      this.fromPoint(point);
      return true;
    } catch {
      return false;
    }
  }
}
