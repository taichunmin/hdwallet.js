import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class P2SHAddress extends Address {
    static scriptAddressPrefix: number;
    static alphabet: string;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=p2sh.d.ts.map