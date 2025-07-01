import { Derivation } from './derivation';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType } from '../types';
export declare class MoneroDerivation extends Derivation {
    private minor;
    private major;
    constructor(options?: DerivationOptionsInterface);
    static getName(): string;
    private updateDerivation;
    fromMinor(minor: IndexType): this;
    fromMajor(major: IndexType): this;
    clean(): this;
    getMinor(): number;
    getMajor(): number;
}
//# sourceMappingURL=monero.d.ts.map