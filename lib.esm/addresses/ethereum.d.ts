import { PublicKey } from '../eccs';
import { Address } from './address';
import { AddressOptionsInterface } from '../interfaces';
export declare class EthereumAddress extends Address {
    static addressPrefix: string;
    static getName(): string;
    static checksumEncode(address: string): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=ethereum.d.ts.map