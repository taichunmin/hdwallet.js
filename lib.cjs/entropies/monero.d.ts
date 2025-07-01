import { Entropy } from './entropy';
export declare const MONERO_ENTROPY_STRENGTHS: {
    readonly ONE_HUNDRED_TWENTY_EIGHT: 128;
    readonly TWO_HUNDRED_FIFTY_SIX: 256;
};
export declare class MoneroEntropy extends Entropy {
    static strengths: (256 | 128)[];
    static getName(): string;
}
//# sourceMappingURL=monero.d.ts.map