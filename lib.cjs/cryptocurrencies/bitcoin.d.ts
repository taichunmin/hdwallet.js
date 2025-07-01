import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, WitnessVersions, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, Params, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export declare class Mainnet extends Network {
    static NAME: string;
    static PUBLIC_KEY_ADDRESS_PREFIX: number;
    static SCRIPT_ADDRESS_PREFIX: number;
    static HRP: string;
    static WITNESS_VERSIONS: WitnessVersions;
    static XPRIVATE_KEY_VERSIONS: XPrivateKeyVersions;
    static XPUBLIC_KEY_VERSIONS: XPublicKeyVersions;
    static MESSAGE_PREFIX: string;
    static WIF_PREFIX: number;
}
export declare class Testnet extends Network {
    static NAME: string;
    static PUBLIC_KEY_ADDRESS_PREFIX: number;
    static SCRIPT_ADDRESS_PREFIX: number;
    static HRP: string;
    static WITNESS_VERSIONS: WitnessVersions;
    static XPRIVATE_KEY_VERSIONS: XPrivateKeyVersions;
    static XPUBLIC_KEY_VERSIONS: XPublicKeyVersions;
    static MESSAGE_PREFIX: string;
    static WIF_PREFIX: number;
}
export declare class Regtest extends Testnet {
    static NAME: string;
    static HRP: string;
}
export declare class Bitcoin extends Cryptocurrency {
    static NAME: string;
    static SYMBOL: string;
    static INFO: Info;
    static ECC: typeof SLIP10Secp256k1ECC;
    static COIN_TYPE: number;
    static SUPPORT_BIP38: boolean;
    static NETWORKS: Networks;
    static DEFAULT_NETWORK: any;
    static ENTROPIES: Entropies;
    static MNEMONICS: Mnemonics;
    static SEEDS: Seeds;
    static HDS: HDs;
    static DEFAULT_HD: any;
    static DEFAULT_PATH: string;
    static ADDRESSES: Addresses;
    static DEFAULT_ADDRESS: any;
    static SEMANTICS: string[];
    static DEFAULT_SEMANTIC: string;
    static PARAMS: Params;
}
//# sourceMappingURL=bitcoin.d.ts.map