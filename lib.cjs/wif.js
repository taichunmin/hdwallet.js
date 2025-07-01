"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeWIF = encodeWIF;
exports.decodeWIF = decodeWIF;
exports.privateKeyToWIF = privateKeyToWIF;
exports.wifToPrivateKey = wifToPrivateKey;
exports.getWIFType = getWIFType;
exports.getWIFChecksum = getWIFChecksum;
const cryptocurrencies_1 = require("./cryptocurrencies");
const base58_1 = require("./libs/base58");
const utils_1 = require("./utils");
const consts_1 = require("./consts");
const crypto_1 = require("./crypto");
const exceptions_1 = require("./exceptions");
function encodeWIF(privateKey, wifPrefix = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.WIF_PREFIX) {
    const keyBytes = (0, utils_1.getBytes)(privateKey);
    if (keyBytes.length !== 32) {
        throw new exceptions_1.ECCError('Invalid private key length', { expected: 32, got: keyBytes.length });
    }
    const prefix = (0, utils_1.integerToBytes)(wifPrefix, 1);
    const compressedSuffix = (0, utils_1.integerToBytes)(consts_1.SLIP10_SECP256K1_CONST.PRIVATE_KEY_COMPRESSED_PREFIX, 1);
    const uncompressedPayload = (0, utils_1.concatBytes)(prefix, keyBytes);
    const compressedPayload = (0, utils_1.concatBytes)(prefix, keyBytes, compressedSuffix);
    return [
        (0, base58_1.encode)((0, utils_1.concatBytes)(uncompressedPayload, (0, crypto_1.getChecksum)(uncompressedPayload))),
        (0, base58_1.encode)((0, utils_1.concatBytes)(compressedPayload, (0, crypto_1.getChecksum)(compressedPayload)))
    ];
}
function decodeWIF(wif, wifPrefix = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.WIF_PREFIX) {
    const raw = (0, base58_1.decode)(wif);
    const prefix = (0, utils_1.integerToBytes)(wifPrefix, 1);
    if (!(0, utils_1.equalBytes)(raw.subarray(0, prefix.length), prefix)) {
        throw new exceptions_1.WIFError('Invalid Wallet Import Format (WIF) prefix');
    }
    const rawWithoutPrefix = raw.subarray(prefix.length);
    const checksum = rawWithoutPrefix.subarray(-4);
    let privateKey = rawWithoutPrefix.subarray(0, -4);
    let wifType = 'wif';
    if (privateKey.length === 33) {
        const compressedPrefix = (0, utils_1.integerToBytes)(consts_1.SLIP10_SECP256K1_CONST.PRIVATE_KEY_COMPRESSED_PREFIX, 1);
        if ((0, utils_1.equalBytes)(privateKey.subarray(-1), compressedPrefix)) {
            privateKey = privateKey.subarray(0, -1);
            wifType = 'wif-compressed';
        }
    }
    else if (privateKey.length !== 32) {
        throw new exceptions_1.WIFError('Invalid WIF length');
    }
    return [privateKey, wifType, checksum];
}
function privateKeyToWIF(privateKey, wifType = 'wif-compressed', wifPrefix = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.WIF_PREFIX) {
    if (!consts_1.WIF_TYPES.getTypes().includes(wifType)) {
        throw new exceptions_1.WIFError('Wrong WIF type', {
            expected: consts_1.WIF_TYPES.getTypes(), got: wifType
        });
    }
    const [wif, wifCompressed] = encodeWIF(privateKey, wifPrefix);
    return wifType === 'wif' ? wif : wifCompressed;
}
function wifToPrivateKey(wif, wifPrefix = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.WIF_PREFIX) {
    return (0, utils_1.bytesToString)(decodeWIF(wif, wifPrefix)[0]);
}
function getWIFType(wif, wifPrefix = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.WIF_PREFIX) {
    return decodeWIF(wif, wifPrefix)[1];
}
function getWIFChecksum(wif, wifPrefix = cryptocurrencies_1.Bitcoin.NETWORKS.MAINNET.WIF_PREFIX) {
    return (0, utils_1.bytesToString)(decodeWIF(wif, wifPrefix)[2]);
}
//# sourceMappingURL=wif.js.map