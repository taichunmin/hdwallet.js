import { PublicKey } from '../eccs';
import { Address } from './address';
export declare class AlgorandAddress extends Address {
    static checksumLength: number;
    static getName(): string;
    static computeChecksum(publicKey: Uint8Array): Uint8Array;
    static encode(publicKey: Uint8Array | string | PublicKey): string;
    static decode(address: string): string;
}
//# sourceMappingURL=algorand.d.ts.map