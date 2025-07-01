import { Derivation } from './derivation';
import { DerivationOptionsInterface } from '../interfaces';
import { IndexType, DerivationType } from '../types';
export declare const ROLES: {
    readonly EXTERNAL_CHAIN: "external-chain";
    readonly INTERNAL_CHAIN: "internal-chain";
    readonly STAKING_KEY: "staking-key";
};
export declare class CIP1852Derivation extends Derivation {
    protected purpose: DerivationType;
    private coinType;
    private account;
    private role;
    private address;
    constructor(options?: DerivationOptionsInterface);
    static getName(): string;
    protected getRoleValue(role: IndexType, nameOnly?: boolean): any;
    private updateDerivation;
    fromCoinType(coinType: string | number): this;
    fromAccount(account: IndexType): this;
    fromRole(role: string | number): this;
    fromAddress(address: IndexType): this;
    clean(): this;
    getPurpose(): number;
    getCoinType(): number;
    getAccount(): number;
    getRole(nameOnly?: boolean): string;
    getAddress(): number;
}
//# sourceMappingURL=cip1852.d.ts.map