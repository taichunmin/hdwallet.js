// SPDX-License-Identifier: MIT

import {
  normalizeIndex,
  normalizeDerivation,
  indexTupleToString,
  IndexTuple
} from '../utils';
import { Derivation } from './derivation';
import { DerivationOptions } from '../interfaces';
import { DerivationError } from '../exceptions';

export enum ROLES {
  ExternalChain = 'external-chain',
  InternalChain = 'internal-chain',
  StakingKey    = 'staking-key'
}

export class CIP1852Derivation extends Derivation {
  protected _purpose: [number, boolean] = [1852, true];
  private _coinType: IndexTuple;
  private _account: IndexTuple;
  private _role: IndexTuple;
  private _address: IndexTuple;
  private static roles: Record<string, number> = {
    [ROLES.ExternalChain]: 0,
    [ROLES.InternalChain]: 1,
    [ROLES.StakingKey]:    2
  };

  constructor(options: DerivationOptions = {}) {
    super(options);
    const {
      coinType = 1815,
      account  = 0,
      role     = ROLES.ExternalChain,
      address  = 0
    } = options;
    const allowed = [
      ...Object.keys(CIP1852Derivation.roles),
      ...Object.values(CIP1852Derivation.roles),
      ...Object.values(CIP1852Derivation.roles).map(String)
    ];
    if (!allowed.includes(role as any)) {
      throw new DerivationError(
        'Bad CIP1852 role index',
        { expected: allowed, got: role }
      );
    }
    this._coinType = normalizeIndex(coinType, true);
    this._account  = normalizeIndex(account, true);
    const roleVal = typeof role === 'string'
      ? CIP1852Derivation.roles[role]
      : (role as number);
    this._role    = normalizeIndex(roleVal, false);
    this._address = normalizeIndex(address, false);
    this.updatePath();
  }

  getName(): string {
    return 'CIP1852';
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

  fromRole(role: string | number): this {
    const allowed = [
      ...Object.keys(CIP1852Derivation.roles),
      ...Object.values(CIP1852Derivation.roles),
      ...Object.values(CIP1852Derivation.roles).map(String)
    ];
    if (!allowed.includes(role as any)) {
      throw new DerivationError(
        'Bad CIP1852 role index',
        { expected: allowed, got: role }
      );
    }
    const roleVal = typeof role === 'string'
      ? CIP1852Derivation.roles[role]
      : (role as number);
    this._role = normalizeIndex(roleVal, false);
    this.updatePath();
    return this;
  }

  fromAddress(address: string | number | [number, number]): this {
    this._address = normalizeIndex(address, false);
    this.updatePath();
    return this;
  }

  clean(): this {
    this._account  = normalizeIndex(0, true);
    this._role     = normalizeIndex(CIP1852Derivation.roles[ROLES.ExternalChain], false);
    this._address  = normalizeIndex(0, false);
    this.updatePath();
    return this;
  }

  getPurpose(): number {
    return this._purpose[0];
  }

  getCoinType(): number {
    return this._coinType[0];
  }

  getAccount(): number {
    return this._account.length === 3
      ? this._account[1]
      : this._account[0];
  }

  getRole(): string {
    const val = this._role[0];
    for (const [k, v] of Object.entries(CIP1852Derivation.roles)) {
      if (v === val) return k;
    }
    return '';
  }

  getAddress(): number {
    return this._address.length === 3
      ? this._address[1]
      : this._address[0];
  }

  private updatePath(): void {
    const path = `m/${indexTupleToString(this._purpose)}/` +
      `${indexTupleToString(this._coinType)}/` +
      `${indexTupleToString(this._account)}/` +
      `${indexTupleToString(this._role)}/` +
      `${indexTupleToString(this._address)}`;
    const [p, idxs, ders] = normalizeDerivation(path);
    this._path        = p;
    this._indexes     = idxs;
    this._derivations = ders;
  }
}
