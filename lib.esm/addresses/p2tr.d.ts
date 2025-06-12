import { PublicKey, SLIP10Secp256k1Point } from '../eccs';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';
export declare class P2TRAddress extends Address {
    static hrp: string;
    static fieldSize: bigint;
    static tapTweakTagHash: Uint8Array;
    static witnessVersion: number;
    static getName(): string;
    static taggedHash(tag: string | Uint8Array, data: Uint8Array): Uint8Array;
    static hashTapTweak(pubKey: PublicKey): Uint8Array;
    static liftX(pubKey: PublicKey): SLIP10Secp256k1Point;
    static tweakPublicKey(pubKey: PublicKey): Uint8Array;
    static encode(publicKey: string | Uint8Array | PublicKey, options?: AddressOptionsInterface): string;
    static decode(address: string, options?: AddressOptionsInterface): string;
    private static modPow;
    private static modularSqrt;
}
//# sourceMappingURL=p2tr.d.ts.map