import { PublicKey } from '../eccs';
import { Address } from './address';
export declare class NanoAddress extends Address {
    static addressPrefix: string;
    static alphabet: string;
    static payloadPaddingDecoded: Uint8Array;
    static payloadPaddingEncoded: string;
    static getName(): string;
    static computeChecksum(publicKey: Uint8Array): Uint8Array;
    static encode(publicKey: Uint8Array | string | PublicKey): string;
    static decode(address: string): string;
}
//# sourceMappingURL=nano.d.ts.map