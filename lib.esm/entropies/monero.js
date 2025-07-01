// SPDX-License-Identifier: MIT
import { Entropy } from './entropy';
export const MONERO_ENTROPY_STRENGTHS = {
    ONE_HUNDRED_TWENTY_EIGHT: 128,
    TWO_HUNDRED_FIFTY_SIX: 256
};
export class MoneroEntropy extends Entropy {
    static strengths = [
        MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
        MONERO_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    ];
    static getName() {
        return 'Monero';
    }
}
//# sourceMappingURL=monero.js.map