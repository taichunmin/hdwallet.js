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
  static SCRIPT_ADDRESS_PREFIX = 0x57;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x048894ed,
    P2SH: 0x048894ed
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x04887f1e,
    P2SH: 0x04887f1e
  });
  static MESSAGE_PREFIX = '\x18Whitecoin Signed Message:\n';
  static WIF_PREFIX = 0xc9;
}

export class Whitecoin extends Cryptocurrency {

  static NAME = 'Whitecoin';
  static SYMBOL = 'XWC';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/Whitecoin-XWC/Whitecoin-core',
    WHITEPAPER: 'https://www.whitecoin.info/pdf/Whitecoin%20Technical%20White%20Paper_en.pdf',
    WEBSITES: [
      'http://whitecoin.info',
        'http://xwc.com'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Whitecoin;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Whitecoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Whitecoin.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Whitecoin.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Whitecoin.ADDRESSES.P2PKH;
  static DEFAULT_SEMANTIC = 'p2pkh';
}
