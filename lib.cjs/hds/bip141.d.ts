import { BIP141HDSemanticOptionsInterface, HDAddressOptionsInterface, HDOptionsInterface } from '../interfaces';
import { BIP32HD } from './bip32';
export declare class BIP141HD extends BIP32HD {
    protected address: string;
    protected xprivateKeyVersion: number | Uint8Array;
    protected xpublicKeyVersion: number | Uint8Array;
    protected semantic: string;
    constructor(options?: HDOptionsInterface);
    static getName(): string;
    getSemantic(): string;
    fromSemantic(semantic: string, options?: BIP141HDSemanticOptionsInterface): this;
    getRootXPrivateKey(version?: number | Uint8Array, encoded?: boolean): string | null;
    getRootXPublicKey(version?: number | Uint8Array, encoded?: boolean): string | null;
    getXPrivateKey(version?: number | Uint8Array, encoded?: boolean): string | null;
    getXPublicKey(version?: number | Uint8Array, encoded?: boolean): string | null;
    getAddress(options?: HDAddressOptionsInterface): string;
}
//# sourceMappingURL=bip141.d.ts.map