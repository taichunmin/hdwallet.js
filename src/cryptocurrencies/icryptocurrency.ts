// SPDX-License-Identifier: MIT

import { IEllipticCurveCryptography } from '../ecc';
// import { BIP44Derivation } from '../derivations/bip44';
import {
  Info,
  WitnessVersions,
  Entropies,
  Mnemonics,
  Seeds,
  HDs,
  Addresses,
  AddressTypes,
  AddressPrefixes,
  Networks,
  Params,
  XPrivateKeyVersions,
  XPublicKeyVersions,
} from '../const';
import { NetworkError } from '../exceptions';

export abstract class INetwork {

  // Bitcoin network types
  static PUBLIC_KEY_ADDRESS_PREFIX?: number;
  static SCRIPT_ADDRESS_PREFIX?: number;
  static HRP?: string;
  static WITNESS_VERSIONS?: WitnessVersions;
  static XPRIVATE_KEY_VERSIONS?: XPrivateKeyVersions;
  static XPUBLIC_KEY_VERSIONS?: XPublicKeyVersions;
  static MESSAGE_PREFIX?: string;
  static WIF_PREFIX?: number;

  // Bitcoin-Cash / eCash
  static LEGACY_PUBLIC_KEY_ADDRESS_PREFIX?: number;
  static STD_PUBLIC_KEY_ADDRESS_PREFIX?: number;
  static LEGACY_SCRIPT_ADDRESS_PREFIX?: number;
  static STD_SCRIPT_ADDRESS_PREFIX?: number;

  // Monero
  static STANDARD?: number;
  static INTEGRATED?: number;
  static SUB_ADDRESS?: number;

  // Cardano
  static TYPE?: number;
  static PAYMENT_ADDRESS_HRP?: string;
  static REWARD_ADDRESS_HRP?: string;

  /** lowercase class name */
  static getName(): string {
    return this.prototype.constructor.name.toLowerCase();
  }
}

export abstract class ICryptocurrency {
  
  static NAME: string;
  static SYMBOL: string;
  static INFO: Info;
  static ECC: new (...args: any[]) => IEllipticCurveCryptography;
  static COIN_TYPE: number;
  static SUPPORT_BIP38: boolean = false;
  static NETWORKS: Networks;
  static DEFAULT_NETWORK: typeof INetwork;
  static ENTROPIES: Entropies;
  static MNEMONICS: Mnemonics;
  static SEEDS: Seeds;
  static HDS: HDs;
  static DEFAULT_HD: string;
  static ADDRESSES: Addresses;
  static DEFAULT_ADDRESS: string;
  static ADDRESS_TYPES?: AddressTypes;
  static DEFAULT_ADDRESS_TYPE?: string;
  static ADDRESS_PREFIXES?: AddressPrefixes;
  static DEFAULT_ADDRESS_PREFIX?: string;
  static PARAMS?: Params;
  static DEFAULT_SEMANTIC: string = 'p2pkh';

  // /**
  //  * Return the default BIP44 derivation path for the given network.
  //  * @param network either the network’s name (e.g. 'mainnet') or the INetwork subclass
  //  */
  // static getDefaultPath(
  //   network: string | typeof INetwork
  // ): string {
  //   try {
  //     let netName: string;
  //     if (typeof network !== 'string' && network.prototype instanceof INetwork) {
  //       netName = (network as any).name();
  //     } else {
  //       netName = network as string;
  //     }
  //     if (!this.NETWORKS.isNetwork(netName)) {
  //       throw new NetworkError(
  //         `Wrong ${this.NAME} network`,
  //         this.NETWORKS.networks(),
  //         netName
  //       );
  //     }
  //
  //     const derivation = new BIP44Derivation({
  //       account: 0,
  //       change: 'external-chain',
  //       address: 0,
  //     });
  //     // coin_type = mainnet ? this.COIN_TYPE : 1
  //     derivation.fromCoinType(
  //       netName === 'mainnet' ? this.COIN_TYPE : 1
  //     );
  //     return derivation.path();
  //   } catch (e) {
  //     if (e instanceof TypeError) {
  //       throw new NetworkError(
  //         'Invalid network type',
  //         [String, INetwork],
  //         typeof network
  //       );
  //     }
  //     throw e;
  //   }
  // }
}
