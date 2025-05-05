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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x37;
  static SCRIPT_ADDRESS_PREFIX = 0x08;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0221312b,
    P2SH: 0x0221312b
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x022d2533,
    P2SH: 0x022d2533
  });
  static MESSAGE_PREFIX = '\x18ProjectCoin Signed Message:\n';
  static WIF_PREFIX = 0x75;
}

export class ProjectCoin extends ICryptocurrency {

  static NAME = 'Project-Coin';
  static SYMBOL = 'PRJ';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/projectcoincore/ProjectCoin',
    WEBSITES: [
        'https://projectcoin.net'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.ProjectCoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = ProjectCoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = ProjectCoin.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = ProjectCoin.ADDRESSES.P2PKH;
}
