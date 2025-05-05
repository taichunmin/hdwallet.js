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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x19;
  static SCRIPT_ADDRESS_PREFIX = 0x05;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x1e5631bc,
    P2SH: 0x1e5631bc
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x1e562d9a,
    P2SH: 0x1e562d9a
  });
  static MESSAGE_PREFIX = '\x18Smileycoin Signed Message:\n';
  static WIF_PREFIX = 0x05;
}

export class Smileycoin extends ICryptocurrency {

  static NAME = 'Smileycoin';
  static SYMBOL = 'SMLY';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/tutor-web/',
    WHITEPAPER: 'https://tutor-web.info/smileycoin',
    WEBSITES: [
        'https://smileyco.in'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Smileycoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = Smileycoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Smileycoin.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Smileycoin.ADDRESSES.P2PKH;
}
