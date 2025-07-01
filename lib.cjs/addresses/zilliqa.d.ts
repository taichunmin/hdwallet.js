import { PublicKey } from '../eccs';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';
export declare class ZilliqaAddress extends Address {
    static readonly hrp: string;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=zilliqa.d.ts.map