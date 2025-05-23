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

  static HRP = 'one';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class Harmony extends Cryptocurrency {

  static NAME = 'Harmony';
  static SYMBOL = 'ONE';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/harmony-one/harmony',
    WHITEPAPER: 'https://harmony.one/whitepaper.pdf',
    WEBSITES: [
      'https://www.harmony.one',
        'https://t.me/harmony_announcements'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Harmony;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Harmony.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Harmony.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Harmony.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    HARMONY: 'Harmony'
  });
  static DEFAULT_ADDRESS = Harmony.ADDRESSES.HARMONY;
}
