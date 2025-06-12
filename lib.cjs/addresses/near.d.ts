import { PublicKey } from '../eccs';
import { Address } from './address';
export declare class NearAddress extends Address {
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey): string;
    static decode(address: string): string;
}
//# sourceMappingURL=near.d.ts.map