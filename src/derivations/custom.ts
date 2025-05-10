// SPDX-License-Identifier: MIT

import { normalizeDerivation } from '../utils';
import { Derivation, DerivationOptions } from './derivation';
import { DerivationError } from '../exceptions';

export class CustomDerivation extends Derivation {
  constructor(options?: DerivationOptions) {
    super(options);
  }

  getName(): string {
    return 'Custom';
  }

  fromPath(path: string): this {
    if (typeof path !== 'string') {
      throw new DerivationError('Bad path instance', { expected: 'string', got: typeof path });
    }
    if (!path.startsWith('m/')) {
      throw new DerivationError(
        'Bad path format',
        { expected: "like this type of path \'m/0'/0\'", got: path }
      );
    }
    const [p, idxs, ders] = normalizeDerivation(path, undefined);
    this._path = p;
    this._indexes = idxs;
    this._derivations = ders;
    return this;
  }

  fromIndexes(indexes: number[]): this {
    if (!Array.isArray(indexes)) {
      throw new DerivationError('Bad indexes instance', { expected: 'number[]', got: typeof indexes });
    }
    const [p, idxs, ders] = normalizeDerivation(undefined, indexes);
    this._path = p;
    this._indexes = idxs;
    this._derivations = ders;
    return this;
  }

  fromIndex(index: number, hardened = false): this {
    if (typeof index !== 'number') {
      throw new DerivationError('Bad index instance', { expected: 'number', got: typeof index });
    }
    const i = hardened ? index + 0x80000000 : index;
    this._indexes.push(i);
    const seg = hardened ? `${index}'` : `${index}`;
    this._path = this._path === 'm/' ? `${this._path}${seg}` : `${this._path}/${seg}`;
    return this;
  }

  clean(): this {
    const [p, idxs, ders] = normalizeDerivation(undefined, undefined);
    this._path = p;
    this._indexes = idxs;
    this._derivations = ders;
    return this;
  }
}
