// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
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
} from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static NAME = 'mainnet';
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x49;
  static SCRIPT_ADDRESS_PREFIX = 0x53;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0221312b,
    P2SH: 0x0221312b
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x022d2533,
    P2SH: 0x022d2533
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0x42;
}

export class Testnet extends Network {

  static NAME = 'testnet';
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x4c;
  static SCRIPT_ADDRESS_PREFIX = 0x89;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x3a805837,
    P2SH: 0x3a805837
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x3a8061a0,
    P2SH: 0x3a8061a0
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0xed;
}

export class TWINS extends Cryptocurrency {

  static NAME = 'TWINS';
  static SYMBOL = 'TWINS';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/NewCapital/TWINS-Core',
    WEBSITES: [
      'https://win.win'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.TWINS;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = TWINS.NETWORKS.MAINNET;
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
  static DEFAULT_HD = TWINS.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${TWINS.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = TWINS.ADDRESSES.P2PKH;
  static SEMANTICS = ['p2pkh', 'p2sh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
}
