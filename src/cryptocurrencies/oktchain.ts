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
import {
  ICryptocurrency,
  INetwork
} from './icryptocurrency';


export class Mainnet extends INetwork {

  static HRP = 'ex';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({ P2PKH: 0x0488ade4 });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({ P2PKH: 0x0488b21e });
  static WIF_PREFIX = 0x80;
}

export class OKTChain extends ICryptocurrency {

  static NAME = 'OKT-Chain';
  static SYMBOL = 'OKT';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/okex/okexchain',
    WHITEPAPER: 'https://okc-docs.readthedocs.io/en/latest',
    WEBSITES: [
        'https://www.okx.com/okc'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.OKTChain;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = OKTChain.NETWORKS.MAINNET;
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
  static DEFAULT_HD = OKTChain.HDS.BIP44;
  static ADDRESSES = new Addresses({ OKT_CHAIN: 'OKT-Chain' });
  static DEFAULT_ADDRESS = OKTChain.ADDRESSES.OKT_CHAIN;
}
