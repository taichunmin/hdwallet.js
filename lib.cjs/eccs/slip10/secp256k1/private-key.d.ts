import { PrivateKey } from '../../private-key';
import { PublicKey } from '../../public-key';
export declare class SLIP10Secp256k1PrivateKey extends PrivateKey {
    getName(): string;
    static fromBytes(privateKey: Uint8Array): PrivateKey;
    static getLength(): number;
    getRaw(): Uint8Array;
    getUnderlyingObject(): any;
    getPublicKey(): PublicKey;
}
//# sourceMappingURL=private-key.d.ts.map