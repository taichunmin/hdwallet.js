export declare function encodeWIF(privateKey: string | Uint8Array, wifPrefix?: number): [string, string];
export declare function decodeWIF(wif: string, wifPrefix?: number): [Uint8Array, string, Uint8Array];
export declare function privateKeyToWIF(privateKey: string | Uint8Array, wifType?: string, wifPrefix?: number): string;
export declare function wifToPrivateKey(wif: string, wifPrefix?: number): string;
export declare function getWIFType(wif: string, wifPrefix?: number): string;
export declare function getWIFChecksum(wif: string, wifPrefix?: number): string;
//# sourceMappingURL=wif.d.ts.map