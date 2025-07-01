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
  static SCRIPT_ADDRESS_PREFIX = 0x32;
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x3a;
  static HRP = 'qc1';
  static WITNESS_VERSIONS = new WitnessVersions({
    P2TR: 0x01,
    P2WPKH: 0x00,
    P2WSH: 0x00
  });
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4,
    P2WPKH: 0x045f18bc,
    P2WPKH_IN_P2SH: 0x049d7878,
    P2WSH: 0x02aa7a99,
    P2WSH_IN_P2SH: 0x0295b005
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e,
    P2WPKH: 0x045f1cf6,
    P2WPKH_IN_P2SH: 0x049d7cb2,
    P2WSH: 0x02aa7ed3,
    P2WSH_IN_P2SH: 0x0295b43f
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0x80;
}

export class Testnet extends Network {

  static NAME = 'testnet';
  static SCRIPT_ADDRESS_PREFIX = 0x6e;
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x78;
  static HRP = 'tq1';
  static WITNESS_VERSIONS = new WitnessVersions({
    P2TR: 0x01,
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
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0xef;
}

export class Qtum extends Cryptocurrency {

  static NAME = 'Qtum';
  static SYMBOL = 'QTUM';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/qtumproject/qtum',
    WHITEPAPER: 'https://qtumorg.s3.ap-northeast-2.amazonaws.com/Qtum_New_Whitepaper_en.pdf',
    WEBSITES: [
      'https://qtum.org',
        'https://qtum.info'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Qtum;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Qtum.NETWORKS.MAINNET;
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
    'BIP49',
    'BIP84',
    'BIP86',
    'BIP141'
  ]);
  static DEFAULT_HD = Qtum.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Qtum.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH',
    'P2TR',
    'P2WPKH',
    { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' },
    'P2WSH',
    { P2WSH_IN_P2SH: 'P2WSH-In-P2SH' }
  ]);
  static DEFAULT_ADDRESS = Qtum.ADDRESSES.P2PKH;
  static SEMANTICS = ['p2pkh', 'p2sh', 'p2wpkh', 'p2wpkh-in-p2sh', 'p2wsh', 'p2wsh-in-p2sh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
}
