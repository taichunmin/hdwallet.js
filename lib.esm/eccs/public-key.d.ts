import { Point } from './point';
export declare abstract class PublicKey {
    publicKey: any;
    constructor(publicKey: any);
    getName(): string;
    static fromBytes(publicKey: Uint8Array): PublicKey;
    static fromPoint(point: Point): PublicKey;
    abstract getRawCompressed(): Uint8Array;
    abstract getRawUncompressed(): Uint8Array;
    abstract getPoint(): Point;
    abstract getUnderlyingObject(): any;
    static getCompressedLength(): number;
    static getUncompressedLength(): number;
    static isValidBytes(bytes: Uint8Array): boolean;
    static isValidPoint(point: Point): boolean;
}
//# sourceMappingURL=public-key.d.ts.map