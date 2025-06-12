// SPDX-License-Identifier: MIT
import { OKTChainAddress } from './okt-chain';
import { Harmony } from '../cryptocurrencies';
export class HarmonyAddress extends OKTChainAddress {
    static hrp = Harmony.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'Harmony';
    }
}
//# sourceMappingURL=harmony.js.map