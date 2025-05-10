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
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x19;
  static SCRIPT_ADDRESS_PREFIX = 0x55;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x02cfbf60,
    P2SH: 0x02cfbf60
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x02cfbede,
    P2SH: 0x02cfbede
  });
  static MESSAGE_PREFIX = '\x18BlackCoin Signed Message:\n';
  static WIF_PREFIX = 0x99;
}

export class Blackcoin extends Cryptocurrency {

  static NAME = 'Blackcoin';
  static SYMBOL = 'BLK';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/coinblack',
    WHITEPAPER: 'https://blackcoin.org/blackcoin-pos-protocol-v2-whitepaper.pdf',
    WEBSITES: [
      'https://blackcoin.org',
        'https://blackcoinmore.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Blackcoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Blackcoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Blackcoin.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Blackcoin.ADDRESSES.P2PKH;
}
