// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { SLIP10Ed25519MoneroECC } from '../eccs';
import {
  Info,
  Entropies,
  Mnemonics,
  Seeds,
  HDs,
  Addresses,
  AddressTypes,
  Networks,
  Params
} from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Mainnet extends Network {

  static STANDARD = 0x12;
  static INTEGRATED = 0x13;
  static SUB_ADDRESS = 0x2a;
}

export class Stagenet extends Network {

  static STANDARD = 0x18;
  static INTEGRATED = 0x19;
  static SUB_ADDRESS = 0x24;
}

export class Testnet extends Network {

  static STANDARD = 0x35;
  static INTEGRATED = 0x36;
  static SUB_ADDRESS = 0x3f;
}

export class Monero extends Cryptocurrency {

  static NAME = 'Monero';
  static SYMBOL = 'XMR';
  static INFO = new Info({
    SOURCE_CODE: 'https://github.com/monero-project/monero',
    WHITEPAPER: 'https://github.com/monero-project/research-lab/blob/master/whitepaper/whitepaper.pdf',
    WEBSITES: [
      'https://www.getmonero.org'
    ]
  });
  static ECC = SLIP10Ed25519MoneroECC;
  static COIN_TYPE = CoinTypes.Monero;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    STAGENET: Stagenet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Monero.NETWORKS.MAINNET;
  static ENTROPIES = new Entropies([
    { MONERO: 'Monero' },
    'BIP39'
  ]);
  static MNEMONICS = new Mnemonics([
    { MONERO: 'Monero' },
    'BIP39'
  ]);
  static SEEDS = new Seeds([
    { MONERO: 'Monero' },
    'BIP39'
  ]);
  static HDS = new HDs({
    MONERO: 'Monero'
  });
  static DEFAULT_HD = Monero.HDS.MONERO;
  static DEFAULT_PATH = `m/44'/${Monero.COIN_TYPE}'/0'/0/0`;
  static ADDRESSES = new Addresses({
    MONERO: 'Monero'
  });
  static DEFAULT_ADDRESS = Monero.ADDRESSES.MONERO;
  static ADDRESS_TYPES = new AddressTypes({
    STANDARD: 'standard',
    INTEGRATED: 'integrated',
    SUB_ADDRESS: 'sub-address'
  });
  static DEFAULT_ADDRESS_TYPE = Monero.ADDRESS_TYPES.STANDARD;
  static PARAMS = new Params({
    CHECKSUM_LENGTH: 0x04,
    PAYMENT_ID_LENGTH: 0x08
  });
}
