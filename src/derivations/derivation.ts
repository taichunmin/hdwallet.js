// SPDX-License-Identifier: MIT

import { normalizeDerivation } from '../utils';
import { DerivationOptionsInterface } from '../interfaces';
import { DerivationsType, DerivationType } from '../types';

export class Derivation {

  path: string;
  indexes: number[];
  derivations: DerivationsType[];

  protected purpose: DerivationType = [ 0, true ];

  constructor(
    options: DerivationOptionsInterface = { }
  ) {
    const [path, indexes, derivations] = normalizeDerivation(
      options?.path, options?.indexes
    );
    this.derivations = derivations;
    this.indexes = indexes;
    this.path = path;
  }

  getName(): string {
    throw new Error('Must override getName()');
  }

  clean(): this {
    throw new Error('Must override clean()');
  }

  getPath(): string {
    return this.path;
  }

  getIndexes(): number[] {
    return this.indexes;
  }

  getDerivations(): DerivationsType[] {
    return this.derivations;
  }

  getDepth(): number {
    return this.derivations.length;
  }

  getPurpose(): number {
    throw new Error('Must override getPurpose()');
  }

  getCoinType(): number {
    throw new Error('Must override getCoinType()');
  }

  getAccount(): number {
    throw new Error('Must override getAccount()');
  }

  getChange(...args: any[]): string {
    throw new Error('Must override getChange()');
  }

  getRole(...args: any[]): string {
    throw new Error('Must override getRole()');
  }

  getAddress(): number {
    throw new Error('Must override getAddress()');
  }

  getMinor(): number {
    throw new Error('Must override getMinor()');
  }

  getMajor(): number {
    throw new Error('Must override getMajor()');
  }
}
