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
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x3f;
  static SCRIPT_ADDRESS_PREFIX = 0x7d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18Stratis Signed Message:\n';
  static WIF_PREFIX = 0xbf;
}

export class Testnet extends Network {

  static NAME = 'testnet';
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x41;
  static SCRIPT_ADDRESS_PREFIX = 0x7d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18Stratis Test Signed Message:\n';
  static WIF_PREFIX = 0xbf;
}

export class Stratis extends Cryptocurrency {

  static NAME = 'Stratis';
  static SYMBOL = 'STRAT';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/stratisproject',
    WHITEPAPER: 'https://www.stratisplatform.com/files/Stratis_Whitepaper.pdf',
    WEBSITES: [
      'http://stratisplatform.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Stratis;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Stratis.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Stratis.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Stratis.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Stratis.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
