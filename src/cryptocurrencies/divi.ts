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
  static MESSAGE_PREFIX = '\x19Divi Signed Message:\n';
  static WIF_PREFIX = 0xd4;
}

export class Testnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x1e;
  static SCRIPT_ADDRESS_PREFIX = 0x0d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x3a805837,
    P2SH: 0x3a805837
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x3a8061a0,
    P2SH: 0x3a8061a0
  });
  static MESSAGE_PREFIX = '\x19Divi Signed Message:\n';
  static WIF_PREFIX = 0xd4;
}

export class Divi extends Cryptocurrency {

  static NAME = 'Divi';
  static SYMBOL = 'DIVI';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/Divicoin/Divi',
    WHITEPAPER: 'https://wiki.diviproject.org/#whitepaper',
    WEBSITES: [
      'https://www.diviproject.org',
        'https://diviwallet.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Divi;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Divi.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Divi.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Divi.ADDRESSES.P2PKH;
}
