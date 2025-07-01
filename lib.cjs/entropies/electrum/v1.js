"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectrumV1Entropy = exports.ELECTRUM_V1_ENTROPY_STRENGTHS = void 0;
const entropy_1 = require("../entropy");
exports.ELECTRUM_V1_ENTROPY_STRENGTHS = {
    ONE_HUNDRED_TWENTY_EIGHT: 128
};
class ElectrumV1Entropy extends entropy_1.Entropy {
    static strengths = [
        exports.ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    ];
    static getName() {
        return 'Electrum-V1';
    }
}
exports.ElectrumV1Entropy = ElectrumV1Entropy;
//# sourceMappingURL=v1.js.map