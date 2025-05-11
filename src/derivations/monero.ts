// SPDX-License-Identifier: MIT

import { Derivation } from './derivation';
import { normalizeIndex, normalizeDerivation, indexTupleToString } from '../utils';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType, DerivationsType } from '../types';

export class MoneroDerivation extends Derivation {

  private minor: DerivationsType;
  private major: DerivationsType;

  constructor(options: DerivationOptionsInterface = {
    minor: 1, major: 0
  }) {
    super(options);
    this.minor = normalizeIndex(options.minor ?? 0, false);
    this.major = normalizeIndex(options.major ?? 0, false);
    this.updateDerivation();
  }

  getName(): string {
    return 'Monero';
  }

  private updateDerivation(): void {
    const [path, indexes, derivations] = normalizeDerivation(
      `m/${indexTupleToString(this.minor)}/` +
      `${indexTupleToString(this.major)}`
    );
    this.derivations = derivations;
    this.indexes = indexes;
    this.path = path;
  }

  fromMinor(minor: IndexType): this {
    this.minor = normalizeIndex(minor, false);
    this.updateDerivation();
    return this;
  }

  fromMajor(major: IndexType): this {
    this.major = normalizeIndex(major, false);
    this.updateDerivation();
    return this;
  }

  clean(): this {
    this.minor = normalizeIndex(1, false);
    this.major = normalizeIndex(0, false);
    this.updateDerivation();
    return this;
  }

  getMinor(): number {
    return this.minor.length === 3 ? this.minor[1] : this.minor[0];
  }

  getMajor(): number {
    return this.major.length === 3 ? this.major[1] : this.major[0];
  }
}
  