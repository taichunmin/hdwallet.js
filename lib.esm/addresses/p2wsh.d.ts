import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
import { P2WPKHAddress } from './p2wpkh';
export declare class P2WSHAddress extends P2WPKHAddress implements Address {
    static witnessVersion: number;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=p2wsh.d.ts.map