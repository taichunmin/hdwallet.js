import { EllipticCurveCryptography as _EllipticCurveCryptography, Point as _Point, PublicKey as _PublicKey, PrivateKey as _PrivateKey } from './ecc';
import { KholawEd25519ECC as _KholawEd25519ECC } from './kholaw';
import { SLIP10Ed25519ECC as _SLIP10Ed25519ECC, SLIP10Ed25519Blake2bECC as _SLIP10Ed25519Blake2bECC, SLIP10Ed25519MoneroECC as _SLIP10Ed25519MoneroECC, SLIP10Nist256p1ECC as _SLIP10Nist256p1ECC, SLIP10Secp256k1ECC as _SLIP10Secp256k1ECC } from './slip10';
export declare class ECCS {
    private static dictionary;
    static getNames(): string[];
    static getClasses(): typeof _EllipticCurveCryptography[];
    static getECCClass(name: string): typeof _EllipticCurveCryptography | any;
    static isECC(name: string): boolean;
}
export declare function validateAndGetPublicKey(publicKey: Uint8Array | string | _PublicKey, publicKeyCls: typeof _PublicKey): _PublicKey;
export { _EllipticCurveCryptography as EllipticCurveCryptography, _Point as Point, _PublicKey as PublicKey, _PrivateKey as PrivateKey, _KholawEd25519ECC as KholawEd25519ECC, _SLIP10Ed25519ECC as SLIP10Ed25519ECC, _SLIP10Ed25519Blake2bECC as SLIP10Ed25519Blake2bECC, _SLIP10Ed25519MoneroECC as SLIP10Ed25519MoneroECC, _SLIP10Nist256p1ECC as SLIP10Nist256p1ECC, _SLIP10Secp256k1ECC as SLIP10Secp256k1ECC };
export { KholawEd25519Point, KholawEd25519PublicKey, KholawEd25519PrivateKey } from './kholaw';
export { SLIP10Ed25519Point, SLIP10Ed25519PublicKey, SLIP10Ed25519PrivateKey, SLIP10Ed25519Blake2bPoint, SLIP10Ed25519Blake2bPublicKey, SLIP10Ed25519Blake2bPrivateKey, SLIP10Ed25519MoneroPoint, SLIP10Ed25519MoneroPublicKey, SLIP10Ed25519MoneroPrivateKey, SLIP10Nist256p1Point, SLIP10Nist256p1PublicKey, SLIP10Nist256p1PrivateKey, SLIP10Secp256k1Point, SLIP10Secp256k1PublicKey, SLIP10Secp256k1PrivateKey } from './slip10';
//# sourceMappingURL=index.d.ts.map