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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x47;
  static SCRIPT_ADDRESS_PREFIX = 0x21;
  static HRP = 'via';
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
  static MESSAGE_PREFIX = '\x18Viacoin Signed Message:\n';
  static WIF_PREFIX = 0xc7;
}

export class Testnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x7f;
  static SCRIPT_ADDRESS_PREFIX = 0xc4;
  static HRP = 'tvia';
  static WITNESS_VERSIONS = new WitnessVersions({
    P2WPKH: 0x00,
    P2WSH: 0x00
  });
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x04358394,
    P2SH: 0x04358394,
    P2WPKH: 0x045f18bc,
    P2WPKH_IN_P2SH: 0x044a4e28
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x043587cf,
    P2SH: 0x043587cf,
    P2WPKH: 0x045f1cf6,
    P2WPKH_IN_P2SH: 0x044a5262
  });
  static MESSAGE_PREFIX = '\x18Viacoin Signed Message:\n';
  static WIF_PREFIX = 0xff;
}

export class Viacoin extends Cryptocurrency {

  static NAME = 'Viacoin';
  static SYMBOL = 'VIA';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/viacoin/viacoin',
    WHITEPAPER: 'https://github.com/viacoin/documents/blob/master/whitepapers/Viacoin_fullcolor_whitepaper.pdf',
    WEBSITES: [
      'http://viacoin.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Viacoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Viacoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Viacoin.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH',
    'P2WPKH',
    { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
  ]);
  static DEFAULT_ADDRESS = Viacoin.ADDRESSES.P2PKH;
}
