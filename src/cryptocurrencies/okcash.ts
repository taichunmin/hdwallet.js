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
import { Cryptocurrency, Network} from './cryptocurrency';

export class Mainnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x37;
  static SCRIPT_ADDRESS_PREFIX = 0x1c;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x03cc1c73,
    P2SH: 0x03cc1c73
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x03cc23d7,
    P2SH: 0x03cc23d7
  });
  static MESSAGE_PREFIX = '\x18OKCash Signed Message:\n';
  static WIF_PREFIX = 0x03;
}

export class OKCash extends Cryptocurrency {

  static NAME = 'OK-Cash';
  static SYMBOL = 'OK';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/okcashpro/okcash',
    WHITEPAPER: 'https://github.com/okcashpro/okcash-whitepaper',
    WEBSITES: [
      'http://okcash.co'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.OKCash;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = OKCash.NETWORKS.MAINNET;
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
  static DEFAULT_HD = OKCash.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = OKCash.ADDRESSES.P2PKH;
}
