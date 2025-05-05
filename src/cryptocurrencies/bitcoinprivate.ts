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

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x00001325;
  static SCRIPT_ADDRESS_PREFIX = 0x000013af;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = '\x18BitcoinPrivate Signed Message:\n';
  static WIF_PREFIX = 0x80;
}

export class Testnet extends INetwork {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x00001957;
  static SCRIPT_ADDRESS_PREFIX = 0x000019e0;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x04358394,
    P2SH: 0x04358394
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x043587cf,
    P2SH: 0x043587cf
  });
  static MESSAGE_PREFIX = '\x18BitcoinPrivate Signed Message:\n';
  static WIF_PREFIX = 0xef;
}

export class BitcoinPrivate extends ICryptocurrency {

  static NAME = 'Bitcoin-Private';
  static SYMBOL = 'BTCP';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/BTCPrivate/BitcoinPrivate',
    WHITEPAPER: 'https://btcprivate.org/whitepaper.pdf',
    WEBSITES: [
        'https://btcprivate.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.BitcoinPrivate;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = BitcoinPrivate.NETWORKS.MAINNET;
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
  static DEFAULT_HD = BitcoinPrivate.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = BitcoinPrivate.ADDRESSES.P2PKH;
}
