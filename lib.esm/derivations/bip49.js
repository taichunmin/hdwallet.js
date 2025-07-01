// SPDX-License-Identifier: MIT
import { BIP44Derivation, CHANGES } from './bip44';
import { Bitcoin } from '../cryptocurrencies';
export class BIP49Derivation extends BIP44Derivation {
    purpose = [49, true];
    constructor(options = {
        coinType: Bitcoin.COIN_TYPE, account: 0, change: CHANGES.EXTERNAL_CHAIN, address: 0
    }) {
        super(options);
        this.updateDerivation();
    }
    static getName() {
        return 'BIP49';
    }
}
//# sourceMappingURL=bip49.js.map