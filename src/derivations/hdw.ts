// SPDX-License-Identifier: MIT

import {
  normalizeIndex,
  normalizeDerivation,
  indexTupleToString,
  IndexTuple
} from '../utils';
import {
  ECCS as EllipticCurveCryptographies, 
  EllipticCurveCryptography
} from '../ecc';
import { Derivation, DerivationOptions } from './derivation';
import { DerivationError } from '../exceptions';

export enum ECCS {
  SLIP10_Secp256k1      = 'SLIP10-Secp256k1',
  SLIP10_Ed25519        = 'SLIP10-Ed25519',
  SLIP10_Nist256p1      = 'SLIP10-Nist256p1',
  KHOLAW_ED25519        = 'Kholaw-Ed25519',
  SLIP10_Ed25519_Blake2b= 'SLIP10-Ed25519-Blake2b',
  SLIP10_Ed25519_Monero = 'SLIP10-Ed25519-Monero'
}

export class HDWDerivation extends Derivation {
  private _account: IndexTuple;
  private _ecc: IndexTuple;
  private _address: IndexTuple;
  private static eccs: Record<string, number> = {
    [ECCS.SLIP10_Secp256k1]:       0,
    [ECCS.SLIP10_Ed25519]:         1,
    [ECCS.SLIP10_Nist256p1]:       2,
    [ECCS.KHOLAW_ED25519]:         3,
    [ECCS.SLIP10_Ed25519_Blake2b]: 4,
    [ECCS.SLIP10_Ed25519_Monero]:  5
  };

  constructor(options: DerivationOptions = {}) {
    super(options);
    const {
      account = 0,
      ecc     = ECCS.SLIP10_Secp256k1,
      address = 0
    } = options;
    const allowed = [
      ...Object.keys(HDWDerivation.eccs),
      ...Object.values(HDWDerivation.eccs),
      ...EllipticCurveCryptographies.getClasses().map(c => c.NAME),
      ...Object.values(HDWDerivation.eccs).map(String)
    ];
    if (!allowed.includes(ecc as any)) {
      throw new DerivationError(
        'Bad HDW ecc index',
        { expected: allowed, got: ecc }
      );
    }
    const eccKey = typeof ecc === 'string' || typeof ecc === 'number'
      ? ecc as string | number
      : (ecc as typeof EllipticCurveCryptography).NAME;
    this._account = normalizeIndex(account, true);
    const eccVal = typeof eccKey === 'string' && eccKey in HDWDerivation.eccs
      ? HDWDerivation.eccs[eccKey]
      : eccKey as number;
    this._ecc     = normalizeIndex(eccVal, false);
    this._address = normalizeIndex(address, false);
    this.updatePath();
  }

  getName(): string {
    return 'HDW';
  }

  fromAccount(account: string | number | [number, number]): this {
    this._account = normalizeIndex(account, true);
    this.updatePath();
    return this;
  }

  fromEcc(ecc: string | number | typeof EllipticCurveCryptography): this {
    const allowed = [
      ...Object.keys(HDWDerivation.eccs),
      ...Object.values(HDWDerivation.eccs),
      ...EllipticCurveCryptographies.getClasses().map(c => c.NAME),
      ...Object.values(HDWDerivation.eccs).map(String)
    ];
    if (!allowed.includes(ecc as any)) {
      throw new DerivationError(
        'Bad HDW ecc index',
        { expected: allowed, got: ecc }
      );
    }
    const eccKey = typeof ecc === 'string' || typeof ecc === 'number'
      ? ecc as string | number
      : (ecc as typeof EllipticCurveCryptography).NAME;
    const eccVal = typeof eccKey === 'string' && eccKey in HDWDerivation.eccs
      ? HDWDerivation.eccs[eccKey]
      : eccKey as number;
    this._ecc = normalizeIndex(eccVal, false);
    this.updatePath();
    return this;
  }

  fromAddress(address: string | number | [number, number]): this {
    this._address = normalizeIndex(address, false);
    this.updatePath();
    return this;
  }

  clean(): this {
    this._account = normalizeIndex(0, true);
    this._address = normalizeIndex(0, false);
    this.updatePath();
    return this;
  }

  getAccount(): number {
    return this._account.length === 3
      ? this._account[1]
      : this._account[0];
  }

  getEcc(): string {
    const val = this._ecc[0];
    for (const [k, v] of Object.entries(HDWDerivation.eccs)) {
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
    const path = `m/${indexTupleToString(this._account)}/` +
      `${indexTupleToString(this._ecc)}/` +
      `${indexTupleToString(this._address)}`;
    const [p, idxs, ders] = normalizeDerivation(path);
    this._path        = p;
    this._indexes     = idxs;
    this._derivations = ders;
  }
}
