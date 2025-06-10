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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x3f;
  static SCRIPT_ADDRESS_PREFIX = 0x7d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0xef69ea80,
    P2SH: 0xef69ea80
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0xef6adf10,
    P2SH: 0xef6adf10
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0x46;
}

export class Testnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x6f;
  static SCRIPT_ADDRESS_PREFIX = 0xc4;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x04358394,
    P2SH: 0x04358394
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x043587cf,
    P2SH: 0x043587cf
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0x57;
}

export class Slimcoin extends Cryptocurrency {

  static NAME = 'Slimcoin';
  static SYMBOL = 'SLM';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/slimcoin-project/Slimcoin',
    WEBSITES: [
      'http://slimco.in',
        'https://slimcoin-project.github.io'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Slimcoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Slimcoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Slimcoin.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Slimcoin.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Slimcoin.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
