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
  AddressTypes,
  Networks,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static LEGACY_PUBLIC_KEY_ADDRESS_PREFIX = 0x00;
  static LEGACY_SCRIPT_ADDRESS_PREFIX = 0x05;
  static STD_PUBLIC_KEY_ADDRESS_PREFIX = 0x00;
  static STD_SCRIPT_ADDRESS_PREFIX = 0x08;
  static HRP = 'bitcoincash';
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
  static WIF_PREFIX = 0x80;
}

export class Testnet extends Network {

  static LEGACY_PUBLIC_KEY_ADDRESS_PREFIX = 0x6f;
  static LEGACY_SCRIPT_ADDRESS_PREFIX = 0xc4;
  static STD_PUBLIC_KEY_ADDRESS_PREFIX = 0x00;
  static STD_SCRIPT_ADDRESS_PREFIX = 0x08;
  static HRP = 'bchtest';
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
  static WIF_PREFIX = 0xef;
}

export class Regtest extends Testnet {

  static HRP = 'bchreg';
}

export class BitcoinCash extends Cryptocurrency {

  static NAME = 'Bitcoin-Cash';
  static SYMBOL = 'BCH';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/bitcoincashorg/bitcoincash.org',
    WEBSITES: [
      'http://bch.info'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.BitcoinCash;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet,
    REGTEST: Regtest
  });
  static DEFAULT_NETWORK = BitcoinCash.NETWORKS.MAINNET;
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
  static DEFAULT_HD = BitcoinCash.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${BitcoinCash.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH',
    'P2WPKH',
    { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' },
    'P2WSH',
    { P2WSH_IN_P2SH: 'P2WSH-In-P2SH' }
  ]);
  static DEFAULT_ADDRESS = BitcoinCash.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
  static ADDRESS_TYPES = new AddressTypes({
    STD: 'std',
    LEGACY: 'legacy'
  });
  static DEFAULT_ADDRESS_TYPE = BitcoinCash.ADDRESS_TYPES.STD;
}
