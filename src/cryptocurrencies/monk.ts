// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
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
} from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static NAME = 'mainnet';
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x33;
  static SCRIPT_ADDRESS_PREFIX = 0x1c;
  static HRP = 'monkey';
  static WITNESS_VERSIONS = new WitnessVersions({
    P2WPKH: 0x00,
    P2WSH: 0x00
  });
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488dde4,
    P2SH: 0x0488dde4,
    P2WPKH: 0x0488dde4,
    P2WPKH_IN_P2SH: 0x0488dde4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e,
    P2WPKH: 0x0488b21e,
    P2WPKH_IN_P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = 'Monkey Signed Message:\n';
  static WIF_PREFIX = 0x37;
}

export class Monk extends Cryptocurrency {

  static NAME = 'Monk';
  static SYMBOL = 'MONK';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/decenomy/MONK',
    WHITEPAPER: 'https://decenomy.net/wp-content/uploads/DECENOMY_WP_v1.0_EN.pdf',
    WEBSITES: [
      'http://www.monkey.vision'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Monk;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Monk.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Monk.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Monk.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH',
    'P2WPKH',
    { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
  ]);
  static DEFAULT_ADDRESS = Monk.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
