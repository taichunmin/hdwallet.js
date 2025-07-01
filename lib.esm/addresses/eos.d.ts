import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class EOSAddress extends Address {
    static addressPrefix: string;
    static checksumLength: number;
    static getName(): string;
    static computeChecksum(pubKeyBytes: Uint8Array): Uint8Array;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=eos.d.ts.map