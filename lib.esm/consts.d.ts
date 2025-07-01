export declare class NestedNamespace {
    [key: string]: any;
    constructor(data: Set<string> | any[] | Record<string, any>);
}
export declare const SLIP10_ED25519_CONST: Record<string, any>;
export declare const KHOLAW_ED25519_CONST: Record<string, any>;
export declare const SLIP10_SECP256K1_CONST: Record<string, any>;
export declare class Info extends NestedNamespace {
    SOURCE_CODE?: string;
    WHITEPAPER?: string;
    WEBSITES: string[];
    constructor(data: Record<string, any>);
}
export declare class WitnessVersions extends NestedNamespace {
    getWitnessVersion(address: string): number | undefined;
}
export declare class Entropies extends NestedNamespace {
    isEntropy(entropy: string): boolean;
    getEntropies(): string[];
}
export declare class Mnemonics extends NestedNamespace {
    isMnemonic(mnemonic: string): boolean;
    getMnemonics(): string[];
}
export declare class Seeds extends NestedNamespace {
    isSeed(seed: string): boolean;
    getSeeds(): string[];
}
export declare class HDs extends NestedNamespace {
    isHD(hd: string): boolean;
    getHDS(): string[];
}
export declare class Addresses extends NestedNamespace {
    isAddress(address: string): boolean;
    getAddresses(): string[];
    length(): number;
}
export declare class AddressTypes extends NestedNamespace {
    isAddressType(addressType: string): boolean;
    getAddressTypes(): string[];
}
export declare class AddressPrefixes extends NestedNamespace {
    isAddressPrefix(addressPrefix: string): boolean;
    getAddressPrefixes(): string[];
}
export declare class Networks extends NestedNamespace {
    isNetwork(network: string): boolean;
    getNetworks(): string[];
    getNetwork(network: string): any;
}
export declare class Params extends NestedNamespace {
}
export declare class ExtendedKeyVersions extends NestedNamespace {
    isVersion(version: Uint8Array): boolean;
    getVersions(): string[];
    getVersion(name: string): number | string | Uint8Array;
    getName(version: Uint8Array): string | undefined;
}
export declare class XPrivateKeyVersions extends ExtendedKeyVersions {
}
export declare class XPublicKeyVersions extends ExtendedKeyVersions {
}
export declare class PUBLIC_KEY_TYPES {
    static readonly UNCOMPRESSED: string;
    static readonly COMPRESSED: string;
    static getTypes(): string[];
}
export declare class WIF_TYPES {
    static readonly WIF: string;
    static readonly WIF_COMPRESSED: string;
    static getTypes(): string[];
}
export declare class SEMANTICS {
    static readonly P2WPKH: string;
    static readonly P2WPKH_IN_P2SH: string;
    static readonly P2WSH: string;
    static readonly P2WSH_IN_P2SH: string;
    static getTypes(): string[];
}
export declare class MODES {
    static readonly STANDARD: string;
    static readonly SEGWIT: string;
    static getTypes(): string[];
}
//# sourceMappingURL=consts.d.ts.map