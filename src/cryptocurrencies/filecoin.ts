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
  AddressTypes,
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

export class Filecoin extends Cryptocurrency {

  static NAME = 'Filecoin';
  static SYMBOL = 'FIL';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/filecoin-project',
    WHITEPAPER: 'https://docs.filecoin.io',
    WEBSITES: [
      'https://filecoin.io'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Filecoin;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Filecoin.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Filecoin.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${Filecoin.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    FILECOIN: 'Filecoin'
  });
  static DEFAULT_ADDRESS = Filecoin.ADDRESSES.FILECOIN;
  static DEFAULT_SEMANTIC = 'p2pkh';
  static ADDRESS_TYPES = new AddressTypes({
    SECP256K1: 'secp256k1',
    BLS: 'bls'
  });
  static DEFAULT_ADDRESS_TYPE = Filecoin.ADDRESS_TYPES.SECP256K1;
  static PARAMS = new Params({
    ALPHABET: 'abcdefghijklmnopqrstuvwxyz234567',
    ADDRESS_PREFIX: 'f',
    ADDRESS_TYPES: {
      SECP256K1: 0x01,
        BLS: 0x03
    }
  });
}
