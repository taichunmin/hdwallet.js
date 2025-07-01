// SPDX-License-Identifier: MIT

import { EllipticCurveCryptography } from '../eccs';
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
} from '../consts';

export class Network {

  static NAME: string;
  // Bitcoin
  static PUBLIC_KEY_ADDRESS_PREFIX?: number;
  static SCRIPT_ADDRESS_PREFIX?: number;
  static HRP?: string;
  static WITNESS_VERSIONS?: WitnessVersions;
  static XPRIVATE_KEY_VERSIONS: XPrivateKeyVersions;
  static XPUBLIC_KEY_VERSIONS: XPublicKeyVersions;
  static MESSAGE_PREFIX?: string | null;
  static WIF_PREFIX?: number;
  // Bitcoin-Cash | Bitcoin-Cash-SLP | eCash
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
}

export class Cryptocurrency {
  
  static NAME: string;
  static SYMBOL: string;
  static INFO: Info;
  static ECC: typeof EllipticCurveCryptography;
  static COIN_TYPE: number;
  static SUPPORT_BIP38?: boolean;
  static NETWORKS: Networks;
  static DEFAULT_NETWORK: typeof Network;
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
  static SEMANTICS?: string[];
  static DEFAULT_SEMANTIC?: string;
  static PARAMS?: Params;
}
