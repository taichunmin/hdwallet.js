// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../ecc';
import {
  Info,
  WitnessVersions,
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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x38;
  static SCRIPT_ADDRESS_PREFIX = 0x3c;
  static HRP = 'pw';
  static WITNESS_VERSIONS = new WitnessVersions({
    P2WPKH: 0x00,
    P2WSH: 0x00
  });
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x8f1daeb8,
    P2SH: 0x8f1daeb8
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x696e82d1,
    P2SH: 0x696e82d1
  });
  static MESSAGE_PREFIX = '\x18Bitcoin Signed Message:\n';
  static WIF_PREFIX = 0x6c;
}

export class Particl extends Cryptocurrency {

  static NAME = 'Particl';
  static SYMBOL = 'PART';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/particl/particl-core',
    WHITEPAPER: 'https://github.com/particl/whitepaper/blob/master/Particl%20Whitepaper%20Draft%20v0.3.pdf',
    WEBSITES: [
      'http://particl.io',
        'https://particl.store'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Particl;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Particl.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Particl.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Particl.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Particl.ADDRESSES.P2PKH;
}
