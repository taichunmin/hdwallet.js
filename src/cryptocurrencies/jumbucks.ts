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
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x2b;
  static SCRIPT_ADDRESS_PREFIX = 0x05;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x037a6460,
    P2SH: 0x037a6460
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x037a689a,
    P2SH: 0x037a689a
  });
  static MESSAGE_PREFIX = '\x19Jumbucks Signed Message:\n';
  static WIF_PREFIX = 0xab;
}

export class Jumbucks extends Cryptocurrency {

  static NAME = 'Jumbucks';
  static SYMBOL = 'JBS';
  static INFO = new Info({
    WEBSITES: [
      'http://getjumbucks.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Jumbucks;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Jumbucks.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Jumbucks.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Jumbucks.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Jumbucks.ADDRESSES.P2PKH;
  static SEMANTICS = ['p2pkh', 'p2sh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
}
