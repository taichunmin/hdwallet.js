export declare class Entropy {
    protected entropy: string;
    protected strength: number;
    static strengths: number[];
    constructor(entropy: string);
    static getName(): string;
    getName(): string;
    getEntropy(): string;
    getStrength(): number;
    static generate(strength: number): string;
    static isValid(entropy: string): boolean;
    static isValidStrength(strength: number): boolean;
    static isValidBytesStrength(bytesStrength: number): boolean;
    static areEntropyBitsEnough(entropy: Uint8Array | number): boolean;
}
//# sourceMappingURL=entropy.d.ts.map