import { Entropy } from '../entropy';
export declare const ELECTRUM_V2_ENTROPY_STRENGTHS: {
    readonly ONE_HUNDRED_THIRTY_TWO: 132;
    readonly TWO_HUNDRED_SIXTY_FOUR: 264;
};
export declare class ElectrumV2Entropy extends Entropy {
    static strengths: number[];
    static getName(): string;
    static generate(strength: number): string;
    static isValid(entropy: string): boolean;
    static isValidStrength(strength: number): boolean;
    static areEntropyBitsEnough(entropy: Uint8Array | number): boolean;
}
//# sourceMappingURL=v2.d.ts.map