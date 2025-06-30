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
  Networks,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static NAME = 'mainnet';
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x89;
  static SCRIPT_ADDRESS_PREFIX = 0x0d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0xa8c17826,
    P2SH: 0xa8c17826
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0xa8c26d64,
    P2SH: 0xa8c26d64
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0x85;
}

export class Clams extends Cryptocurrency {

  static NAME = 'Clams';
  static SYMBOL = 'CLAM';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/nochowderforyou/clams',
    WEBSITES: [
      'http://clamcoin.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Clams;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Clams.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Clams.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Clams.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Clams.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
