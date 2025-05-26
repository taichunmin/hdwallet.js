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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x3f;
  static SCRIPT_ADDRESS_PREFIX = 0x7d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0xee8031e8,
    P2SH: 0xee8031e8
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0xee80286a,
    P2SH: 0xee80286a
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0xbf;
}

export class Testnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x7f;
  static SCRIPT_ADDRESS_PREFIX = 0xc4;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x76c1077a,
    P2SH: 0x76c1077a
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x76c0fdfb,
    P2SH: 0x76c0fdfb
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0xff;
}

export class ShadowCash extends Cryptocurrency {

  static NAME = 'Shadow-Cash';
  static SYMBOL = 'SDC';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/shadowproject/shadow',
    WHITEPAPER: 'https://github.com/shadowproject/whitepapers',
    WEBSITES: [
      'http://shadowproject.io'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.ShadowCash;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = ShadowCash.NETWORKS.MAINNET;
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
  static DEFAULT_HD = ShadowCash.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${ShadowCash.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = ShadowCash.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
