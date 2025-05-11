// SPDX-License-Identifier: MIT

import { Derivation } from './derivation';
import { normalizeIndex, normalizeDerivation, indexTupleToString } from '../utils';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType, DerivationsType } from '../types';

export class ElectrumDerivation extends Derivation {

  private change: DerivationsType;
  private address: DerivationsType;

  constructor(options: DerivationOptionsInterface = {
    change: 0, address: 0
  }) {
    super(options);
    this.change = normalizeIndex(options.change ?? 0, false);
    this.address = normalizeIndex(options.address ?? 0, false);
    this.updateDerivation();
  }

  getName(): string {
    return 'Electrum';
  }

  private updateDerivation(): void {
    const [path, indexes, derivations] = normalizeDerivation(
      `m/${indexTupleToString(this.change)}/` +
      `${indexTupleToString(this.address)}`
    );
    this.derivations = derivations;
    this.indexes = indexes;
    this.path = path;
  }

  fromChange(change: IndexType): this {
    this.change = normalizeIndex(change, false);
    this.updateDerivation();
    return this;
  }

  fromAddress(address: IndexType): this {
    this.address = normalizeIndex(address, false);
    this.updateDerivation();
    return this;
  }

  clean(): this {
    this.change = normalizeIndex(0, false);
    this.address = normalizeIndex(0, false);
    this.updateDerivation();
    return this;
  }

  getChange(): number {
    return this.change.length === 3 ? this.change[1] : this.change[0];
  }

  getAddress(): number {
    return this.address.length === 3 ? this.address[1] : this.address[0];
  }
}
