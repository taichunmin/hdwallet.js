import { PrivateKey } from '../../private-key';
import { SLIP10Ed25519PrivateKey } from '../../slip10';
import { OptionsPrivateKey } from '../../../interfaces';
import { PublicKey } from '../../public-key';
export declare class KholawEd25519PrivateKey extends SLIP10Ed25519PrivateKey {
    constructor(privateKey: Uint8Array, options: OptionsPrivateKey);
    getName(): string;
    static fromBytes(privateKey: Uint8Array): PrivateKey;
    static getLength(): number;
    getRaw(): Uint8Array;
    getPublicKey(): PublicKey;
}
//# sourceMappingURL=private-key.d.ts.map