"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP49Derivation = void 0;
const bip44_1 = require("./bip44");
const cryptocurrencies_1 = require("../cryptocurrencies");
class BIP49Derivation extends bip44_1.BIP44Derivation {
    purpose = [49, true];
    constructor(options = {
        coinType: cryptocurrencies_1.Bitcoin.COIN_TYPE, account: 0, change: bip44_1.CHANGES.EXTERNAL_CHAIN, address: 0
    }) {
        super(options);
        this.updateDerivation();
    }
    static getName() {
        return 'BIP49';
    }
}
exports.BIP49Derivation = BIP49Derivation;
//# sourceMappingURL=bip49.js.map