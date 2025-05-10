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
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x21;
  static SCRIPT_ADDRESS_PREFIX = 0x35;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0xd7dc6e9f,
    P2SH: 0xd7dc6e9f
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x03b8c856,
    P2SH: 0x03b8c856
  });
  static MESSAGE_PREFIX = 'DarkCoin Signed Message:\n';
  static WIF_PREFIX = 0x6a;
}

export class Energi extends Cryptocurrency {

  static NAME = 'Energi';
  static SYMBOL = 'NRG';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/energcryptocurrency/go-energi',
    WHITEPAPER: 'https://www.energi.world/whitepaper',
    WEBSITES: [
      'https://energi.world',
        'https://www.energiswap.exchange'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Energi;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({
    MAINNET: Mainnet
  });
  static DEFAULT_NETWORK = Energi.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Energi.HDS.BIP44;
  static ADDRESSES = new Addresses([
    'P2PKH',
    'P2SH'
  ]);
  static DEFAULT_ADDRESS = Energi.ADDRESSES.P2PKH;
}
