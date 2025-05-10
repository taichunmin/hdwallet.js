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
  Cryptocurrency,
  Network
} from './cryptocurrency';


export class Mainnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x34;
  static SCRIPT_ADDRESS_PREFIX = 0x0d;
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

export class Namecoin extends Cryptocurrency {

  static NAME = 'Namecoin';
  static SYMBOL = 'NMC';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/namecoin/namecoin-core',
    WHITEPAPER: 'https://www.namecoin.org/resources/whitepaper',
    WEBSITES: [
      'https://www.namecoin.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Namecoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Namecoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Namecoin.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Namecoin.ADDRESSES.P2PKH;
}
