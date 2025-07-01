import { Seed } from '../seeds';
import { PrivateKey, PublicKey } from '../eccs';
import { MoneroDerivation } from '../derivations';
import { HDAddressOptionsInterface, HDOptionsInterface } from '../interfaces';
import { Network } from '../cryptocurrencies/cryptocurrency';
import { HD } from './hd';
export declare class MoneroHD extends HD {
    protected network: Network;
    protected seed?: Uint8Array;
    protected privateKeyRaw?: Uint8Array;
    protected paymentID?: string;
    protected spendPrivateKey?: PrivateKey | null;
    protected viewPrivateKey: PrivateKey;
    protected spendPublicKey: PublicKey;
    protected viewPublicKey: PublicKey;
    constructor(options?: HDOptionsInterface);
    static getName(): string;
    fromSeed(seed: Uint8Array | string | Seed): this;
    fromPrivateKey(privateKey: string): this;
    fromDerivation(derivation: MoneroDerivation): this;
    updateDerivation(derivation: MoneroDerivation): this;
    cleanDerivation(): this;
    fromSpendPrivateKey(spendPrivateKey: string | Uint8Array): this;
    fromWatchOnly(viewPrivateKey: string, spendPublicKey: string): this;
    drive(minorIndex: number, majorIndex: number): [PublicKey, PublicKey];
    getSeed(): string | null;
    getPrivateKey(): string | null;
    getSpendPrivateKey(): string | null;
    getViewPrivateKey(): string;
    getSpendPublicKey(): string;
    getViewPublicKey(): string;
    getPrimaryAddress(): string;
    getIntegratedAddress(paymentID?: string): string | null;
    getSubAddress(minor?: number, major?: number): string;
    getAddress(options?: HDAddressOptionsInterface): string | null;
}
//# sourceMappingURL=monero.d.ts.map