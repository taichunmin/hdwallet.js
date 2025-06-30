// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Ed25519Blake2bECC } from '../eccs';
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
}

export class Nano extends Cryptocurrency {

  static NAME = 'Nano';
  static SYMBOL = 'XNO';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/nanocurrency/nano-node',
    WHITEPAPER: 'https://nano.org/en/whitepaper',
    WEBSITES: [
      'http://nano.org/en'
    ]
  });
  static ECC = SLIP10Ed25519Blake2bECC;
  static COIN_TYPE = CoinTypes.Nano;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Nano.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Nano.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Nano.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    NANO: 'Nano'
  });
  static DEFAULT_ADDRESS = Nano.ADDRESSES.NANO;
  static SEMANTICS = ['p2pkh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
  static PARAMS = new Params({
    ADDRESS_PREFIX: 'nano_',
    ALPHABET: '13456789abcdefghijkmnopqrstuwxyz',
    PAYLOAD_PADDING_DECODED: '000000',
    PAYLOAD_PADDING_ENCODED: '1111'
  });
}
