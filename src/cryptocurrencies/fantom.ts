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

export class Fantom extends Cryptocurrency {

  static NAME = 'Fantom';
  static SYMBOL = 'FTM';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/Fantom-foundation/go-opera',
    WHITEPAPER: 'https://fantom.foundation/fantom-research-papers',
    WEBSITES: [
      'https://fantom.foundation'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Fantom;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Fantom.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Fantom.HDS.BIP44;
  static ADDRESSES = new Addresses({
    ETHEREUM: 'Ethereum'
  });
  static DEFAULT_ADDRESS = Fantom.ADDRESSES.ETHEREUM;
}
