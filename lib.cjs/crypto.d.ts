export declare function hmacSha256(key: Uint8Array | string, data: Uint8Array | string): Uint8Array;
export declare function hmacSha512(key: Uint8Array | string, data: Uint8Array | string): Uint8Array;
export declare function blake2b(data: Uint8Array | string, digestSize: number, key?: Uint8Array | string, salt?: Uint8Array | string, personalize?: Uint8Array | string): Uint8Array;
export declare const blake2b32: (d: any, k?: any, s?: any) => Uint8Array<ArrayBufferLike>;
export declare const blake2b40: (d: any, k?: any, s?: any) => Uint8Array<ArrayBufferLike>;
export declare const blake2b160: (d: any, k?: any, s?: any) => Uint8Array<ArrayBufferLike>;
export declare const blake2b224: (d: any, k?: any, s?: any) => Uint8Array<ArrayBufferLike>;
export declare const blake2b256: (d: any, k?: any, s?: any) => Uint8Array<ArrayBufferLike>;
export declare const blake2b512: (d: any, k?: any, s?: any) => Uint8Array<ArrayBufferLike>;
export declare function chacha20Poly1305Encrypt(key: Uint8Array | string, nonce: Uint8Array | string, aad: Uint8Array | string, plaintext: Uint8Array | string): {
    cipherText: Uint8Array;
    tag: Uint8Array;
};
export declare function chacha20Poly1305Decrypt(key: Uint8Array | string, nonce: Uint8Array | string, aad: Uint8Array | string, ciphertext: Uint8Array | string, tag: Uint8Array | string): Uint8Array;
export declare function sha256(data: Uint8Array | string): Uint8Array;
export declare const doubleSha256: (d: any) => Uint8Array<ArrayBufferLike>;
export declare function sha512(data: Uint8Array | string): Uint8Array;
export declare function sha512_256(data: Uint8Array | string): Uint8Array;
export declare function keccak256(data: Uint8Array | string): Uint8Array;
export declare function sha3_256(data: Uint8Array | string): Uint8Array;
export declare function ripemd160(data: Uint8Array | string): Uint8Array;
export declare function hash160(data: Uint8Array | string): Uint8Array;
export declare function crc32(data: Uint8Array | string): Uint8Array;
export declare function xmodemCrc(data: Uint8Array | string): Uint8Array;
export declare function pbkdf2HmacSha512(password: Uint8Array | string, salt: Uint8Array | string, iterations: number, keyLen?: number): Uint8Array;
export declare const getChecksum: (d: any) => Uint8Array;
//# sourceMappingURL=crypto.d.ts.map