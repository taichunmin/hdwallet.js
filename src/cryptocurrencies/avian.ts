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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x3c;
  static SCRIPT_ADDRESS_PREFIX = 0x7a;
  static HRP = 'av';
  static WITNESS_VERSIONS = new WitnessVersions({
    P2WPKH: 0x00,
    P2WSH: 0x00
  });
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4,
    P2WPKH: 0x04b2430c,
    P2WPKH_IN_P2SH: 0x049d7878,
    P2WSH: 0x02aa7a99,
    P2WSH_IN_P2SH: 0x0295b005
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e,
    P2WPKH: 0x04b24746,
    P2WPKH_IN_P2SH: 0x049d7cb2,
    P2WSH: 0x02aa7ed3,
    P2WSH_IN_P2SH: 0x0295b43f
  });
  static MESSAGE_PREFIX = 'Aviancoin Signed Message:\n';
  static WIF_PREFIX = 0x80;
}

export class Avian extends ICryptocurrency {

  static NAME = 'Avian';
  static SYMBOL = 'AVN';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/AvianNetwork/Avian',
    WHITEPAPER: 'https://www.avn.network/_files/ugd/c493c9_83224e1867d24a4185421548cfd6a35a.pdf',
    WEBSITES: [
        'https://avn.network'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Avian;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = Avian.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Avian.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH',
    'P2WPKH',
    { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' },
    'P2WSH',
    { P2WSH_IN_P2SH: 'P2WSH-In-P2SH' }
  ]);
  static DEFAULT_ADDRESS = Avian.ADDRESSES.P2PKH;
}
