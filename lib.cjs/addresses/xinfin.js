"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.XinFinAddress = void 0;
const ethereum_1 = require("./ethereum");
const cryptocurrencies_1 = require("../cryptocurrencies");
class XinFinAddress extends ethereum_1.EthereumAddress {
    static addressPrefix = cryptocurrencies_1.XinFin.PARAMS.ADDRESS_PREFIX;
    static getName() {
        return 'XinFin';
    }
}
exports.XinFinAddress = XinFinAddress;
//# sourceMappingURL=xinfin.js.map