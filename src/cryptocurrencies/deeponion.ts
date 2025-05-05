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
  ICryptocurrency,
  INetwork
} from './icryptocurrency';


export class Mainnet extends INetwork {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x1f;
  static SCRIPT_ADDRESS_PREFIX = 0x4e;
  static HRP = 'dpn';
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
  static MESSAGE_PREFIX = '\x18DeepOnion Signed Message:\n';
  static WIF_PREFIX = 0x9f;
}

export class DeepOnion extends ICryptocurrency {

  static NAME = 'DeepOnion';
  static SYMBOL = 'ONION';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/deeponion/deeponion',
    WHITEPAPER: 'https://deeponion.org/White-Paper.pdf',
    WEBSITES: [
        'https://deeponion.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.DeepOnion;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = DeepOnion.NETWORKS.MAINNET;
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
  static DEFAULT_HD = DeepOnion.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH',
    'P2WPKH',
    { P2WPKH_IN_P2SH: 'P2WPKH-In-P2SH' }
  ]);
  static DEFAULT_ADDRESS = DeepOnion.ADDRESSES.P2PKH;
}
