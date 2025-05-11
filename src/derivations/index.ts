// SPDX-License-Identifier: MIT

import { Derivation } from './derivation';
import { CustomDerivation } from './custom';
import { BIP44Derivation, CHANGES } from './bip44';
import { BIP49Derivation } from './bip49';
import { BIP84Derivation } from './bip84';
import { BIP86Derivation } from './bip86';
import { CIP1852Derivation, ROLES } from './cip1852';
import { ElectrumDerivation } from './electrum';
import { MoneroDerivation } from './monero';
import { HDWDerivation, ECCS } from './hdw';
import { DerivationError } from '../exceptions';

export class DERIVATIONS {

  static dictionary: Record<string, typeof Derivation> = {
    'Custom': CustomDerivation,
    'BIP44': BIP44Derivation,
    'BIP49': BIP49Derivation,
    'BIP84': BIP84Derivation,
    'BIP86': BIP86Derivation,
    'CIP1852': CIP1852Derivation,
    'Electrum': ElectrumDerivation,
    'Monero': MoneroDerivation,
    'HDW': HDWDerivation
  };

  static getNames(): string[] {
    return Object.keys(this.dictionary);
  }

  static getClasses(): typeof Derivation[] {
    return Object.values(this.dictionary);
  }

  static getDerivationClass(name: string): typeof Derivation | any {
    if (!this.isDerivation(name)) {
      throw new DerivationError('Invalid derivation name', {
        expected: this.getNames(), got: name
      });
    }
    return this.dictionary[name];
  }

  static isDerivation(name: string): boolean {
    return this.dictionary.hasOwnProperty(name);
  }
}

export {
  Derivation,
  CustomDerivation,
  BIP44Derivation, CHANGES,
  BIP49Derivation,
  BIP84Derivation,
  BIP86Derivation,
  CIP1852Derivation, ROLES,
  ElectrumDerivation,
  MoneroDerivation,
  HDWDerivation, ECCS
};
