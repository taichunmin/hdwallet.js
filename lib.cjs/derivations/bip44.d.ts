import { Derivation } from './derivation';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType, DerivationType, DerivationsType } from '../types';
export declare const CHANGES: {
    readonly EXTERNAL_CHAIN: "external-chain";
    readonly INTERNAL_CHAIN: "internal-chain";
};
export declare class BIP44Derivation extends Derivation {
    protected purpose: DerivationType;
    protected coinType: DerivationsType;
    protected account: DerivationsType;
    protected change: DerivationsType;
    protected address: DerivationsType;
    constructor(options?: DerivationOptionsInterface);
    static getName(): string;
    protected getChangeValue(change: IndexType, nameOnly?: boolean): any;
    protected updateDerivation(): void;
    fromCoinType(coinType: string | number): this;
    fromAccount(account: IndexType): this;
    fromChange(change: string | number): this;
    fromAddress(address: IndexType): this;
    clean(): this;
    getPurpose(): number;
    getCoinType(): number;
    getAccount(): number;
    getChange(nameOnly?: boolean): string;
    getAddress(): number;
}
//# sourceMappingURL=bip44.d.ts.map