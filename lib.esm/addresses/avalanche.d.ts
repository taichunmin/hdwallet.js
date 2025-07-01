import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class AvalancheAddress extends Address {
    static hrp: string;
    static addressType: string;
    static addressTypes: Record<string, string>;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=avalanche.d.ts.map