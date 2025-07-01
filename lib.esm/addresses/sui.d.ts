import { PublicKey } from '../eccs';
import { Address } from './address';
export declare class SuiAddress extends Address {
    static keyType: Uint8Array;
    static addressPrefix: string;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey): string;
    static decode(address: string): string;
}
//# sourceMappingURL=sui.d.ts.map