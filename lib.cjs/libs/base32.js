"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeNoPadding = void 0;
exports.encode = encode;
exports.decode = decode;
const tslib_1 = require("tslib");
// @ts-ignore: no declaration file for 'base32.js'
const base32 = tslib_1.__importStar(require("base32.js"));
const utils_1 = require("../utils");
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const translate = (s, from, to) => s.split('')
    .map(c => {
    const i = from.indexOf(c);
    return i === -1 ? c : to[i];
})
    .join('');
const pad = (s) => (s.length % 8 ? s + '='.repeat(8 - (s.length % 8)) : s);
function encode(hex, customAlphabet) {
    const bytes = (0, utils_1.hexToBytes)(hex);
    const encoder = new base32.Encoder({ type: 'rfc4648', alphabet: ALPHABET });
    const b32 = encoder.write(bytes).finalize().toUpperCase(); // base32.js returns lower
    return customAlphabet ? translate(b32, ALPHABET, customAlphabet) : b32;
}
const encodeNoPadding = (hex, alpha) => encode(hex, alpha).replace(/=+$/, '');
exports.encodeNoPadding = encodeNoPadding;
function decode(data, customAlphabet) {
    try {
        let inp = pad(data);
        if (customAlphabet) {
            inp = translate(inp, customAlphabet, ALPHABET);
        }
        const dec = new base32.Decoder({ type: 'rfc4648', alphabet: ALPHABET });
        const bytes = dec.write(inp).finalize();
        return (0, utils_1.bytesToHex)(bytes);
    }
    catch {
        throw new Error('Invalid Base32 string');
    }
}
//# sourceMappingURL=base32.js.map