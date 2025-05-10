// SPDX-License-Identifier: MIT

import { EllipticCurveCryptography } from '../ecc';
import { normalizeDerivation, IndexTuple } from '../utils';
import { DerivationOptions } from '../interfaces';

export class Derivation {
  protected _path: string;
  protected _indexes: number[];
  protected _derivations: IndexTuple[];

  constructor(options?: DerivationOptions) {
    const [p, idxs, ders] = normalizeDerivation(options?.path, options?.indexes);
    this._path = p;
    this._indexes = idxs;
    this._derivations = ders;
  }

  toString(): string {
    return this._path;
  }

  getName(): string {
    throw new Error('Not implemented: getName()');
  }

  clean(): this {
    throw new Error('Not implemented: clean()');
  }

  getPath(): string {
    return this._path;
  }

  getIndexes(): number[] {
    return this._indexes;
  }

  getDerivations(): IndexTuple[] {
    return this._derivations;
  }

  getDepth(): number {
    return this._derivations.length;
  }

  getPurpose(): number {
    throw new Error('Not implemented: getPurpose()');
  }

  getCoinType(): number {
    throw new Error('Not implemented: getCoinType()');
  }

  getAccount(): number {
    throw new Error('Not implemented: getAccount()');
  }

  getChange(): number | string {
    throw new Error('Not implemented: getChange()');
  }

  getRole(): string {
    throw new Error('Not implemented: getRole()');
  }

  getAddress(): number {
    throw new Error('Not implemented: getAddress()');
  }

  getMinor(): number {
    throw new Error('Not implemented: getMinor()');
  }

  getMajor(): number {
    throw new Error('Not implemented: getMajor()');
  }
}
