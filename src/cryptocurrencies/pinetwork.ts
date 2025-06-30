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
}

export class PiNetwork extends Cryptocurrency {

  static NAME = 'Pi-Network';
  static SYMBOL = 'PI';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/pi-apps',
    WHITEPAPER: 'https://minepi.com/white-paper',
    WEBSITES: [
      'https://minepi.com'
    ]
  });
  static ECC = SLIP10Ed25519ECC;
  static COIN_TYPE = CoinTypes.PiNetwork;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = PiNetwork.NETWORKS.MAINNET;
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
  static DEFAULT_HD = PiNetwork.HDS.BIP44;
  static DEFAULT_PATH = `m/44'/${PiNetwork.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    STELLAR: 'Stellar'
  });
  static DEFAULT_ADDRESS = PiNetwork.ADDRESSES.STELLAR;
  static SEMANTICS = ['p2pkh'];
  static DEFAULT_SEMANTIC = 'p2pkh';
  static ADDRESS_TYPES = new AddressTypes({
    PRIVATE_KEY: 'private_key',
    PUBLIC_KEY: 'public_key'
  });
  static DEFAULT_ADDRESS_TYPE = PiNetwork.ADDRESS_TYPES.PUBLIC_KEY;
  static PARAMS = new Params({
    CHECKSUM_LENGTH: 0x02,
    ADDRESS_TYPES: {
      PRIVATE_KEY: 18 << 3,
        PUBLIC_KEY: 6 << 3
    }
  });
}
