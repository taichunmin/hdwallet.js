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
  static PUBLIC_KEY_ADDRESS_PREFIX = 0x3d;
  static SCRIPT_ADDRESS_PREFIX = 0x06;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = 'DarkNet Signed Message:\n';
  static WIF_PREFIX = 0x2e;
}

export class Rapids extends Cryptocurrency {

  static NAME = 'Rapids';
  static SYMBOL = 'RPD';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/RapidsOfficial/Rapids',
    WHITEPAPER: 'https://www.rapidsnetwork.io/whitepaper',
    WEBSITES: [
      'https://www.rapidsnetwork.io'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Rapids;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Rapids.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Rapids.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Rapids.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Rapids.ADDRESSES.P2PKH;
  static SEMANTICS = ['p2pkh', 'p2sh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
}
