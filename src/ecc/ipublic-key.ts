// SPDX-License-Identifier: MIT

import { IPoint } from './ipoint';

export abstract class IPublicKey {

  publicKey: any;

  constructor(publicKey: any) {
    this.publicKey = publicKey;
  }

  getName(): string {
    throw new Error('Must override getName()');
  }

  static fromBytes(publicKey: Uint8Array): IPublicKey {
    throw new Error('Must override fromBytes()');
  }

  static fromPoint(point: IPoint): IPublicKey {
    throw new Error('Must override fromPoint()');
  }

  abstract getRawCompressed(): Uint8Array;

  abstract getRawUncompressed(): Uint8Array;

  abstract getPoint(): IPoint;

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

  static isValidPoint(point: IPoint): boolean {
    try {
      this.fromPoint(point);
      return true;
    } catch {
      return false;
    }
  }
}
