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
  Params,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static NAME = 'mainnet';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
  static WIF_PREFIX = 0x80;
}

export class Ethereum extends Cryptocurrency {

  static NAME = 'Ethereum';
  static SYMBOL = 'ETH';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/ethereum/go-ethereum',
    WHITEPAPER: 'https://github.com/ethereum/wiki/wiki/White-Paper',
    WEBSITES: [
      'https://www.ethereum.org',
        'https://en.wikipedia.org/wiki/Ethereum'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Ethereum;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Ethereum.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Ethereum.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Ethereum.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    ETHEREUM: 'Ethereum'
  });
  static DEFAULT_ADDRESS = Ethereum.ADDRESSES.ETHEREUM;
  static SEMANTICS = ['p2pkh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
  static PARAMS = new Params({
    ADDRESS_PREFIX: '0x'
  });
}
