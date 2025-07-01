import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
export declare abstract class Address {
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey | Object, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string | [string, string];
}
//# sourceMappingURL=address.d.ts.map