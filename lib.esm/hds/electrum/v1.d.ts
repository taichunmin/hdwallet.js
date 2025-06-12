import { HD } from '../hd';
import { ElectrumDerivation } from '../../derivations';
import { PublicKey, PrivateKey } from '../../eccs';
import { Seed } from '../../seeds';
import { HDAddressOptionsInterface, HDOptionsInterface } from '../../interfaces';
export declare class ElectrumV1HD extends HD {
    protected seed?: Uint8Array;
    protected masterPrivateKey?: PrivateKey;
    protected masterPublicKey: PublicKey;
    protected privateKey?: PrivateKey;
    protected publicKey: PublicKey;
    protected publicKeyType: string;
    protected wifType: string;
    protected wifPrefix?: number;
    constructor(options?: HDOptionsInterface);
    static getName(): string;
    fromSeed(seed: Uint8Array | string | Seed): this;
    fromPrivateKey(key: Uint8Array | string): this;
    fromWIF(wif: string): this;
    fromPublicKey(key: Uint8Array | string): this;
    fromDerivation(derivation: ElectrumDerivation): this;
    updateDerivation(derivation: ElectrumDerivation): this;
    cleanDerivation(): this;
    drive(changeIndex: number, addressIndex: number): this;
    getSeed(): string | null;
    getMasterPrivateKey(): string | null;
    getMasterWIF(wifType?: string): string | null;
    getMasterPublicKey(publicKeyType?: string): string;
    getPrivateKey(): string | null;
    getWIF(wifType?: string): string | null;
    getWIFType(): string;
    getPublicKey(publicKeyType?: string): string;
    getPublicKeyType(): string;
    getCompressed(): string;
    getUncompressed(): string;
    getAddress(options?: HDAddressOptionsInterface): string;
}
//# sourceMappingURL=v1.d.ts.map