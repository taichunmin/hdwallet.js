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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x00001cb8;
  static SCRIPT_ADDRESS_PREFIX = 0x00001cbd;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18Zelcash Signed Message:\n';
  static WIF_PREFIX = 0x80;
}

export class Flux extends Cryptocurrency {

  static NAME = 'Flux';
  static SYMBOL = 'FLUX';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/RunOnFlux/fluxd',
    WHITEPAPER: 'https://fluxwhitepaper.app.runonflux.io',
    WEBSITES: [
      'https://runonflux.io',
        'https://home.runonflux.io'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Flux;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Flux.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Flux.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Flux.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Flux.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
