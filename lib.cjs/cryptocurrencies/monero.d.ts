import { SLIP10Ed25519MoneroECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, AddressTypes, Networks, Params } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export declare class Mainnet extends Network {
    static STANDARD: number;
    static INTEGRATED: number;
    static SUB_ADDRESS: number;
}
export declare class Stagenet extends Network {
    static STANDARD: number;
    static INTEGRATED: number;
    static SUB_ADDRESS: number;
}
export declare class Testnet extends Network {
    static STANDARD: number;
    static INTEGRATED: number;
    static SUB_ADDRESS: number;
}
export declare class Monero extends Cryptocurrency {
    static NAME: string;
    static SYMBOL: string;
    static INFO: Info;
    static ECC: typeof SLIP10Ed25519MoneroECC;
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
    static ADDRESS_TYPES: AddressTypes;
    static DEFAULT_ADDRESS_TYPE: any;
    static PARAMS: Params;
}
//# sourceMappingURL=monero.d.ts.map