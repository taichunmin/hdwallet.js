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

  static HRP = 'inj';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class Injective extends Cryptocurrency {

  static NAME = 'Injective';
  static SYMBOL = 'INJ';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/InjectiveLabs',
    WHITEPAPER: 'https://docs.injectiveprotocol.com/#introduction',
    WEBSITES: [
      'https://injective.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Injective;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Injective.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Injective.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Injective.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    INJECTIVE: 'Injective'
  });
  static DEFAULT_ADDRESS = Injective.ADDRESSES.INJECTIVE;
}
