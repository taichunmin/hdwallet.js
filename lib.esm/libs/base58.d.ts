export declare function checksumEncode(address: string, crypto?: 'eth' | 'xdc'): string;
export declare function encode(data: Uint8Array | string, alphabet?: string): string;
export declare function checkEncode(raw: Uint8Array | string, alphabet?: string): string;
export declare function decode(input: string, alphabet?: string): Uint8Array;
export declare function checkDecode(enc: string, alphabet?: string): Uint8Array;
export declare function pad(enc: string, padLen: number, alphabet?: string): string;
export declare function encodeMonero(data: Uint8Array): string;
export declare function decodeMonero(data: string): Uint8Array;
//# sourceMappingURL=base58.d.ts.map