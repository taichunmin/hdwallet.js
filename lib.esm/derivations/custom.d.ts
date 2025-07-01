import { Derivation } from './derivation';
export declare class CustomDerivation extends Derivation {
    static getName(): string;
    fromPath(path: string): this;
    fromIndexes(indexes: number[]): this;
    fromIndex(index: number, hardened?: boolean): this;
    clean(): this;
}
//# sourceMappingURL=custom.d.ts.map