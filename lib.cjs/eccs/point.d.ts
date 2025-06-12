export declare abstract class Point {
    point: any;
    constructor(point: any);
    abstract getName(): string;
    static fromBytes(point: Uint8Array): Point;
    static fromCoordinates(x: bigint, y: bigint): Point;
    abstract getX(): bigint;
    abstract getY(): bigint;
    getRaw(): Uint8Array;
    abstract getRawEncoded(): Uint8Array;
    abstract getRawDecoded(): Uint8Array;
    abstract getUnderlyingObject(): any;
    abstract add(point: Point): Point;
    abstract multiply(scalar: bigint): Point;
}
//# sourceMappingURL=point.d.ts.map