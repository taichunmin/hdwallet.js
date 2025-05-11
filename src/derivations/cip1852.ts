// SPDX-License-Identifier: MIT

import { Derivation } from './derivation';
import { Cardano } from '../cryptocurrencies';
import { normalizeIndex, normalizeDerivation, indexTupleToString } from '../utils';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType, DerivationType, DerivationsType } from '../types';
import { DerivationError } from '../exceptions';

export const ROLES = {
  EXTERNAL_CHANGE: 'external-chain',
  INTERNAL_CHANGE: 'internal-chain',
  STAKING_KEY: 'staking-key'
} as const;

export class CIP1852Derivation extends Derivation {
  
  protected purpose: DerivationType = [ 1852, true ];

  private coinType: DerivationsType;
  private account: DerivationsType;
  private role: DerivationsType;
  private address: DerivationsType;
  
  constructor(options: DerivationOptionsInterface = {
    coinType: Cardano.COIN_TYPE, account: 0, role: ROLES.EXTERNAL_CHANGE, address: 0
  }) {
    super(options);
    this.coinType = normalizeIndex(options.coinType ?? Cardano.COIN_TYPE, true);
    this.account = normalizeIndex(options.account ?? 0, true);
    this.role = normalizeIndex(this.getRoleValue(
      options.role ?? ROLES.EXTERNAL_CHANGE
    ), false);
    this.address = normalizeIndex(options.address ?? 0, false);
    this.updateDerivation();
  }

  getName(): string {
    return 'CIP1852';
  }

  protected getRoleValue(
    role: IndexType, nameOnly: boolean = false
  ): any {
    if (Array.isArray(role)) {
      throw new DerivationError('Bad role instance', {
        expected: 'number | string', got: typeof role
      });
    }
    const externalChange = [ ROLES.EXTERNAL_CHANGE, 0, '0' ];
    const internalChange = [ ROLES.INTERNAL_CHANGE, 1, '1' ];
    const stakingKey = [ ROLES.STAKING_KEY, 2, '2' ];
    const exceptedRole = [
      ...externalChange, ...internalChange, ...stakingKey
    ];
    if (!exceptedRole.includes(role)) {
      throw new DerivationError(
        `Bad ${this.getName()} role index`, {
          expected: exceptedRole, got: role
        }
      );
    }
    if (externalChange.includes(role)) return nameOnly ? ROLES.EXTERNAL_CHANGE : 0;
    if (internalChange.includes(role)) return nameOnly ? ROLES.INTERNAL_CHANGE : 1;
    if (stakingKey.includes(role)) return nameOnly ? ROLES.STAKING_KEY : 2;
  }

  private updateDerivation(): void {
    const [path, indexes, derivations] = normalizeDerivation(
      `m/${indexTupleToString(this.purpose)}/` +
      `${indexTupleToString(this.coinType)}/` +
      `${indexTupleToString(this.account)}/` +
      `${indexTupleToString(this.role)}/` +
      `${indexTupleToString(this.address)}`
    );
    this.derivations = derivations;
    this.indexes = indexes;
    this.path = path;
  }

  fromCoinType(coinType: string | number): this {
    this.coinType = normalizeIndex(coinType, true);
    this.updateDerivation();
    return this;
  }

  fromAccount(account: IndexType): this {
    this.account = normalizeIndex(account, true);
    this.updateDerivation();
    return this;
  }

  fromRole(role: string | number): this {
    this.role = normalizeIndex(this.getRoleValue(role), false);
    this.updateDerivation();
    return this;
  }

  fromAddress(address: IndexType): this {
    this.address = normalizeIndex(address, false);
    this.updateDerivation();
    return this;
  }

  clean(): this {
    this.coinType = normalizeIndex(Cardano.COIN_TYPE, true);
    this.account = normalizeIndex(0, true);
    this.role = normalizeIndex(
      this.getRoleValue(ROLES.EXTERNAL_CHANGE), false
    );
    this.address = normalizeIndex(0, false);
    this.updateDerivation();
    return this;
  }

  getPurpose(): number {
    return this.purpose[0];
  }

  getCoinType(): number {
    return this.coinType[0];
  }

  getAccount(): number {
    return this.account.length === 3 ? this.account[1] : this.account[0];
  }

  getRole(nameOnly: boolean = true): string {
    return this.getRoleValue(this.role[0], nameOnly);
  }

  getAddress(): number {
    return this.address.length === 3 ? this.address[1] : this.address[0];
  }
}
