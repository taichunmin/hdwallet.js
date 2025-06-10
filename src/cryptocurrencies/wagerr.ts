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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x49;
  static SCRIPT_ADDRESS_PREFIX = 0x3f;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0221312b,
    P2SH: 0x0221312b
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x022d2533,
    P2SH: 0x022d2533
  });
  static WIF_PREFIX = 0xc7;
}

export class Wagerr extends Cryptocurrency {

  static NAME = 'Wagerr';
  static SYMBOL = 'WGR';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/wagerr/wagerr',
    WHITEPAPER: 'https://www.wagerr.com/wagerr_whitepaper_v1.pdf',
    WEBSITES: [
      'https://www.wagerr.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Wagerr;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Wagerr.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Wagerr.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Wagerr.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Wagerr.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
