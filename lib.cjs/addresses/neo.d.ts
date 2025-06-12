import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class NeoAddress extends Address {
    static addressPrefix: Uint8Array<ArrayBufferLike>;
    static addressSuffix: Uint8Array<ArrayBufferLike>;
    static addressVersion: Uint8Array<ArrayBufferLike>;
    static alphabet: any;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=neo.d.ts.map