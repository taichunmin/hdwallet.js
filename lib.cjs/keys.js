"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = serialize;
exports.deserialize = deserialize;
exports.isValidKey = isValidKey;
exports.isRootKey = isRootKey;
const base58_1 = require("./libs/base58");
const utils_1 = require("./utils");
const exceptions_1 = require("./exceptions");
function serialize(version, depth, parentFingerprint, index, chainCode, key, encoded = false) {
    try {
        // 1. versionBytes: exactly 4 bytes
        const versionBytes = typeof version === 'number'
            ? (0, utils_1.integerToBytes)(version, 4)
            : (0, utils_1.getBytes)(version);
        // 2. depthByte: 1 byte
        if (depth < 0 || depth > 0xff) {
            throw new exceptions_1.ExtendedKeyError(`Depth must be 0–255; got ${depth}`);
        }
        const depthByte = (0, utils_1.integerToBytes)(depth, 1);
        // 3. parentFingerprintBytes: exactly 4 bytes
        const parentBytes = (0, utils_1.getBytes)(parentFingerprint);
        if (parentBytes.length !== 4) {
            throw new exceptions_1.ExtendedKeyError(`Parent fingerprint must be 4 bytes; got ${parentBytes.length}`);
        }
        // 4. indexBytes: exactly 4 bytes, big-endian
        if (!Number.isInteger(index) || index < 0 || index > 0xffffffff) {
            throw new exceptions_1.ExtendedKeyError(`Index must be 0–2^32-1; got ${index}`);
        }
        const indexBytes = (0, utils_1.integerToBytes)(index, 4);
        // 5. chainCodeBytes: exactly 32 bytes
        const chainBytes = (0, utils_1.getBytes)(chainCode);
        if (chainBytes.length !== 32) {
            throw new exceptions_1.ExtendedKeyError(`Chain code must be 32 bytes; got ${chainBytes.length}`);
        }
        // 6. keyBytes: exactly 33 bytes
        const keyBytes = (0, utils_1.getBytes)(key);
        if (keyBytes.length !== 33) {
            throw new exceptions_1.ExtendedKeyError(`Key data must be 33 bytes; got ${keyBytes.length}`);
        }
        // 7. Concatenate all parts in order
        const raw = (0, utils_1.concatBytes)(versionBytes, // 4 bytes
        depthByte, // 1 byte
        parentBytes, // 4 bytes
        indexBytes, // 4 bytes
        chainBytes, // 32 bytes
        keyBytes // 33 bytes
        );
        // 8. Return Base58Check if requested, else hex string
        return encoded ? (0, base58_1.checkEncode)(raw) : (0, utils_1.bytesToString)(raw);
    }
    catch (err) {
        return null;
    }
}
function deserialize(key, encoded = true) {
    // 1. Decode Base58Check if needed, otherwise parse hex
    const rawBytes = encoded ? (0, base58_1.checkDecode)(key) : (0, utils_1.getBytes)(key);
    // 2. Ensure total length is exactly 78 bytes
    if (![78, 110].includes(rawBytes.length)) {
        throw new exceptions_1.ExtendedKeyError('Invalid extended key length', { expected: [78, 110], got: rawBytes.length });
    }
    // 3. Parse fields at known offsets
    const version = rawBytes.slice(0, 4); // 4 bytes
    const depth = rawBytes[4]; // 1 byte
    const parentFingerprint = rawBytes.slice(5, 9); // 4 bytes
    // Index: bytes 9..13 → big-endian uint32
    const indexView = new DataView(rawBytes.buffer, rawBytes.byteOffset + 9, 4);
    const index = indexView.getUint32(0, false); // false = big-endian
    const chainCode = rawBytes.slice(13, 45); // 32 bytes
    const keyData = rawBytes.slice(45);
    return [version, depth, parentFingerprint, index, chainCode, keyData];
}
function isValidKey(key, encoded = true) {
    try {
        deserialize(key, encoded);
        return true;
    }
    catch {
        return false;
    }
}
function isRootKey(key, encoded = true) {
    if (!isValidKey(key, encoded)) {
        throw new exceptions_1.ExtendedKeyError('Invalid extended(x) key');
    }
    const [_, depth, parentFingerprint, index] = deserialize(key, encoded);
    // Check that depth === 0, parentFingerprint is all zero bytes, and index === 0
    const zeroFingerprint = new Uint8Array(4); // [0,0,0,0]
    return depth === 0 && (0, utils_1.equalBytes)(parentFingerprint, zeroFingerprint) && index === 0;
}
//# sourceMappingURL=keys.js.map