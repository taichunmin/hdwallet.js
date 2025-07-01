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
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x07;
  static SCRIPT_ADDRESS_PREFIX = 0x09;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x5aebd8c6,
    P2SH: 0x5aebd8c6
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0xfbc6a00d,
    P2SH: 0xfbc6a00d
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0x7b;
}

export class ThoughtAI extends Cryptocurrency {

  static NAME = 'Thought-AI';
  static SYMBOL = 'THT';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/thoughtnetwork',
    WHITEPAPER: 'https://github.com/thoughtnetwork/thought-whitepaper',
    WEBSITES: [
      'https://thought.live'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.ThoughtAI;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = ThoughtAI.NETWORKS.MAINNET;
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
  static DEFAULT_HD = ThoughtAI.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${ThoughtAI.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = ThoughtAI.ADDRESSES.P2PKH;
  static SEMANTICS = ['p2pkh', 'p2sh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
}
