"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2SHAddress = void 0;
const base58_1 = require("../libs/base58");
const consts_1 = require("../consts");
const eccs_1 = require("../eccs");
const cryptocurrencies_1 = require("../cryptocurrencies");
const crypto_1 = require("../crypto");
const exceptions_1 = require("../exceptions");
const utils_1 = require("../utils");
const address_1 = require("./address");
class P2SHAddress extends address_1.Address {
    static scriptAddressPrefix = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX;
    static alphabet = cryptocurrencies_1.Bitcoin.PARAMS.ALPHABET;
    static getName() {
        return 'P2SH';
    }
    static encode(publicKey, options = {
        scriptAddressPrefix: this.scriptAddressPrefix,
        publicKeyType: consts_1.PUBLIC_KEY_TYPES.COMPRESSED,
        alphabet: this.alphabet
    }) {
        const prefixValue = options.scriptAddressPrefix ?? this.scriptAddressPrefix;
        const prefixBytes = (0, utils_1.integerToBytes)(prefixValue);
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.SLIP10Secp256k1PublicKey);
        const rawBytes = options.publicKeyType === consts_1.PUBLIC_KEY_TYPES.UNCOMPRESSED
            ? pk.getRawUncompressed() : pk.getRawCompressed();
        const pubKeyHash = (0, crypto_1.hash160)(rawBytes);
        const redeemScriptHex = '76a914' + (0, utils_1.bytesToString)(pubKeyHash) + '88ac';
        const redeemScript = (0, utils_1.getBytes)(redeemScriptHex);
        const scriptHash = (0, crypto_1.hash160)(redeemScript);
        const payload = (0, utils_1.concatBytes)(prefixBytes, scriptHash);
        const alphabet = options.alphabet ?? this.alphabet;
        return (0, utils_1.ensureString)((0, base58_1.checkEncode)(payload, alphabet));
    }
    static decode(address, options = {
        scriptAddressPrefix: this.scriptAddressPrefix,
        alphabet: this.alphabet
    }) {
        const prefixValue = options.scriptAddressPrefix ?? this.scriptAddressPrefix;
        const prefixBytes = (0, utils_1.getBytes)((0, utils_1.integerToBytes)(prefixValue));
        const alphabet = options.alphabet ?? this.alphabet;
        const decoded = (0, base58_1.checkDecode)(address, alphabet);
        const expectedLen = prefixBytes.length + 20;
        if (decoded.length !== expectedLen) {
            throw new exceptions_1.AddressError('Invalid length', { expected: expectedLen, got: decoded.length });
        }
        const gotPrefix = decoded.slice(0, prefixBytes.length);
        if (!(0, utils_1.equalBytes)(prefixBytes, gotPrefix)) {
            throw new exceptions_1.AddressError('Invalid prefix', { expected: (0, utils_1.bytesToHex)(prefixBytes), got: (0, utils_1.bytesToHex)(gotPrefix) });
        }
        const scriptHash = decoded.slice(prefixBytes.length);
        return (0, utils_1.bytesToString)(scriptHash);
    }
}
exports.P2SHAddress = P2SHAddress;
//# sourceMappingURL=p2sh.js.map