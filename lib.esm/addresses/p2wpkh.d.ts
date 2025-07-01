import { PublicKey } from '../eccs';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';
export declare class P2WPKHAddress extends Address {
    static hrp: string;
    static witnessVersion: number;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=p2wpkh.d.ts.map