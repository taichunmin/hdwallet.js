// SPDX-License-Identifier: MIT

import {
    normalizeIndex,
    normalizeDerivation,
    indexTupleToString,
    IndexTuple
  } from '../utils';
  import { Derivation, DerivationOptions } from './derivation';
  
  export class MoneroDerivation extends Derivation {
    private _minor: IndexTuple;
    private _major: IndexTuple;
  
    constructor(options: DerivationOptions = {}) {
      super(options);
      const { minor = 1, major = 0 } = options;
      this._minor = normalizeIndex(minor, false);
      this._major = normalizeIndex(major, false);
      this.updatePath();
    }
  
    getName(): string {
      return 'Monero';
    }
  
    fromMinor(minor: string | number | [number, number]): this {
      this._minor = normalizeIndex(minor, false);
      this.updatePath();
      return this;
    }
  
    fromMajor(major: string | number | [number, number]): this {
      this._major = normalizeIndex(major, false);
      this.updatePath();
      return this;
    }
  
    clean(): this {
      this._minor = normalizeIndex(1, false);
      this._major = normalizeIndex(0, false);
      this.updatePath();
      return this;
    }
  
    getMinor(): number {
      return this._minor.length === 3 ? this._minor[1] : this._minor[0];
    }
  
    getMajor(): number {
      return this._major.length === 3 ? this._major[1] : this._major[0];
    }
  
    private updatePath(): void {
      const path = `m/${indexTupleToString(this._minor)}/${indexTupleToString(this._major)}`;
      const [p, idxs, ders] = normalizeDerivation(path);
      this._path = p;
      this._indexes = idxs;
      this._derivations = ders;
    }
  }
  