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
  Cryptocurrency,
  Network
} from './cryptocurrency';


export class Mainnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x30;
  static SCRIPT_ADDRESS_PREFIX = 0x32;
  static HRP = 'ltc';
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
  static MESSAGE_PREFIX = '\x19Litecoin Signed Message:\n';
  static WIF_PREFIX = 0xb0;
}

export class Testnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x6f;
  static SCRIPT_ADDRESS_PREFIX = 0x3a;
  static HRP = 'tltc';
  static WITNESS_VERSIONS = new WitnessVersions({
    P2WPKH: 0x00,
    P2WSH: 0x00
  });
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x04358394,
    P2SH: 0x04358394,
    P2WPKH: 0x045f18bc,
    P2WPKH_IN_P2SH: 0x044a4e28,
    P2WSH: 0x02575048,
    P2WSH_IN_P2SH: 0x024285b5
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x043587cf,
    P2SH: 0x043587cf,
    P2WPKH: 0x045f1cf6,
    P2WPKH_IN_P2SH: 0x044a5262,
    P2WSH: 0x02575483,
    P2WSH_IN_P2SH: 0x024289ef
  });
  static MESSAGE_PREFIX = '\x19Litecoin Signed Message:\n';
  static WIF_PREFIX = 0xef;
}

export class Litecoin extends Cryptocurrency {

  static NAME = 'Litecoin';
  static SYMBOL = 'LTC';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/litecoin-project/litecoin',
    WEBSITES: [
      'https://litecoin.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Litecoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Litecoin.NETWORKS.MAINNET;
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
    'BIP44',
    'BIP84'
  ]);
  static DEFAULT_HD = Litecoin.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH',
    'P2WPKH',
    { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' },
    'P2WSH',
    { P2WSH_IN_P2SH: 'P2WSH-In-P2SH' }
  ]);
  static DEFAULT_ADDRESS = Litecoin.ADDRESSES.P2PKH;
}
