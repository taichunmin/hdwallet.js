import { HD } from '../hd';
import { ElectrumDerivation } from '../../derivations';
import { BIP32HD } from '../bip32';
import { Seed } from '../../seeds';
import { HDAddressOptionsInterface, HDOptionsInterface } from '../../interfaces';
export declare class ElectrumV2HD extends HD {
    protected mode: string;
    protected wifType: string;
    protected publicKeyType: string;
    protected wifPrefix?: number;
    protected bip32HD: BIP32HD;
    constructor(options?: HDOptionsInterface);
    static getName(): string;
    fromSeed(seed: Uint8Array | string | Seed): this;
    fromDerivation(derivation: ElectrumDerivation): this;
    updateDerivation(derivation: ElectrumDerivation): this;
    cleanDerivation(): this;
    drive(changeIndex: number, addressIndex: number): this;
    getMode(): string;
    getSeed(): string | null;
    getMasterPrivateKey(): string | null;
    getMasterWIF(wifType?: string): string | null;
    getMasterPublicKey(publicKeyType?: string): string;
    getPrivateKey(): string | null;
    getWIF(wifType?: string): string | null;
    getWIFType(): string;
    getPublicKey(publicKeyType?: string): string;
    getPublicKeyType(): string;
    getUncompressed(): string;
    getCompressed(): string;
    getAddress(options?: HDAddressOptionsInterface): string;
}
//# sourceMappingURL=v2.d.ts.map