// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../ecc';
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
} from '../const';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x00000ab3;
  static SCRIPT_ADDRESS_PREFIX = 0x00000ab8;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade3,
    P2SH: 0x0488ade3
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18LitecoinZ Signed Message:\n';
  static WIF_PREFIX = 0x80;
}

export class LitecoinZ extends Cryptocurrency {

  static NAME = 'LitecoinZ';
  static SYMBOL = 'LTZ';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/litecoinz-project/litecoinz',
    WHITEPAPER: 'https://litecoinz.org/downloads/LITECOINZ-WHITE-PAPER.pdf',
    WEBSITES: [
      'https://litecoinz.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.LitecoinZ;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = LitecoinZ.NETWORKS.MAINNET;
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
  static DEFAULT_HD = LitecoinZ.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = LitecoinZ.ADDRESSES.P2PKH;
}
