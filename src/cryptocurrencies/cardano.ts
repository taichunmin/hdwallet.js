// SPDX-License-Identifier: MIT

import { CoinTypes } from '../slip44';
import { KholawEd25519ECC } from '../ecc';
import {
  Info,
  NestedNamespace,
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
} from '../const';
import { Cryptocurrency, Network } from './cryptocurrency';

export class Types extends NestedNamespace {

  getCardanoTypes(): string[] {
    return Object.values(this as any) as string[]
  }

  isCardanoType(type: string): boolean {
    return this.getCardanoTypes().includes(type)
  }
}

export class Mainnet extends Network {

  static TYPE = 0x01;
  static PAYMENT_ADDRESS_HRP = 'addr';
  static REWARD_ADDRESS_HRP = 'stake';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x0f4331d4
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x0488b21e
  });
}

export class Testnet extends Network {

  static TYPE = 0x00;
  static PAYMENT_ADDRESS_HRP = 'addr_test';
  static REWARD_ADDRESS_HRP = 'stake_test';
  static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
    P2PKH: 0x04358394
  });
  static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
    P2PKH: 0x043587cf
  });
}

export class Cardano extends Cryptocurrency {

  static NAME = 'Cardano';
  static SYMBOL = 'ADA';
  static INFO = new Info({
    SOURCE_CODE: 'https://cardanoupdates.com',
    WHITEPAPER: 'https://docs.cardano.org/en/latest',
    WEBSITES: [
      'https://www.cardano.org'
    ]
  });
  static ECC = KholawEd25519ECC;
  static COIN_TYPE = CoinTypes.Cardano;
  static SUPPORT_BIP38 = false;
  static NETWORKS = new Networks({
    MAINNET: Mainnet,
    TESTNET: Testnet
  });
  static DEFAULT_NETWORK = Cardano.NETWORKS.MAINNET;
  static ENTROPIES = new Entropies([
    'BIP39'
  ]);
  static MNEMONICS = new Mnemonics([
    'BIP39'
  ]);
  static SEEDS = new Seeds({
    CARDANO: 'Cardano'
  });
  static HDS = new HDs({
    CARDANO: 'Cardano'
  });
  static DEFAULT_HD = Cardano.HDS.CARDANO;
  static DEFAULT_PATH = `m/44'/${Cardano.COIN_TYPE}'/0'/0/0`;
  static TYPES = new Types({
    BYRON_ICARUS: 'byron-icarus',
    BYRON_LEDGER: 'byron-ledger',
    BYRON_LEGACY: 'byron-legacy',
    SHELLEY_ICARUS: 'shelley-icarus',
    SHELLEY_LEDGER: 'shelley-ledger'
  });
  static ADDRESSES = new Addresses({
    CARDANO: 'Cardano'
  });
  static DEFAULT_ADDRESS = Cardano.ADDRESSES.CARDANO;
  static ADDRESS_TYPES = new AddressTypes({
    PUBLIC_KEY: 'public-key',
    REDEMPTION: 'redemption',
    PAYMENT: 'payment',
    STAKING: 'staking',
    REWARD: 'reward'
  });
  static PARAMS = new Params({
    PUBLIC_KEY_ADDRESS: 0x00,
    REDEMPTION_ADDRESS: 0x02,
    PAYMENT_PREFIX: 0x00,
    REWARD_PREFIX: 0x0e
  });
}
