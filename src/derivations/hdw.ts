// SPDX-License-Identifier: MIT

import { Derivation } from './derivation';
import {
  normalizeIndex, normalizeDerivation, indexTupleToString, validateAndGetData
} from '../utils';
import { EllipticCurveCryptography } from '../ecc';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType, DerivationsType } from '../types';
import { DerivationError } from '../exceptions';

export const ECCS = {
  SLIP10_SECP256K1: 'SLIP10-Secp256k1',
  SLIP10_ED25519: 'SLIP10-Ed25519',
  SLIP10_NIST256P1: 'SLIP10-Nist256p1',
  KHOLAW_ED25519: 'Kholaw-Ed25519',
  SLIP10_ED25519BLAKE2B: 'SLIP10-Ed25519-Blake2b',
  SLIP10_ED25519MONERO: 'SLIP10-Ed25519-Monero'
} as const;

export class HDWDerivation extends Derivation {

  private account: DerivationsType;
  private ecc: DerivationsType;
  private address: DerivationsType;

  constructor(options: DerivationOptionsInterface = {
    account: 0, ecc: ECCS.SLIP10_SECP256K1, address: 0
  }) {
    super(options);
    this.account = normalizeIndex(options.account ?? 0, true);
    this.ecc = normalizeIndex(this.getECCValue(
      options.ecc ?? ECCS.SLIP10_SECP256K1
    ), false);
    this.address = normalizeIndex(options.address ?? 0, false);
    this.updateDerivation();
  }

  getName(): string {
    return 'HDW';
  }

  protected getECCValue(
    ecc: IndexType | EllipticCurveCryptography, nameOnly: boolean = false
  ): any {
    if (Array.isArray(ecc)) {
      throw new DerivationError('Bad ECC instance', {
        expected: 'number | string', got: typeof ecc
      });
    }
    let [curve, isECCClass] = validateAndGetData(
      ecc, EllipticCurveCryptography
    );
    curve = isECCClass ? curve.NAME : ecc;
    const slip10Secp256k1 = [ ECCS.SLIP10_SECP256K1, 0, '0' ];
    const slip10Ed25519 = [ ECCS.SLIP10_ED25519, 1, '1' ];
    const slip10Nist256p1 = [ ECCS.SLIP10_NIST256P1, 2, '2' ];
    const kholawEd25519 = [ ECCS.KHOLAW_ED25519, 3, '3' ];
    const slip10Ed25519Blake2b = [ ECCS.SLIP10_ED25519BLAKE2B, 4, '4' ];
    const slip10Ed25519Monero = [ ECCS.SLIP10_ED25519MONERO, 5, '5' ];
    const exceptedECC = [
      ...slip10Secp256k1, ...slip10Ed25519, ...slip10Nist256p1,
      ...kholawEd25519, ...slip10Ed25519Blake2b, ...slip10Ed25519Monero
    ];
    if (!exceptedECC.includes(curve)) {
      throw new DerivationError(
        `Bad ${this.getName()} ECC index`, {
          expected: exceptedECC, got: curve
        }
      );
    }
    if (slip10Secp256k1.includes(curve)) return nameOnly ? ECCS.SLIP10_SECP256K1 : 0;
    if (slip10Ed25519.includes(curve)) return nameOnly ? ECCS.SLIP10_ED25519 : 1;
    if (slip10Nist256p1.includes(curve)) return nameOnly ? ECCS.SLIP10_NIST256P1 : 2;
    if (kholawEd25519.includes(curve)) return nameOnly ? ECCS.KHOLAW_ED25519 : 3;
    if (slip10Ed25519Blake2b.includes(curve)) return nameOnly ? ECCS.SLIP10_ED25519BLAKE2B : 4;
    if (slip10Ed25519Monero.includes(curve)) return nameOnly ? ECCS.SLIP10_ED25519MONERO : 5;
  }

  private updateDerivation(): void {
    const [path, indexes, derivations] = normalizeDerivation(
      `m/${indexTupleToString(this.account)}/` +
      `${indexTupleToString(this.ecc)}/` +
      `${indexTupleToString(this.address)}`
    );
    this.derivations = derivations;
    this.indexes = indexes;
    this.path = path;
  }

  fromAccount(account: IndexType): this {
    this.account = normalizeIndex(account, true);
    this.updateDerivation();
    return this;
  }

  fromECC(ecc: string | number | EllipticCurveCryptography): this {
    this.ecc = normalizeIndex(this.getECCValue(ecc), false);
    this.updateDerivation();
    return this;
  }

  fromAddress(address: IndexType): this {
    this.address = normalizeIndex(address, false);
    this.updateDerivation();
    return this;
  }

  clean(): this {
    this.account = normalizeIndex(0, true);
    this.ecc = normalizeIndex(
      this.getECCValue(ECCS.SLIP10_SECP256K1), false
    );
    this.address = normalizeIndex(0, false);
    this.updateDerivation();
    return this;
  }

  getAccount(): number {
    return this.account.length === 3 ? this.account[1] : this.account[0];
  }

  getECC(nameOnly: boolean = true): string {
    return this.getECCValue(this.ecc[0], nameOnly);
  }

  getAddress(): number {
    return this.address.length === 3 ? this.address[1] : this.address[0];
  }
}
