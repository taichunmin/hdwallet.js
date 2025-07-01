"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorandEntropy = exports.ALGORAND_ENTROPY_STRENGTHS = void 0;
const entropy_1 = require("./entropy");
exports.ALGORAND_ENTROPY_STRENGTHS = {
    TWO_HUNDRED_FIFTY_SIX: 256
};
class AlgorandEntropy extends entropy_1.Entropy {
    static strengths = [
        exports.ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
    ];
    static getName() {
        return 'Algorand';
    }
}
exports.AlgorandEntropy = AlgorandEntropy;
//# sourceMappingURL=algorand.js.map