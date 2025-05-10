// SPDX-License-Identifier: MIT

import {
  normalizeIndex,
  normalizeDerivation,
  indexTupleToString,
  IndexTuple
} from '../utils';
import { Derivation } from './derivation';
import { DerivationOptions } from '../interfaces';

export enum CHANGES {
  ExternalChain = 'external-chain',
  InternalChain = 'internal-chain'
}

export class BIP44Derivation extends Derivation {
  protected _purpose: [number, boolean] = [44, true];
  private _coinType: IndexTuple;
  private _account: IndexTuple;
  private _change: IndexTuple;
  private _address: IndexTuple;
  private static changes: Record<string, number> = {
    [CHANGES.ExternalChain]: 0,
    [CHANGES.InternalChain]: 1
  };

  constructor(options: DerivationOptions = {}) {
    super(options);
    const {
      coinType = 0,
      account = 0,
      change = CHANGES.ExternalChain,
      address = 0
    } = options;
    const allowed = [
      ...Object.keys(BIP44Derivation.changes),
      ...Object.values(BIP44Derivation.changes),
      ...Object.values(BIP44Derivation.changes).map(String)
    ];
    if (!allowed.includes(change as any)) {
      throw new Error(
        `Bad ${this.getName()} change index, expected ${allowed}, got ${change}`
      );
    }
    this._coinType = normalizeIndex(coinType, true);
    this._account = normalizeIndex(account, true);
    const changeVal = typeof change === 'string'
      ? BIP44Derivation.changes[change]
      : (change as number);
    this._change = normalizeIndex(changeVal, false);
    this._address = normalizeIndex(address, false);
    this.updatePath();
  }

  clean(): this {
    this._coinType = normalizeIndex(0, true);
    this._account = normalizeIndex(0, true);
    this._change = normalizeIndex(BIP44Derivation.changes[CHANGES.ExternalChain], false);
    this._address = normalizeIndex(0, false);
    this.updatePath();
    return this;
  }

  fromCoinType(coinType: string | number): this {
    this._coinType = normalizeIndex(coinType, true);
    this.updatePath();
    return this;
  }

  fromAccount(account: string | number | [number, number]): this {
    this._account = normalizeIndex(account, true);
    this.updatePath();
    return this;
  }

  fromChange(change: string | number): this {
    const allowed = [
      ...Object.keys(BIP44Derivation.changes),
      ...Object.values(BIP44Derivation.changes),
      ...Object.values(BIP44Derivation.changes).map(String)
    ];
    if (!allowed.includes(change as any)) {
      throw new Error(
        `Bad ${this.getName()} change index, expected ${allowed}, got ${change}`
      );
    }
    const changeVal = typeof change === 'string'
      ? BIP44Derivation.changes[change]
      : (change as number);
    this._change = normalizeIndex(changeVal, false);
    this.updatePath();
    return this;
  }

  fromAddress(address: string | number | [number, number]): this {
    this._address = normalizeIndex(address, false);
    this.updatePath();
    return this;
  }

  getName(): string {
    return 'BIP44';
  }

  getPurpose(): number {
    return this._purpose[0];
  }

  getCoinType(): number {
    return this._coinType[0];
  }

  getAccount(): number {
    return this._account.length === 3 ? this._account[1] : this._account[0];
  }

  getChange(): string {
    const val = this._change[0];
    for (const [k, v] of Object.entries(BIP44Derivation.changes)) {
      if (v === val) return k;
    }
    return '';
  }

  getAddress(): number {
    return this._address.length === 3 ? this._address[1] : this._address[0];
  }

  getRole(): string {
    return this.getChange();
  }

  getMinor(): number {
    throw new Error('Not implemented: getMinor()');
  }

  getMajor(): number {
    throw new Error('Not implemented: getMajor()');
  }

  private updatePath(): void {
    const path = `m/${indexTupleToString(this._purpose)}/` +
      `${indexTupleToString(this._coinType)}/` +
      `${indexTupleToString(this._account)}/` +
      `${indexTupleToString(this._change)}/` +
      `${indexTupleToString(this._address)}`;
    const [p, idxs, ders] = normalizeDerivation(path);
    this._path = p;
    this._indexes = idxs;
    this._derivations = ders;
  }
}
