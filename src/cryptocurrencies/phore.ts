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
  static SCRIPT_ADDRESS_PREFIX = 0x0d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0221312b,
    P2SH: 0x0221312b
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x022d2533,
    P2SH: 0x022d2533
  });
  static MESSAGE_PREFIX = '\x18Phore Signed Message:\n';
  static WIF_PREFIX = 0xd4;
}

export class Phore extends ICryptocurrency {

  static NAME = 'Phore';
  static SYMBOL = 'PHR';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/phoreproject/Phore',
    WHITEPAPER: 'https://www.dropbox.com/s/6uf405mdbdvs6iq/Phore%20White%20Paper%20v.1.1a.pdf?dl=0',
    WEBSITES: [
        'https://phore.io'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Phore;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = Phore.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Phore.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Phore.ADDRESSES.P2PKH;
}
