// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../ecc';
import {
  Info,
  Entropies,
  Mnemonics,
  Seeds,
  HDs,
  Addresses,
  AddressTypes,
  Networks,
  Params,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../const';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static HRP = 'avax';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class Avalanche extends Cryptocurrency {

  static NAME = 'Avalanche';
  static SYMBOL = 'AVAX';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/ava-labs/avalanchego',
    WHITEPAPER: 'https://www.avalabs.org/whitepapers',
    WEBSITES: [
      'https://avax.network',
        'https://www.avalabs.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Avalanche;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Avalanche.NETWORKS.MAINNET;
  static ENTROPIES = new Entropies([
    'BIP39'
  ]);
  static MNEMONICS = new Mnemonics([
    'BIP39'
  ]);
  static SEEDS = new Seeds([
    'BIP39'
  ]);
  static HDS = new HDs([
    'BIP32',
    'BIP44'
  ]);
  static DEFAULT_HD = Avalanche.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Avalanche.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    AVALANCHE: 'Avalanche',
    ETHEREUM: 'Ethereum'
  });
  static DEFAULT_ADDRESS = Avalanche.ADDRESSES.AVALANCHE;
  static ADDRESS_TYPES = new AddressTypes({
    C_CHAIN: 'c-chain',
    P_CHAIN: 'p-chain',
    X_CHAIN: 'x-chain'
  });
  static DEFAULT_ADDRESS_TYPE = Avalanche.ADDRESS_TYPES.P_CHAIN;
  static PARAMS = new Params({
    ADDRESS_TYPES: {
      P_CHAIN: 'P-',
      X_CHAIN: 'X-'
    }
  });
}
