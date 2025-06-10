// SPDX-License-Identifier: MIT

import { PublicKey } from './public-key';
import { OptionsPrivateKey } from '../interfaces';

export abstract class PrivateKey {

  privateKey: any;
  options: OptionsPrivateKey;

  constructor(
    privateKey: any, options: OptionsPrivateKey = { }
  ) {
    this.privateKey = privateKey;
    this.options = options;
  }

  getName(): string {
    throw new Error('Must override getName()');
  }

  static fromBytes(privateKey: Uint8Array): PrivateKey {
    throw new Error('Must override fromBytes()');
  }

  static getLength(): number {
    throw new Error('Must override size()');
  }

  abstract getRaw(): Uint8Array;

  abstract getPublicKey(): PublicKey;

  abstract getUnderlyingObject(): any;

  static isValidBytes(bytes: Uint8Array): boolean {
    try {
      this.fromBytes(bytes);
      return true;
    } catch {
      return false;
    }
  }
}
