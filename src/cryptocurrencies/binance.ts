// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import {
  Info,
  Entropies,
  Mnemonics,
  Seeds,
  HDs,
  Addresses,
  AddressTypes,
  Networks,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static NAME = 'mainnet';
  static HRP = 'bnb';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class Binance extends Cryptocurrency {

  static NAME = 'Binance';
  static SYMBOL = 'BNB';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/bnb-chain/bsc',
    WHITEPAPER: 'https://github.com/bnb-chain/whitepaper',
    WEBSITES: [
      'https://www.bnbchain.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Binance;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Binance.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Binance.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Binance.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    COSMOS: 'Cosmos',
    ETHEREUM: 'Ethereum'
  });
  static DEFAULT_ADDRESS = Binance.ADDRESSES.COSMOS;
  static SEMANTICS = ['p2pkh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
  static ADDRESS_TYPES = new AddressTypes({
    CHAIN: 'chain',
    SMART_CHAIN: 'smart-chain'
  });
  static DEFAULT_ADDRESS_TYPE = Binance.ADDRESS_TYPES.CHAIN;
}
