import { PublicKey } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class CardanoAddress extends Address {
    static readonly addressTypes: any;
    static readonly networkTypes: any;
    static readonly prefixTypes: any;
    static readonly paymentAddressHrp: any;
    static readonly rewardAddressHrp: any;
    static readonly chacha20Poly1305AssociatedData: Uint8Array<ArrayBuffer>;
    static readonly chacha20Poly1305Nonce: Uint8Array<ArrayBufferLike>;
    static readonly payloadTag = 24;
    static getName(): string;
    static encode(publicKey: Uint8Array | string | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
    static encodeByron(publicKey: PublicKey, chainCode: Uint8Array, addressAttributes: any, addressType?: string): string;
    static encodeByronIcarus(publicKey: Uint8Array | string | PublicKey, chainCode: Uint8Array | string, addressType?: string): string;
    static encodeByronLegacy(publicKey: Uint8Array | string | PublicKey, path: string, pathKey: Uint8Array | string, chainCode: Uint8Array | string, addressType?: string): string;
    static decodeByron(address: string, addressType?: string): string;
    static decodeByronIcarus(address: string, addressType?: string): string;
    static decodeByronLegacy(address: string, addressType?: string): string;
    static encodeShelley(publicKey: Uint8Array | string | PublicKey, stakingPublicKey: Uint8Array | string | PublicKey, network: string): string;
    static decodeShelley(address: string, network: string): string;
    static encodeShelleyStaking(publicKey: Uint8Array | string | PublicKey, network: string): string;
    static decodeShelleyStaking(address: string, network: string): string;
}
//# sourceMappingURL=cardano.d.ts.map