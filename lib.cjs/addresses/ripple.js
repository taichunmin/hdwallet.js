"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.RippleAddress = void 0;
const p2pkh_1 = require("./p2pkh");
const cryptocurrencies_1 = require("../cryptocurrencies");
class RippleAddress extends p2pkh_1.P2PKHAddress {
    static alphabet = cryptocurrencies_1.Ripple.PARAMS.ALPHABET;
    static getName() {
        return 'Ripple';
    }
}
exports.RippleAddress = RippleAddress;
//# sourceMappingURL=ripple.js.map