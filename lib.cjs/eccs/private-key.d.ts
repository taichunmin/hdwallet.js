import { PublicKey } from './public-key';
import { OptionsPrivateKey } from '../interfaces';
export declare abstract class PrivateKey {
    privateKey: any;
    options: OptionsPrivateKey;
    constructor(privateKey: any, options?: OptionsPrivateKey);
    getName(): string;
    static fromBytes(privateKey: Uint8Array): PrivateKey;
    static getLength(): number;
    abstract getRaw(): Uint8Array;
    abstract getPublicKey(): PublicKey;
    abstract getUnderlyingObject(): any;
    static isValidBytes(bytes: Uint8Array): boolean;
}
//# sourceMappingURL=private-key.d.ts.map