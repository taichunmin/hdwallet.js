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

  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class Polygon extends Cryptocurrency {

  static NAME = 'Polygon';
  static SYMBOL = 'MATIC';
  static INFO = new Info({
    WHITEPAPER: 'https://github.com/maticnetwork/contracts',
    WEBSITES: [
      'https://github.com/maticnetwork/whitepaper',
        'https://polygon.technology'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Polygon;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Polygon.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Polygon.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Polygon.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    ETHEREUM: 'Ethereum'
  });
  static DEFAULT_ADDRESS = Polygon.ADDRESSES.ETHEREUM;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
