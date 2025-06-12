import { BIP32HD } from './bip32';
import { HDAddressOptionsInterface, HDOptionsInterface } from '../interfaces';
import { Seed } from '../seeds';
export declare class CardanoHD extends BIP32HD {
    protected cardanoType: string;
    constructor(options?: HDOptionsInterface);
    static getName(): string;
    fromSeed(seed: string | Seed, passphrase?: string): this;
    fromPrivateKey(privateKey: string): this;
    fromPublicKey(publicKey: string): this;
    drive(index: number): this;
    getRootXPrivateKey(version?: Uint8Array | number, encoded?: boolean): string | null;
    getXPrivateKey(version?: Uint8Array | number, encoded?: boolean): string | null;
    getPathKey(): string | null;
    getAddress(options?: HDAddressOptionsInterface): string;
}
//# sourceMappingURL=cardano.d.ts.map