"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.checksumEncode = checksumEncode;
exports.encode = encode;
exports.checkEncode = checkEncode;
exports.decode = decode;
exports.checkDecode = checkDecode;
exports.pad = pad;
exports.encodeMonero = encodeMonero;
exports.decodeMonero = decodeMonero;
const crypto_1 = require("../crypto");
const utils_1 = require("../utils");
function checksumEncode(address, crypto = 'eth') {
    const prefix = crypto === 'eth' ? '0x' : 'xdc';
    // lower-case and strip “0x” or “xdc” prefix
    let addr = address.toLowerCase().replace(/^0x|^xdc/, '');
    // keccak256 expects a Uint8Array of ASCII bytes, so convert hex chars to their char codes
    const asciiBytes = new Uint8Array(addr.length);
    for (let i = 0; i < addr.length; i++) {
        asciiBytes[i] = addr.charCodeAt(i);
    }
    const hashHex = (0, utils_1.bytesToString)((0, crypto_1.keccak256)(asciiBytes)); // 64-char hex of the 32-byte keccak
    let out = '';
    for (let i = 0; i < addr.length; i++) {
        const c = addr[i];
        // hashHex[i] is a hex character; parse its value 0–15
        out += parseInt(hashHex[i], 16) >= 8 ? c.toUpperCase() : c;
    }
    return prefix + out;
}
function encode(data, alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz') {
    const buf = typeof data === 'string' ? (0, utils_1.hexToBytes)(data) : data;
    let val = (0, utils_1.stringToInteger)(buf);
    const base = BigInt(alphabet.length);
    let enc = '';
    // convert to Base58 digits
    while (val >= base) {
        const mod = Number(val % base);
        enc = alphabet[mod] + enc;
        val = val / base;
    }
    if (val > BigInt(0)) {
        enc = alphabet[Number(val)] + enc;
    }
    // preserve leading zero bytes
    let leading = 0;
    for (const b of buf) {
        if (b === 0)
            leading++;
        else
            break;
    }
    return alphabet[0].repeat(leading) + enc;
}
function checkEncode(raw, alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz') {
    const buf = typeof raw === 'string' ? (0, utils_1.hexToBytes)(raw) : raw;
    const hash1 = (0, crypto_1.sha256)(buf);
    const hash2 = (0, crypto_1.sha256)(hash1);
    const chk = hash2.slice(0, 4); // first 4 bytes
    const payload = (0, utils_1.concatBytes)(buf, chk);
    return encode(payload, alphabet);
}
function decode(input, alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz') {
    let val = BigInt(0);
    let prefixZeros = 0;
    // for each Base58 character, accumulate into a big integer
    for (const char of input) {
        const idx = alphabet.indexOf(char);
        if (idx < 0) {
            throw new Error(`Invalid Base58 character '${char}'`);
        }
        val = val * BigInt(alphabet.length) + BigInt(idx);
        if (val === BigInt(0)) {
            prefixZeros++;
        }
    }
    // convert big integer into bytes (big-endian)
    const outBytes = [];
    while (val > BigInt(0)) {
        const mod = Number(val % BigInt(256));
        outBytes.push(mod);
        val = val / BigInt(256);
    }
    // restore leading zero bytes
    for (let i = 0; i < prefixZeros; i++) {
        outBytes.push(0);
    }
    return new Uint8Array(outBytes.reverse());
}
function checkDecode(enc, alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz') {
    const full = decode(enc, alphabet);
    if (full.length < 5) {
        throw new Error('Input too short for Base58Check');
    }
    const raw = full.slice(0, full.length - 4);
    const chk = full.slice(full.length - 4);
    const hash1 = (0, crypto_1.sha256)(raw);
    const hash2 = (0, crypto_1.sha256)(hash1);
    const expected = hash2.slice(0, 4);
    if (!(0, utils_1.equalBytes)(chk, expected)) {
        throw new Error('Base58Check checksum failed');
    }
    return raw;
}
function pad(enc, padLen, alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz') {
    return enc.padStart(padLen, alphabet[0]);
}
function encodeMonero(data) {
    const blockEncLen = 11;
    const blockDecLen = 8;
    // sizes[k] = encoded length for a k-byte block
    const sizes = [0, 2, 3, 5, 6, 7, 9, 10, 11];
    const buf = data;
    const fullBlocks = Math.floor(buf.length / blockDecLen);
    const lastLen = buf.length % blockDecLen;
    let out = '';
    for (let i = 0; i < fullBlocks; i++) {
        const block = buf.slice(i * blockDecLen, (i + 1) * blockDecLen);
        out += pad(encode(block), blockEncLen);
    }
    if (lastLen > 0) {
        const block = buf.slice(fullBlocks * blockDecLen);
        out += pad(encode(block), sizes[lastLen]);
    }
    return out;
}
function unpad(dec, unpadLen) {
    return dec.slice(dec.length - unpadLen);
}
function decodeMonero(data) {
    const blockEncLen = 11;
    const blockDecLen = 8;
    const sizes = [0, 2, 3, 5, 6, 7, 9, 10, 11];
    const fullBlocks = Math.floor(data.length / blockEncLen);
    const lastEncLen = data.length % blockEncLen;
    const lastDecLen = sizes.indexOf(lastEncLen);
    const out = [];
    for (let i = 0; i < fullBlocks; i++) {
        const chunk = data.slice(i * blockEncLen, (i + 1) * blockEncLen);
        const dec = decode(chunk);
        out.push(...unpad(dec, blockDecLen));
    }
    if (lastEncLen > 0) {
        const chunk = data.slice(fullBlocks * blockEncLen);
        const dec = decode(chunk);
        out.push(...unpad(dec, lastDecLen));
    }
    return new Uint8Array(out);
}
//# sourceMappingURL=base58.js.map