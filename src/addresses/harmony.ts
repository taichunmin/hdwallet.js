// SPDX-License-Identifier: MIT

import { OKTChainAddress } from './okt-chain';
import { Harmony } from '../cryptocurrencies';
import { Address } from './address';

export class HarmonyAddress extends OKTChainAddress implements Address {

  static hrp: string = Harmony.NETWORKS.MAINNET.HRP;

  static getName(): string {
    return 'Harmony';
  }
}
