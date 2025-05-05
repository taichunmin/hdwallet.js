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
  Params,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../const';
import {
  ICryptocurrency,
  INetwork
} from './icryptocurrency';


export class Mainnet extends INetwork {

  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({ P2PKH: 0x0488ade4 });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({ P2PKH: 0x0488b21e });
  static WIF_PREFIX = 0x80;
}

export class EOS extends ICryptocurrency {

  static NAME = 'EOS';
  static SYMBOL = 'EOS';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/AntelopeIO/leap',
    WHITEPAPER: 'https://eosnetwork.com/blog/category/eos-blue-papers',
    WEBSITES: [
        'https://eosnetwork.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.EOS;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = EOS.NETWORKS.MAINNET;
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
  static DEFAULT_HD = EOS.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'EOS'
  ]);
  static DEFAULT_ADDRESS = EOS.ADDRESSES.EOS;
  static PARAMS = new Params({
    ADDRESS_PREFIX: 'EOS',
    CHECKSUM_LENGTH: 0x04
  });
}
