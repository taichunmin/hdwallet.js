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
  AddressTypes,
  Networks,
  Params,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../const';
import {
  Cryptocurrency,
  Network
} from './cryptocurrency';


export class Mainnet extends Network {

  static TYPE = 0x00;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class Testnet extends Network {

  static TYPE = 0x10;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x04358394
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x043587cf
  });
  static WIF_PREFIX = 0xef;
}

export class Ergo extends Cryptocurrency {

  static NAME = 'Ergo';
  static SYMBOL = 'ERG';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/ergoplatform/ergo',
    WHITEPAPER: 'https://ergoplatform.org/en/documents',
    WEBSITES: [
      'https://ergoplatform.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Ergo;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Ergo.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Ergo.HDS.BIP44;
  static ADDRESSES = new Addresses({
    ERGO: 'Ergo'
  });
  static DEFAULT_ADDRESS = Ergo.ADDRESSES.ERGO;
  static ADDRESS_TYPES = new AddressTypes({
    P2PKH: 'p2pkh',
    P2SH: 'p2sh'
  });
  static DEFAULT_ADDRESS_TYPE = Ergo.ADDRESS_TYPES.P2PKH;
  static PARAMS = new Params({
    CHECKSUM_LENGTH: 0x04,
    ADDRESS_TYPES: {
      P2PKH: 0x01,
      P2SH: 0x02
    }
  });
}
