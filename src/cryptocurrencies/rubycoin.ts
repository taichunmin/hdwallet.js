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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x3c;
  static SCRIPT_ADDRESS_PREFIX = 0x55;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18Rubycoin Signed Message:\n';
  static WIF_PREFIX = 0xbc;
}

export class Rubycoin extends ICryptocurrency {

  static NAME = 'Rubycoin';
  static SYMBOL = 'RBY';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/rubycoinorg/rubycoin',
    WEBSITES: [
        'http://www.rubycoin.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Rubycoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = Rubycoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Rubycoin.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Rubycoin.ADDRESSES.P2PKH;
}
