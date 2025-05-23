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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x0e;
  static SCRIPT_ADDRESS_PREFIX = 0x05;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488daee,
    P2SH: 0x0488daee
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488bc26,
    P2SH: 0x0488bc26
  });
  static MESSAGE_PREFIX = '\x18Feathercoin Signed Message:\n';
  static WIF_PREFIX = 0x8e;
}

export class Feathercoin extends Cryptocurrency {

  static NAME = 'Feathercoin';
  static SYMBOL = 'FTC';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/FeatherCoin/Feathercoin',
    WHITEPAPER: 'https://feathercoin.com/about',
    WEBSITES: [
      'http://feathercoin.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Feathercoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Feathercoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Feathercoin.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Feathercoin.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Feathercoin.ADDRESSES.P2PKH;
}
