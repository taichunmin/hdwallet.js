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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x1e;
  static SCRIPT_ADDRESS_PREFIX = 0x0d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0221312b,
    P2SH: 0x0221312b
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x022d2533,
    P2SH: 0x022d2533
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0xd4;
}

export class Testnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x8b;
  static SCRIPT_ADDRESS_PREFIX = 0x13;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x3a805837,
    P2SH: 0x3a805837
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x3a8061a0,
    P2SH: 0x3a8061a0
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0xef;
}

export class Pivx extends Cryptocurrency {

  static NAME = 'Pivx';
  static SYMBOL = 'PIVX';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/PIVX-Project/PIVX',
    WHITEPAPER: 'https://pivx.org/whitepaper',
    WEBSITES: [
      'https://pivx.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Pivx;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Pivx.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Pivx.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Pivx.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Pivx.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
