import { BIP44Derivation, CHANGES } from './bip44';
import { BIP49Derivation } from './bip49';
import { BIP84Derivation } from './bip84';
import { BIP86Derivation } from './bip86';
import { CustomDerivation } from './custom';
import { ElectrumDerivation } from './electrum';
import { MoneroDerivation } from './monero';
import { HDWDerivation } from './hdw';
import { Derivation } from './derivation';
import { DerivationError } from '../exceptions';
import { CIP1852Derivation, ROLES } from './cip1852';

export class DERIVATIONS {
  static dictionary: Record<string, typeof Derivation> = {
    [new BIP44Derivation().getName()]:   BIP44Derivation,
    [new BIP49Derivation().getName()]:   BIP49Derivation,
    [new BIP84Derivation().getName()]:   BIP84Derivation,
    [new BIP86Derivation().getName()]:   BIP86Derivation,
    [new CIP1852Derivation().getName()]: CIP1852Derivation,
    [new CustomDerivation().getName()]:  CustomDerivation,
    [new ElectrumDerivation().getName()]: ElectrumDerivation,
    [new MoneroDerivation().getName()]:  MoneroDerivation,
    [new HDWDerivation().getName()]:     HDWDerivation
  };

  static getNames(): string[] {
    return Object.keys(DERIVATIONS.dictionary);
  }

  static getClasses(): Array<typeof Derivation> {
    return Object.values(DERIVATIONS.dictionary);
  }

  static getDerivationClass(name: string): typeof Derivation {
    if (!DERIVATIONS.isDerivation(name)) {
      throw new DerivationError('Invalid derivation name', { expected: DERIVATIONS.getNames(), got: name });
    }
    return DERIVATIONS.dictionary[name];
  }

  static isDerivation(name: string): boolean {
    return DERIVATIONS.dictionary.hasOwnProperty(name);
  }
}

export {
  BIP44Derivation, CHANGES,
  BIP49Derivation,
  BIP84Derivation,
  BIP86Derivation,
  CIP1852Derivation, ROLES,
  CustomDerivation,
  ElectrumDerivation,
  MoneroDerivation,
  HDWDerivation,
};
