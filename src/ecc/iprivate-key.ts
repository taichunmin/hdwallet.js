// SPDX-License-Identifier: MIT

import { IPublicKey } from './ipublic-key';

export interface OptionsPrivateKey {
  extendedKey?: Uint8Array;
}

export abstract class IPrivateKey {

  privateKey: any;
  options: OptionsPrivateKey;

  protected constructor(
    privateKey: any, options: OptionsPrivateKey = { }
  ) {
    this.privateKey = privateKey;
    this.options = options;
  }

  static getName(): string {
    throw new Error('Must override getName()');
  }

  static fromBytes(bytes: Uint8Array): IPrivateKey {
    throw new Error('Must override fromBytes()');
  }

  abstract raw(): Uint8Array;

  abstract publicKey(): IPublicKey;

  abstract underlyingObject(): any;

  static size(): number {
      throw new Error('Must override size()');
  }

  static isValidBytes(bytes: Uint8Array): boolean {
    try {
      this.fromBytes(bytes);
      return true;
    } catch {
      return false;
    }
  }
}
