// SPDX-License-Identifier: MIT

import { Derivation } from './derivation';
import { normalizeDerivation } from '../utils';
import { DerivationError } from '../exceptions';

export class CustomDerivation extends Derivation {

  static getName(): string {
    return 'Custom';
  }

  fromPath(path: string): this {
    if (!path.startsWith('m/')) {
      throw new DerivationError(
        'Bad path format',
        { expected: "like this type of path \'m/0'/0\'", got: path }
      );
    }
    const [
      _path, indexes, derivations
    ] = normalizeDerivation(
      path, undefined
    );
    this.derivations = derivations;
    this.indexes = indexes;
    this.path = _path;
    return this;
  }

  fromIndexes(indexes: number[]): this {
    const [
      path, _indexes, derivations
    ] = normalizeDerivation(
      undefined, indexes
    );
    this.derivations = derivations;
    this.indexes = _indexes;
    this.path = path;
    return this;
  }

  fromIndex(index: number, hardened = false): this {
    const path = hardened ? `${index}'` : `${index}`;
    return this.fromPath(
      this.path === 'm/' ? `${this.path}${path}` : `${this.path}/${path}`
    );
  }

  clean(): this {
    const [
      path, indexes, derivations
    ] = normalizeDerivation(
      undefined, undefined
    );
    this.derivations = derivations;
    this.indexes = indexes;
    this.path = path;
    return this;
  }
}
