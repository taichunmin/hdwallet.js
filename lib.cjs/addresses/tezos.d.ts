import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class TezosAddress extends Address {
    static addressPrefix: any;
    static addressPrefixes: Record<string, Uint8Array>;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=tezos.d.ts.map