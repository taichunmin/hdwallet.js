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
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class NineChronicles extends Cryptocurrency {

  static NAME = 'Nine-Chronicles';
  static SYMBOL = 'NCG';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/planetarium/NineChronicles',
    WEBSITES: [
      'https://nine-chronicles.com',
        'https://presale.nine-chronicles.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.NineChronicles;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = NineChronicles.NETWORKS.MAINNET;
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
  static DEFAULT_HD = NineChronicles.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${NineChronicles.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    ETHEREUM: 'Ethereum'
  });
  static DEFAULT_ADDRESS = NineChronicles.ADDRESSES.ETHEREUM;
  static SEMANTICS = ['p2pkh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
}
