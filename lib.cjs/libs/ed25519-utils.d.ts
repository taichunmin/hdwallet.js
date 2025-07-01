export declare function intDecode(le: Uint8Array): bigint;
export declare function intEncode(x: bigint): Uint8Array;
export declare function pointAdd(p1: Uint8Array, p2: Uint8Array): Uint8Array;
export declare function pointScalarMul(k: Uint8Array | number | bigint, point: Uint8Array): Uint8Array;
export declare function pointScalarMulBase(k: Uint8Array | number | bigint): Uint8Array;
export declare function scalarReduce(s: Uint8Array | number | bigint): Uint8Array;
//# sourceMappingURL=ed25519-utils.d.ts.map