export declare function serialize(version: string | Uint8Array | number, depth: number, parentFingerprint: string | Uint8Array, index: number, chainCode: string | Uint8Array, key: string | Uint8Array, encoded?: boolean): string | null;
export declare function deserialize(key: string, encoded?: boolean): [Uint8Array, number, Uint8Array, number, Uint8Array, Uint8Array];
export declare function isValidKey(key: string, encoded?: boolean): boolean;
export declare function isRootKey(key: string, encoded?: boolean): boolean;
//# sourceMappingURL=keys.d.ts.map