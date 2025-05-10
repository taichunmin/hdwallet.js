// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Ed25519ECC } from '../ecc';
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
import {
  Cryptocurrency,
  Network
} from './cryptocurrency';


export class Mainnet extends Network {

  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
}

export class Aptos extends Cryptocurrency {

  static NAME = 'Aptos';
  static SYMBOL = 'APT';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/aptos-labs',
    WHITEPAPER: 'https://aptosfoundation.org/whitepaper',
    WEBSITES: [
      'https://aptosfoundation.org'
    ]
  });
  static ECC = SLIP10Ed25519ECC;
  static COIN_TYPE = CoinTypes.Aptos;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Aptos.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Aptos.HDS.BIP44;
  static ADDRESSES = new Addresses({
    APTOS: 'Aptos'
  });
  static DEFAULT_ADDRESS = Aptos.ADDRESSES.APTOS;
  static PARAMS = new Params({
    SUFFIX: 0x00,
    ADDRESS_PREFIX: '0x'
  });
}
