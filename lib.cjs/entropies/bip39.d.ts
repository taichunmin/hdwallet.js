import { Entropy } from './entropy';
export declare const BIP39_ENTROPY_STRENGTHS: {
    readonly ONE_HUNDRED_TWENTY_EIGHT: 128;
    readonly ONE_HUNDRED_SIXTY: 160;
    readonly ONE_HUNDRED_NINETY_TWO: 192;
    readonly TWO_HUNDRED_TWENTY_FOUR: 224;
    readonly TWO_HUNDRED_FIFTY_SIX: 256;
};
export declare class BIP39Entropy extends Entropy {
    static strengths: (256 | 128 | 160 | 192 | 224)[];
    static getName(): string;
}
//# sourceMappingURL=bip39.d.ts.map