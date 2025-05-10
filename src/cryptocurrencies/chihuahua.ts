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
  Networks,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../const';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static HRP = 'chihuahua';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class Chihuahua extends Cryptocurrency {

  static NAME = 'Chihuahua';
  static SYMBOL = 'HUA';
  static INFO = new Info({
    WHITEPAPER: 'https://docs.chihuahua.army',
    WEBSITES: [
      'http://chihuahua.army'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Chihuahua;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Chihuahua.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Chihuahua.HDS.BIP44;
  static ADDRESSES = new Addresses({
    COSMOS: 'Cosmos'
  });
  static DEFAULT_ADDRESS = Chihuahua.ADDRESSES.COSMOS;
}
