// SPDX-License-Identifier: MIT

import {
  normalizeIndex,
  normalizeDerivation,
  indexTupleToString,
  IndexTuple
} from '../utils';
import { Derivation } from './derivation';
import { DerivationOptions } from '../interfaces';

export class ElectrumDerivation extends Derivation {
  private _change: IndexTuple;
  private _address: IndexTuple;

  constructor(options: DerivationOptions = {}) {
    super(options);
    const { change = 0, address = 0 } = options;
    this._change = normalizeIndex(change, false);
    this._address = normalizeIndex(address, false);
    this.updatePath();
  }

  getName(): string {
    return 'Electrum';
  }

  fromChange(change: string | number): this {
    this._change = normalizeIndex(change, false);
    this.updatePath();
    return this;
  }

  fromAddress(address: string | number): this {
    this._address = normalizeIndex(address, false);
    this.updatePath();
    return this;
  }

  clean(): this {
    this._change = normalizeIndex(0, false);
    this._address = normalizeIndex(0, false);
    this.updatePath();
    return this;
  }

  getChange(): number {
    return this._change.length === 3 ? this._change[1] : this._change[0];
  }

  getAddress(): number {
    return this._address.length === 3 ? this._address[1] : this._address[0];
  }

  private updatePath(): void {
    const path = `m/${indexTupleToString(this._change)}/${indexTupleToString(this._address)}`;
    const [p, idxs, ders] = normalizeDerivation(path);
    this._path = p;
    this._indexes = idxs;
    this._derivations = ders;
  }
}
