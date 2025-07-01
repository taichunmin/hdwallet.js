"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIP84Derivation = void 0;
const bip44_1 = require("./bip44");
const cryptocurrencies_1 = require("../cryptocurrencies");
class BIP84Derivation extends bip44_1.BIP44Derivation {
    purpose = [84, true];
    constructor(options = {
        coinType: cryptocurrencies_1.Bitcoin.COIN_TYPE, account: 0, change: bip44_1.CHANGES.EXTERNAL_CHAIN, address: 0
    }) {
        super(options);
        this.updateDerivation();
    }
    static getName() {
        return 'BIP84';
    }
}
exports.BIP84Derivation = BIP84Derivation;
//# sourceMappingURL=bip84.js.map