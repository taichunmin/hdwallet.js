"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarmonyAddress = void 0;
const okt_chain_1 = require("./okt-chain");
const cryptocurrencies_1 = require("../cryptocurrencies");
class HarmonyAddress extends okt_chain_1.OKTChainAddress {
    static hrp = cryptocurrencies_1.Harmony.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'Harmony';
    }
}
exports.HarmonyAddress = HarmonyAddress;
//# sourceMappingURL=harmony.js.map