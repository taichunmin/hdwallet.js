// SPDX-License-Identifier: MIT
import { P2PKHAddress } from './p2pkh';
import { Ripple } from '../cryptocurrencies';
export class RippleAddress extends P2PKHAddress {
    static alphabet = Ripple.PARAMS.ALPHABET;
    static getName() {
        return 'Ripple';
    }
}
//# sourceMappingURL=ripple.js.map