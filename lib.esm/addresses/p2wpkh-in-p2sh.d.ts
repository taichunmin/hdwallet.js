import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
import { P2SHAddress } from './p2sh';
export declare class P2WPKHInP2SHAddress extends P2SHAddress implements Address {
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
}
//# sourceMappingURL=p2wpkh-in-p2sh.d.ts.map