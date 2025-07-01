"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.OKTChainAddress = void 0;
const ethereum_1 = require("./ethereum");
const bech32_1 = require("../libs/bech32");
const cryptocurrencies_1 = require("../cryptocurrencies");
const utils_1 = require("../utils");
const address_1 = require("./address");
const exceptions_1 = require("../exceptions");
class OKTChainAddress extends address_1.Address {
    static hrp = cryptocurrencies_1.OKTChain.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'OKT-Chain';
    }
    static encode(publicKey, options = {
        hrp: this.hrp
    }) {
        const baseEth = ethereum_1.EthereumAddress.encode(publicKey, {
            skipChecksumEncode: true
        });
        const ethHexWithoutPrefix = baseEth.slice(2); // strip "0x"
        const bytes = (0, utils_1.getBytes)(ethHexWithoutPrefix);
        const hrp = options.hrp ?? this.hrp;
        const encoded = (0, bech32_1.bech32Encode)(hrp, bytes);
        if (!encoded) {
            throw new exceptions_1.AddressError('Failed to encode OKTChain Bech32 address');
        }
        return encoded;
    }
    static decode(address, options = {
        hrp: this.hrp
    }) {
        const hrp = options.hrp ?? this.hrp;
        const [decodedHrp, data] = (0, bech32_1.bech32Decode)(hrp, address);
        if (!decodedHrp || !data) {
            throw new exceptions_1.AddressError('Failed to decode OKTChain Bech32 address');
        }
        const ethHex = ethereum_1.EthereumAddress.addressPrefix + (0, utils_1.bytesToString)(data);
        return ethereum_1.EthereumAddress.decode(ethHex, {
            skipChecksumEncode: true
        });
    }
}
exports.OKTChainAddress = OKTChainAddress;
//# sourceMappingURL=okt-chain.js.map