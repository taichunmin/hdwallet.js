import { Derivation } from './derivation';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType } from '../types';
export declare class ElectrumDerivation extends Derivation {
    private change;
    private address;
    constructor(options?: DerivationOptionsInterface);
    static getName(): string;
    private updateDerivation;
    fromChange(change: IndexType): this;
    fromAddress(address: IndexType): this;
    clean(): this;
    getChange(): number;
    getAddress(): number;
}
//# sourceMappingURL=electrum.d.ts.map