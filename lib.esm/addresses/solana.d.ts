import { PublicKey } from '../eccs';
import { Address } from './address';
export declare class SolanaAddress extends Address {
    static alphabet: string;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey): string;
    static decode(address: string): string;
}
//# sourceMappingURL=solana.d.ts.map