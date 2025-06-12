import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class FilecoinAddress extends Address {
    static alphabet: string;
    static addressPrefix: string;
    static addressType: string;
    static addressTypes: Record<string, number>;
    static getName(): string;
    static computeChecksum(pubKeyHash: Uint8Array, addressType: number): Uint8Array;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=filecoin.d.ts.map