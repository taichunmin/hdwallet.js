// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Ed25519ECC } from '../eccs';
import {
  Info,
  Entropies,
  Mnemonics,
  Seeds,
  HDs,
  Addresses,
  Networks,
  Params,
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
}

export class Sui extends Cryptocurrency {

  static NAME = 'Sui';
  static SYMBOL = 'SUI';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/MystenLabs/sui',
    WHITEPAPER: 'https://docs.sui.io',
    WEBSITES: [
      'https://sui.io'
    ]
  });
  static ECC = SLIP10Ed25519ECC;
  static COIN_TYPE = CoinTypes.Sui;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Sui.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Sui.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Sui.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    SUI: 'Sui'
  });
  static DEFAULT_ADDRESS = Sui.ADDRESSES.SUI;
  static SEMANTICS = ['p2pkh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
  static PARAMS = new Params({
    KEY_TYPE: 0x00,
    ADDRESS_PREFIX: '0x'
  });
}
