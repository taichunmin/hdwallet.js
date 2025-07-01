import { DerivationOptionsInterface } from '../interfaces';
import { DerivationsType, DerivationType } from '../types';
export declare class Derivation {
    path: string;
    indexes: number[];
    derivations: DerivationsType[];
    protected purpose: DerivationType;
    constructor(options?: DerivationOptionsInterface);
    static getName(): string;
    getName(): string;
    clean(): this;
    getPath(): string;
    getIndexes(): number[];
    getDerivations(): DerivationsType[];
    getDepth(): number;
    getPurpose(): number;
    getCoinType(): number;
    getAccount(): number;
    getChange(...args: any[]): string | number;
    getRole(...args: any[]): string;
    getAddress(): number;
    getMinor(): number;
    getMajor(): number;
}
//# sourceMappingURL=derivation.d.ts.map