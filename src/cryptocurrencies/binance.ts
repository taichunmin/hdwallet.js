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
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../const';
import {
  Cryptocurrency,
  Network
} from './cryptocurrency';


export class Mainnet extends Network {

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
  static ADDRESSES = new Addresses({
    COSMOS: 'Cosmos',
    ETHEREUM: 'Ethereum'
  });
  static DEFAULT_ADDRESS = Binance.ADDRESSES.COSMOS;
  static ADDRESS_TYPES = new AddressTypes({
    CHAIN: 'chain',
    SMART_CHAIN: 'smart-chain'
  });
  static DEFAULT_ADDRESS_TYPE = Binance.ADDRESS_TYPES.CHAIN;
}
