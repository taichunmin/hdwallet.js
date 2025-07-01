"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiversXAddress = void 0;
const cryptocurrencies_1 = require("../cryptocurrencies");
const bech32_1 = require("../libs/bech32");
const eccs_1 = require("../eccs");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
const address_1 = require("./address");
class MultiversXAddress extends address_1.Address {
    static hrp = cryptocurrencies_1.MultiversX.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'MultiversX';
    }
    static encode(publicKey, options = {
        hrp: this.hrp
    }) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Ed25519PublicKey);
        const raw = pk.getRawCompressed().subarray(1);
        return (0, bech32_1.bech32Encode)(options.hrp ?? this.hrp, (0, utils_1.getBytes)(raw));
    }
    static decode(address, options = {
        hrp: this.hrp
    }) {
        const [hrpGot, data] = (0, bech32_1.bech32Decode)(options.hrp ?? this.hrp, address);
        if (!data) {
            throw new exceptions_1.AddressError('Invalid Bech32 decoding result');
        }
        return (0, utils_1.bytesToString)(data);
    }
}
exports.MultiversXAddress = MultiversXAddress;
//# sourceMappingURL=multiversx.js.map