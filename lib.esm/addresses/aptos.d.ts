import { PublicKey } from '../eccs';
import { Address } from './address';
export declare class AptosAddress extends Address {
    static suffix: Uint8Array;
    static addressPrefix: string;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey): string;
    static decode(address: string): string;
}
//# sourceMappingURL=aptos.d.ts.map