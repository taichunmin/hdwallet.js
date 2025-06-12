import { BIP44Derivation } from './bip44';
import { DerivationType } from '../types';
import { DerivationOptionsInterface } from '../interfaces';
export declare class BIP49Derivation extends BIP44Derivation {
    protected purpose: DerivationType;
    constructor(options?: DerivationOptionsInterface);
    static getName(): string;
}
//# sourceMappingURL=bip49.d.ts.map