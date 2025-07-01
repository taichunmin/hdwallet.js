export declare function baseBech32Encode(hrp: string, data: number[]): string;
export declare function baseBech32Decode(bech: string): [string | null, number[] | null];
export declare function bech32Encode(hrp: string, witprog: number[]): string | null;
export declare function bech32Decode(hrp: string, addr: string): [number | null, number[] | null];
export declare function segwitEncode(hrp: string, witver: number, witprog: Uint8Array): string;
export declare function segwitDecode(hrp: string, addr: string): [number | null, Uint8Array | null];
//# sourceMappingURL=segwit-bech32.d.ts.map