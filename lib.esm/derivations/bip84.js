// SPDX-License-Identifier: MIT
import { BIP44Derivation, CHANGES } from './bip44';
import { Bitcoin } from '../cryptocurrencies';
export class BIP84Derivation extends BIP44Derivation {
    purpose = [84, true];
    constructor(options = {
        coinType: Bitcoin.COIN_TYPE, account: 0, change: CHANGES.EXTERNAL_CHAIN, address: 0
    }) {
        super(options);
        this.updateDerivation();
    }
    static getName() {
        return 'BIP84';
    }
}
//# sourceMappingURL=bip84.js.map