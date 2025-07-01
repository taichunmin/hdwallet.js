import { PublicKey } from '../eccs';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';
export declare class ErgoAddress extends Address {
    static checksumLength: number;
    static addressType: string;
    static addressTypes: Record<string, number>;
    static networkType: string;
    static networkTypes: Record<string, number>;
    static getName(): string;
    static computeChecksum(data: Uint8Array): Uint8Array;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=ergo.d.ts.map