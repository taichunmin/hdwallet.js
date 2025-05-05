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
import {
  ICryptocurrency,
  INetwork
} from './icryptocurrency';


export class Mainnet extends INetwork {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x03;
  static SCRIPT_ADDRESS_PREFIX = 0x7d;
  static HRP = 'bitcore';
  static WITNESS_VERSIONS = new WitnessVersions({
    P2WPKH: 0x00,
    P2WSH: 0x00
  });
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4,
    P2WPKH: 0x0488ade4,
    P2WPKH_IN_P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e,
    P2WPKH: 0x0488b21e,
    P2WPKH_IN_P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18BitCore Signed Message:\n';
  static WIF_PREFIX = 0x80;
}

export class Bitcore extends ICryptocurrency {

  static NAME = 'Bitcore';
  static SYMBOL = 'BTX';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/bitcore-btx/BitCore',
    WHITEPAPER: 'https://bitcore.cc/#coinspec-anchor',
    WEBSITES: [
        'https://bitcore.cc'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Bitcore;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = Bitcore.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Bitcore.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH',
    'P2WPKH',
    { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
  ]);
  static DEFAULT_ADDRESS = Bitcore.ADDRESSES.P2PKH;
}
