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
  Params,
  XPrivateKeyVersions,
  XPublicKeyVersions
} from '../const';
import {
  ICryptocurrency,
  INetwork
} from './icryptocurrency';


export class Mainnet extends INetwork {

  static PUBLIC_KEY_ADDRESS_PREFIX = 0x00;
  static SCRIPT_ADDRESS_PREFIX = 0x00;
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0488ade4,
    P2SH: 0x0488ade4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e,
    P2SH: 0x0488b21e
  });
  static MESSAGE_PREFIX = null;
  static WIF_PREFIX = 0x80;
}

export class Ripple extends ICryptocurrency {

  static NAME = 'Ripple';
  static SYMBOL = 'XRP';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/ripple/rippled',
    WHITEPAPER: 'https://ripple.com/files/ripple_consensus_whitepaper.pdf',
    WEBSITES: [
        'https://xrpl.org'
    ]
  });
  static ECC = SLIP10Secp256k1ECC;
  static COIN_TYPE = CoinTypes.Ripple;
  static SUPPORT_BIP38 = true;
  static NETWORKS = new Networks({ MAINNET: Mainnet });
  static DEFAULT_NETWORK = Ripple.NETWORKS.MAINNET;
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
  static DEFAULT_HD = Ripple.HDS.BIP44;
  static ADDRESSES = new Addresses({ RIPPLE: 'Ripple' });
  static DEFAULT_ADDRESS = Ripple.ADDRESSES.RIPPLE;
  static PARAMS = new Params({ ALPHABET: 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz' });
}
