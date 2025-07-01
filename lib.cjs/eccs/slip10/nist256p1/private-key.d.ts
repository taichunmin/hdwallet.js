import { PrivateKey } from '../../private-key';
import { PublicKey } from '../../public-key';
export declare class SLIP10Nist256p1PrivateKey extends PrivateKey {
    getName(): string;
    static fromBytes(privateKey: Uint8Array): SLIP10Nist256p1PrivateKey;
    static getLength(): number;
    getRaw(): Uint8Array;
    getUnderlyingObject(): any;
    getPublicKey(): PublicKey;
}
//# sourceMappingURL=private-key.d.ts.map