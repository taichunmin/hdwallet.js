import { Derivation } from './derivation';
import { EllipticCurveCryptography } from '../eccs';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType } from '../types';
export declare class HDWDerivation extends Derivation {
    private account;
    private ecc;
    private address;
    constructor(options?: DerivationOptionsInterface);
    static getName(): string;
    protected getECCValue(ecc: IndexType | EllipticCurveCryptography, nameOnly?: boolean): any;
    private updateDerivation;
    fromAccount(account: IndexType): this;
    fromECC(ecc: string | number | EllipticCurveCryptography): this;
    fromAddress(address: IndexType): this;
    clean(): this;
    getAccount(): number;
    getECC(nameOnly?: boolean): string;
    getAddress(): number;
}
//# sourceMappingURL=hdw.d.ts.map