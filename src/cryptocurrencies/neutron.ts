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

  static HRP = 'neutron';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({ P2PKH: 0x0488ade4 });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({ P2PKH: 0x0488b21e });
  static WIF_PREFIX = 0x80;
}

export class Neutron extends ICryptocurrency {

  static NAME = 'Neutron';
  static SYMBOL = 'NTRN';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/neutron-org',
    WHITEPAPER: 'https://docs.neutron.org',
    WEBSITES: [
        'https://www.neutron.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Neutron;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = Neutron.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Neutron.HDS.BIP44;
  static ADDRESSES = new Addresses({ COSMOS: 'Cosmos' });
  static DEFAULT_ADDRESS = Neutron.ADDRESSES.COSMOS;
}
