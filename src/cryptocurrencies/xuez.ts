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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x4b;
  static SCRIPT_ADDRESS_PREFIX = 0x12;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0221312b,
    P2SH: 0x0221312b
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x022d2533,
    P2SH: 0x022d2533
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0xd4;
}

export class XUEZ extends Cryptocurrency {

  static NAME = 'XUEZ';
  static SYMBOL = 'XUEZ';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/XUEZ/Xuez-Core',
    WHITEPAPER: 'https://github.com/XUEZ/Whitepaper',
    WEBSITES: [
      'https://xuezcoin.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.XUEZ;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = XUEZ.NETWORKS.MAINNET;
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
  static DEFAULT_HD = XUEZ.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${XUEZ.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = XUEZ.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
