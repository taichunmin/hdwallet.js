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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x26;
  static SCRIPT_ADDRESS_PREFIX = 0x0a;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18DarkCoin Signed Message:\n';
  static WIF_PREFIX = 0xc6;
}

export class GoByte extends Cryptocurrency {

  static NAME = 'Go-Byte';
  static SYMBOL = 'GBX';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/gobytecoin/gobyte',
    WHITEPAPER: 'https://gobyte-coin.readthedocs.io/en/latest/index.html',
    WEBSITES: [
      'https://gobyte.network'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.GoByte;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = GoByte.NETWORKS.MAINNET;
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
  static DEFAULT_HD = GoByte.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${GoByte.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = GoByte.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
