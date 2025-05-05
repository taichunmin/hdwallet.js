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

  static HRP = 'fetch';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({ P2PKH: 0x0488ade4 });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({ P2PKH: 0x0488b21e });
  static WIF_PREFIX = 0x80;
}

export class FetchAI extends ICryptocurrency {

  static NAME = 'Fetch.ai';
  static SYMBOL = 'FET';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/fetchai',
    WHITEPAPER: 'https://www.dropbox.com/s/gxptsecwdl3jjtn/David%20Minarsch%20-%202021-04-26%2010.34.17%20-%20paper_21_finalversion.pdf?dl=0',
    WEBSITES: [
        'https://fetch-ai.network',
        'https://docs.fetch.ai'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.FetchAI;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = FetchAI.NETWORKS.MAINNET;
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
  static DEFAULT_HD = FetchAI.HDS.BIP44;
  static ADDRESSES = new Addresses({ COSMOS: 'Cosmos' });
  static DEFAULT_ADDRESS = FetchAI.ADDRESSES.COSMOS;
}
