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
  ICryptocurrency,
  INetwork
} from './icryptocurrency';


export class Mainnet extends INetwork {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x19;
  static SCRIPT_ADDRESS_PREFIX = 0x3f;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18Blocknode Signed Message:\n';
  static WIF_PREFIX = 0x4b;
}

export class Testnet extends INetwork {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x55;
  static SCRIPT_ADDRESS_PREFIX = 0x7d;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x04358394,
    P2SH: 0x04358394
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x043587cf,
    P2SH: 0x043587cf
  });
  static MESSAGE_PREFIX = '\x18Blocknode Testnet Signed Message:\n';
  static WIF_PREFIX = 0x89;
}

export class Blocknode extends ICryptocurrency {

  static NAME = 'Blocknode';
  static SYMBOL = 'BND';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/blocknodetech/blocknode',
    WEBSITES: [
        'https://blocknode.tech'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Blocknode;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Blocknode.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Blocknode.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Blocknode.ADDRESSES.P2PKH;
}
