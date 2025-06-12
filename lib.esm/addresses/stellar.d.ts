import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class StellarAddress extends Address {
    static checksumLength: number;
    static addressType: any;
    static addressTypes: Record<string, number>;
    static getName(): string;
    static computeChecksum(payload: Uint8Array): Uint8Array;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=stellar.d.ts.map