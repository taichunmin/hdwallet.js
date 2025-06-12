import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class MoneroAddress extends Address {
    static checksumLength: number;
    static paymentIDLength: number;
    static network: string;
    static addressType: string;
    static networks: Record<string, {
        addressTypes: Record<string, number>;
    }>;
    static getName(): string;
    static computeChecksum(data: Uint8Array): Uint8Array;
    static encode(publicKeys: {
        spendPublicKey: Uint8Array | string | PublicKey;
        viewPublicKey: Uint8Array | string | PublicKey;
    }, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): [string, string];
}
//# sourceMappingURL=monero.d.ts.map