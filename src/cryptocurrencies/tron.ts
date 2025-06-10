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
  Params,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x41;
  static SCRIPT_ADDRESS_PREFIX = 0x05;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0x80;
}

export class Tron extends Cryptocurrency {

  static NAME = 'Tron';
  static SYMBOL = 'TRX';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/tronprotocol/java-tron',
    WHITEPAPER: 'https://developers.tron.network/docs',
    WEBSITES: [
      'https://trondao.org',
        'https://tron.network'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Tron;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Tron.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Tron.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Tron.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    TRON: 'Tron'
  });
  static DEFAULT_ADDRESS = Tron.ADDRESSES.TRON;
  static DEFAULT_SEMANTIC = 'p2pkh';
  static PARAMS = new Params({
    ALPHABET: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  });
}
