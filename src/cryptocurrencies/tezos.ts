// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Ed25519ECC } from '../eccs';
import {
  Info,
  Entropies,
  Mnemonics,
  Seeds,
  HDs,
  Addresses,
  AddressPrefixes,
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

export class Tezos extends Cryptocurrency {

  static NAME = 'Tezos';
  static SYMBOL = 'XTZ';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/tezos/tezos',
    WHITEPAPER: 'https://tezos.com/whitepaper.pdf',
    WEBSITES: [
      'https://www.tezos.com'
    ]
  });
  static ECC = SLIP10Ed25519ECC;
  static COIN_TYPE = CoinTypes.Tezos;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Tezos.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Tezos.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Tezos.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    TEZOS: 'Tezos'
  });
  static DEFAULT_ADDRESS = Tezos.ADDRESSES.TEZOS;
  static SEMANTICS = ['p2pkh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
  static ADDRESS_PREFIXES = new AddressPrefixes({
    TZ1: 'tz1',
    TZ2: 'tz2',
    TZ3: 'tz3'
  });
  static DEFAULT_ADDRESS_PREFIX = Tezos.ADDRESS_PREFIXES.TZ1;
  static PARAMS = new Params({
    ADDRESS_PREFIXES: {
      TZ1: '06a19f',
      TZ2: '06a1a1',
      TZ3: '06a1a4'
    }
  });
}
