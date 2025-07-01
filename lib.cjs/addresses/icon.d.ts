import { PublicKey } from '../eccs';
import { Address } from './address';
export declare class IconAddress extends Address {
    static addressPrefix: string;
    static keyHashLength: number;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey): string;
    static decode(address: string): string;
}
//# sourceMappingURL=icon.d.ts.map