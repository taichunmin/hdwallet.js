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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x44;
  static SCRIPT_ADDRESS_PREFIX = 0x7d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0xee8031e8,
    P2SH: 0xee8031e8
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0xee80286a,
    P2SH: 0xee80286a
  });
  static MESSAGE_PREFIX = '\x18UltimateSecureCash Signed Message:\n';
  static WIF_PREFIX = 0xbf;
}

export class UltimateSecureCash extends Cryptocurrency {

  static NAME = 'Ultimate-Secure-Cash';
  static SYMBOL = 'USC';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/SilentTrader/UltimateSecureCash',
    WHITEPAPER: 'https://ultimatesecurecash.info/#spec',
    WEBSITES: [
      'http://ultimatesecurecash.info'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.UltimateSecureCash;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = UltimateSecureCash.NETWORKS.MAINNET;
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
  static DEFAULT_HD = UltimateSecureCash.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${UltimateSecureCash.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = UltimateSecureCash.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
