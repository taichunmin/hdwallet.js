// SPDX-License-Identifier: MIT

import { Derivation } from './derivation';
import { normalizeDerivation } from '../utils';
import { DerivationError } from '../exceptions';

export class CustomDerivation extends Derivation {

  getName(): string {
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
      undefined, undefined
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
    this.indexes.push(
      hardened ? index + 0x80000000 : index
    );
    const path = hardened ? `${index}'` : `${index}`;
    this.path = this.path === 'm/' ? `${this.path}${path}` : `${this.path}/${path}`;
    return this;
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
