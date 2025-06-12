"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneroEntropy = exports.MONERO_ENTROPY_STRENGTHS = void 0;
const entropy_1 = require("./entropy");
exports.MONERO_ENTROPY_STRENGTHS = {
    ONE_HUNDRED_TWENTY_EIGHT: 128,
    TWO_HUNDRED_FIFTY_SIX: 256
};
class MoneroEntropy extends entropy_1.Entropy {
    static strengths = [
        exports.MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
        exports.MONERO_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    ];
    static getName() {
        return 'Monero';
    }
}
exports.MoneroEntropy = MoneroEntropy;
//# sourceMappingURL=monero.js.map