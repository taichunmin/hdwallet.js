// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Nist256p1ECC } from '../ecc';
import {
  Info,
  Entropies,
  Mnemonics,
  Seeds,
  HDs,
  Addresses,
  Networks,
  Params,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../const';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
}

export class Neo extends Cryptocurrency {

  static NAME = 'Neo';
  static SYMBOL = 'NEO';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/neo-project/neo',
    WHITEPAPER: 'https://docs.neo.org/docs/en-us/index.html',
    WEBSITES: [
      'https://neo.org'
    ]
  });
  static ECC = SLIP10Nist256p1ECC;
  static COIN_TYPE = CoinTypes.Neo;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Neo.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Neo.HDS.BIP44;
  static ADDRESSES = new Addresses({
    NEO: 'Neo'
  });
  static DEFAULT_ADDRESS = Neo.ADDRESSES.NEO;
  static PARAMS = new Params({
    ADDRESS_PREFIX: 0x21,
    ADDRESS_SUFFIX: 0xac,
    ADDRESS_VERSION: 0x17,
    ALPHABET: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  });
}
