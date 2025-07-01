import { Derivation } from './derivation';
import { CustomDerivation } from './custom';
import { BIP44Derivation, CHANGES } from './bip44';
import { BIP49Derivation } from './bip49';
import { BIP84Derivation } from './bip84';
import { BIP86Derivation } from './bip86';
import { CIP1852Derivation, ROLES } from './cip1852';
import { ElectrumDerivation } from './electrum';
import { MoneroDerivation } from './monero';
import { HDWDerivation } from './hdw';
export declare class DERIVATIONS {
    static dictionary: Record<string, typeof Derivation>;
    static getNames(): string[];
    static getClasses(): typeof Derivation[];
    static getDerivationClass(name: string): typeof Derivation | any;
    static isDerivation(name: string): boolean;
}
export { Derivation, CustomDerivation, BIP44Derivation, CHANGES, BIP49Derivation, BIP84Derivation, BIP86Derivation, CIP1852Derivation, ROLES, ElectrumDerivation, MoneroDerivation, HDWDerivation };
//# sourceMappingURL=index.d.ts.map