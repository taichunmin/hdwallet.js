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
import {
  Cryptocurrency,
  Network
} from './cryptocurrency';


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
  static MESSAGE_PREFIX = '\x18Zcash Signed Message:\n';
  static WIF_PREFIX = 0x80;
}

export class Testnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x00001d25;
  static SCRIPT_ADDRESS_PREFIX = 0x00001cba;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x04358394,
    P2SH: 0x04358394
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x043587cf,
    P2SH: 0x043587cf
  });
  static MESSAGE_PREFIX = '\x18Zcash Signed Message:\n';
  static WIF_PREFIX = 0xef;
}

export class Zcash extends Cryptocurrency {

  static NAME = 'Zcash';
  static SYMBOL = 'ZEC';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/zcash/zcash',
    WHITEPAPER: 'https://github.com/zcash/zips/blob/master/protocol/protocol.pdf',
    WEBSITES: [
      'https://z.cash'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Zcash;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Zcash.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Zcash.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Zcash.ADDRESSES.P2PKH;
}
