"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBytes = getBytes;
exports.toBuffer = toBuffer;
exports.hexToBytes = hexToBytes;
exports.bytesToHex = bytesToHex;
exports.bytesToString = bytesToString;
exports.randomBytes = randomBytes;
exports.bytesToInteger = bytesToInteger;
exports.ensureString = ensureString;
exports.stringToInteger = stringToInteger;
exports.equalBytes = equalBytes;
exports.integerToBytes = integerToBytes;
exports.concatBytes = concatBytes;
exports.bytesToBinaryString = bytesToBinaryString;
exports.binaryStringToInteger = binaryStringToInteger;
exports.integerToBinaryString = integerToBinaryString;
exports.binaryStringToBytes = binaryStringToBytes;
exports.isAllEqual = isAllEqual;
exports.generatePassphrase = generatePassphrase;
exports.getHmac = getHmac;
exports.excludeKeys = excludeKeys;
exports.pathToIndexes = pathToIndexes;
exports.indexesToPath = indexesToPath;
exports.normalizeIndex = normalizeIndex;
exports.normalizeDerivation = normalizeDerivation;
exports.indexTupleToInteger = indexTupleToInteger;
exports.indexTupleToString = indexTupleToString;
exports.indexStringToTuple = indexStringToTuple;
exports.xor = xor;
exports.addNoCarry = addNoCarry;
exports.multiplyScalarNoCarry = multiplyScalarNoCarry;
exports.isBitsSet = isBitsSet;
exports.areBitsSet = areBitsSet;
exports.setBit = setBit;
exports.setBits = setBits;
exports.resetBit = resetBit;
exports.resetBits = resetBits;
exports.bytesReverse = bytesReverse;
exports.convertBits = convertBits;
exports.bytesChunkToWords = bytesChunkToWords;
exports.wordsToBytesChunk = wordsToBytesChunk;
exports.toCamelCase = toCamelCase;
exports.ensureTypeMatch = ensureTypeMatch;
const utils_1 = require("@noble/hashes/utils");
const exceptions_1 = require("./exceptions");
function getBytes(data, encoding = 'hex') {
    if (data == null) {
        return new Uint8Array();
    }
    // Already a Uint8Array?
    if (data instanceof Uint8Array) {
        return data;
    }
    // Array of numbers?
    if (Array.isArray(data)) {
        return new Uint8Array(data);
    }
    // From here on: data is a string
    const str = data;
    switch (encoding) {
        case 'hex': {
            // Strip optional 0x/0X
            let s = str.startsWith('0x') || str.startsWith('0X') ? str.slice(2) : str;
            // Pad odd length
            if (s.length % 2 === 1)
                s = '0' + s;
            // Split into byte-pairs and parse
            return Uint8Array.from(s.match(/.{1,2}/g).map(b => parseInt(b, 16)));
        }
        case 'utf8':
            return new TextEncoder().encode(str);
        case 'base64':
            // atob → binary-string → map char codes
            return Uint8Array.from(atob(str), c => c.charCodeAt(0));
        default:
            throw new Error(`Unsupported encoding: ${encoding}`);
    }
}
function toBuffer(input, encoding = 'utf8') {
    if (typeof input === 'string') {
        switch (encoding) {
            case 'utf8':
                // UTF-8 encode a string
                return new TextEncoder().encode(input);
            case 'base64':
                // atob gives a binary‐string; map char→byte
                return Uint8Array.from(atob(input), c => c.charCodeAt(0));
            case 'hex':
                // split every two hex digits → parse → byte
                return Uint8Array.from(input.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            default:
                throw new Error(`Unsupported encoding: ${encoding}`);
        }
    }
    // If it's already an ArrayBuffer or TypedArray
    if (input instanceof ArrayBuffer) {
        return new Uint8Array(input);
    }
    if (ArrayBuffer.isView(input)) {
        return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    }
    // Fallback: try Array-like (e.g. number[])
    return Uint8Array.from(input);
}
function hexToBytes(hex) {
    const normalized = hex.startsWith('0x') ? hex.slice(2) : hex;
    if (normalized.length % 2 !== 0) {
        throw new Error(`Invalid hex string length: ${normalized.length}`);
    }
    const bytes = new Uint8Array(normalized.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(normalized.substr(i * 2, 2), 16);
    }
    return bytes;
}
function bytesToHex(bytes, prefix = false) {
    const hex = Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    return prefix ? `0x${hex}` : hex;
}
function bytesToString(data) {
    if (data == null ||
        (typeof data === 'string' && data.length === 0) ||
        (data instanceof Uint8Array && data.length === 0)) {
        return '';
    }
    if (typeof data === 'string') {
        // If it’s a valid even-length hex string (0–9, A–F, a–f), return it lowercased:
        if (data.length % 2 === 0 && /^[0-9A-Fa-f]+$/.test(data)) {
            return data.toLowerCase();
        }
        // Otherwise treat `data` as UTF-8 text: encode to Uint8Array then to hex
        const encoder = new TextEncoder();
        const bytes = encoder.encode(data);
        return bytesToHex(bytes);
    }
    // Uint8Array case: just convert those bytes to hex
    return bytesToHex(data);
}
function randomBytes(len) {
    if (!Number.isInteger(len) || len <= 0) {
        throw new Error('randomBytes: length must be a positive integer');
    }
    return (0, utils_1.randomBytes)(len);
}
function bytesToInteger(bytes, littleEndian = false) {
    // if little-endian, reverse into a new array
    const data = littleEndian
        ? bytes.slice().reverse()
        : bytes;
    return data.reduce((acc, b) => (acc << BigInt(8)) + BigInt(b), BigInt(0));
}
function ensureString(data) {
    if (data instanceof Uint8Array) {
        return new TextDecoder().decode(data);
    }
    if (typeof data === 'string') {
        return data;
    }
    throw new exceptions_1.TypeError('Invalid value for string');
}
function stringToInteger(data) {
    let buf;
    if (typeof data === 'string') {
        // treat string as hex (even-length hex string)
        buf = hexToBytes(data);
    }
    else {
        buf = data;
    }
    let val = BigInt(0);
    for (let i = 0; i < buf.length; i++) {
        val = (val << BigInt(8)) + BigInt(buf[i]);
    }
    return val;
}
function equalBytes(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
function integerToBytes(value, length, endianness = 'big') {
    // coerce to BigInt without using 0n
    let val = typeof value === 'number' ? BigInt(value) : value;
    if (val < BigInt(0)) {
        throw new Error(`Cannot convert negative integers: ${val}`);
    }
    // build big-endian array
    const bytes = [];
    const ZERO = BigInt(0);
    const SHIFT = BigInt(8);
    const MASK = BigInt(0xff);
    while (val > ZERO) {
        // val & 0xffn  →  val & MASK
        bytes.unshift(Number(val & MASK));
        // val >>= 8n   →  val = val >> SHIFT
        val = val >> SHIFT;
    }
    if (bytes.length === 0) {
        bytes.push(0);
    }
    // pad/truncate
    if (length !== undefined) {
        if (bytes.length > length) {
            throw new Error(`Integer too large to fit in ${length} bytes`);
        }
        while (bytes.length < length) {
            bytes.unshift(0);
        }
    }
    const result = new Uint8Array(bytes);
    return endianness === 'little' ? result.reverse() : result;
}
function concatBytes(...chunks) {
    const totalLength = chunks.reduce((sum, arr) => sum + arr.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}
function bytesToBinaryString(data, zeroPadBits = 0) {
    const bits = Array.from(data)
        .map((b) => b.toString(2).padStart(8, '0'))
        .join('');
    return bits.length < zeroPadBits ? bits.padStart(zeroPadBits, '0') : bits;
}
function binaryStringToInteger(data) {
    const bin = typeof data === 'string'
        ? data
        : bytesToBinaryString(data);
    const clean = bin.trim();
    return BigInt('0b' + clean);
}
function integerToBinaryString(data, zeroPadBits = 0) {
    const big = typeof data === 'bigint' ? data : BigInt(data);
    const bits = big.toString(2);
    return bits.length < zeroPadBits
        ? bits.padStart(zeroPadBits, '0')
        : bits;
}
function binaryStringToBytes(data, zeroPadByteLen = 0) {
    const bits = typeof data === 'string'
        ? data.trim()
        : bytesToBinaryString(data);
    const bitLen = bits.length;
    const val = BigInt('0b' + bits);
    let hex = val.toString(16);
    if (hex.length % 2 === 1) {
        hex = '0' + hex;
    }
    const byteLen = zeroPadByteLen > 0
        ? zeroPadByteLen
        : Math.ceil(bitLen / 8);
    const expectedHexLen = byteLen * 2;
    if (hex.length < expectedHexLen) {
        hex = hex.padStart(expectedHexLen, '0');
    }
    return hexToBytes(hex);
}
function isAllEqual(...inputs) {
    if (inputs.length < 2)
        return true;
    const getTag = (v) => {
        if (typeof v === 'string')
            return 'string';
        if (typeof v === 'number')
            return 'number';
        if (typeof v === 'boolean')
            return 'boolean';
        if (Array.isArray(v)) {
            if (v.every(i => typeof i === 'number'))
                return 'array:number';
            if (v.every(i => typeof i === 'string'))
                return 'array:string';
            if (v.every(i => typeof i === 'boolean'))
                return 'array:boolean';
            return 'array:unknown';
        }
        if (v instanceof Uint8Array)
            return 'uint8array';
        if (v instanceof ArrayBuffer)
            return 'arraybuffer';
        if (ArrayBuffer.isView(v))
            return 'view';
        return 'unknown';
    };
    const firstTag = getTag(inputs[0]);
    if (firstTag === 'unknown' || firstTag === 'array:unknown')
        return false;
    for (const v of inputs.slice(1)) {
        if (getTag(v) !== firstTag)
            return false;
    }
    if (firstTag === 'string' || firstTag === 'number' || firstTag === 'boolean') {
        const first = inputs[0];
        return inputs.every(v => v === first);
    }
    if (firstTag.startsWith('array:')) {
        const firstArr = inputs[0];
        const len = firstArr.length;
        return inputs.slice(1).every(item => {
            const arr = item;
            if (arr.length !== len)
                return false;
            for (let i = 0; i < len; i++) {
                if (arr[i] !== firstArr[i])
                    return false;
            }
            return true;
        });
    }
    const normalize = (v) => {
        if (v instanceof Uint8Array)
            return v;
        if (v instanceof ArrayBuffer)
            return new Uint8Array(v);
        return new Uint8Array(v.buffer, v.byteOffset, v.byteLength);
    };
    const firstArr = normalize(inputs[0]);
    const len = firstArr.byteLength;
    return inputs.slice(1).every(item => {
        const arr = normalize(item);
        if (arr.byteLength !== len)
            return false;
        for (let i = 0; i < len; i++) {
            if (arr[i] !== firstArr[i])
                return false;
        }
        return true;
    });
}
function generatePassphrase(length = 32, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    const bytes = randomBytes(length);
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[bytes[i] % chars.length];
    }
    return result;
}
function getHmac(eccName) {
    const encoder = new TextEncoder();
    if ([
        'Kholaw-Ed25519', 'SLIP10-Ed25519', 'SLIP10-Ed25519-Blake2b', 'SLIP10-Ed25519-Monero',
    ].includes(eccName)) {
        return encoder.encode('ed25519 seed');
    }
    else if (eccName === 'SLIP10-Nist256p1') {
        return encoder.encode('Nist256p1 seed');
    }
    else if (eccName === 'SLIP10-Secp256k1') {
        return encoder.encode('Bitcoin seed');
    }
    throw new exceptions_1.DerivationError('Unknown ECC name');
}
function excludeKeys(nested, keys) {
    const out = {};
    const keySet = new Set(keys); // optional optimization
    for (const [k, v] of Object.entries(nested)) {
        const normKey = k.replace(/-/g, '_');
        if (keySet.has(normKey))
            continue;
        if (v &&
            typeof v === 'object' &&
            !Array.isArray(v) &&
            !(v instanceof Uint8Array) &&
            !(v instanceof Uint8Array)) {
            out[k] = excludeKeys(v, keys);
        }
        else {
            out[k] = v;
        }
    }
    return out;
}
function pathToIndexes(path) {
    if (path === 'm' || path === 'm/')
        return [];
    if (!path.startsWith('m/')) {
        throw new exceptions_1.DerivationError(`Bad path format, expected 'm/0'/0', got '${path}'`);
    }
    return path
        .slice(2)
        .split('/')
        .map(i => i.endsWith("'")
        ? parseInt(i.slice(0, -1), 10) + 0x80000000
        : parseInt(i, 10));
}
function indexesToPath(indexes) {
    return ('m' +
        indexes
            .map(i => i & 0x80000000
            ? `/${(i & ~0x80000000).toString()}'`
            : `/${i.toString()}`)
            .join(''));
}
function normalizeIndex(index, hardened = false) {
    if (typeof index === 'number') {
        if (index < 0)
            throw new exceptions_1.DerivationError(`Bad index: ${index}`);
        return [index, hardened];
    }
    if (typeof index === 'string') {
        const m = index.match(/^(\d+)(?:-(\d+))?$/);
        if (!m) {
            throw new exceptions_1.DerivationError(`Bad index format, got '${index}'`);
        }
        const from = parseInt(m[1], 10);
        const to = m[2] ? parseInt(m[2], 10) : undefined;
        if (to === undefined)
            return [from, hardened];
        if (from > to) {
            throw new exceptions_1.DerivationError(`Range start ${from} > end ${to}`);
        }
        return [from, to, hardened];
    }
    if (Array.isArray(index)) {
        const [a, b] = index;
        if (index.length !== 2 || typeof a !== 'number' || typeof b !== 'number') {
            throw new exceptions_1.DerivationError(`Bad index tuple: ${JSON.stringify(index)}`);
        }
        if (a < 0 || b < 0) {
            throw new exceptions_1.DerivationError(`Negative in tuple: ${index}`);
        }
        if (a > b) {
            throw new exceptions_1.DerivationError(`Range start ${a} > end ${b}`);
        }
        return [a, b, hardened];
    }
    throw new exceptions_1.DerivationError(`Invalid index instance, got ${typeof index}`);
}
function normalizeDerivation(path, indexes) {
    let _path = 'm';
    const _indexes = [];
    const _deriv = [];
    if (indexes && path) {
        throw new exceptions_1.DerivationError('Provide either path or indexes, not both');
    }
    if (indexes) {
        path = indexesToPath(indexes);
    }
    if (!path || path === 'm' || path === 'm/') {
        return [`${_path}/`, _indexes, _deriv];
    }
    if (!path.startsWith('m/')) {
        throw new exceptions_1.DerivationError(`Bad path format, got '${path}'`);
    }
    for (const seg of path.slice(2).split('/')) {
        const hardened = seg.endsWith("'");
        const core = hardened ? seg.slice(0, -1) : seg;
        const parts = core.split('-').map(x => parseInt(x, 10));
        if (parts.length === 2) {
            const [from, to] = parts;
            if (from > to) {
                throw new exceptions_1.DerivationError(`Range start ${from} > end ${to}`);
            }
            _deriv.push([from, to, hardened]);
            _indexes.push(to + (hardened ? 0x80000000 : 0));
            _path += hardened ? `/${to}'` : `/${to}`;
        }
        else {
            const idx = parts[0];
            _deriv.push([idx, hardened]);
            _indexes.push(idx + (hardened ? 0x80000000 : 0));
            _path += hardened ? `/${idx}'` : `/${idx}`;
        }
    }
    return [_path, _indexes, _deriv];
}
function indexTupleToInteger(idx) {
    if (idx.length === 2) {
        const [i, h] = idx;
        return i + (h ? 0x80000000 : 0);
    }
    else {
        const [from, to, h] = idx;
        return to + (h ? 0x80000000 : 0);
    }
}
function indexTupleToString(idx) {
    if (idx.length === 2) {
        const [i, h] = idx;
        return `${i}${h ? "'" : ''}`;
    }
    else {
        const [from, to, h] = idx;
        return `${from}-${to}${h ? "'" : ''}`;
    }
}
function indexStringToTuple(i) {
    const hardened = i.endsWith("'");
    const num = parseInt(hardened ? i.slice(0, -1) : i, 10);
    return [num, hardened];
}
function xor(a, b) {
    if (a.length !== b.length)
        throw new exceptions_1.DerivationError('Uint8Arrays must match length for XOR');
    return getBytes(a.map((x, i) => x ^ b[i]));
}
function addNoCarry(a, b) {
    if (a.length !== b.length)
        throw new exceptions_1.DerivationError('Uint8Arrays must match length for addNoCarry');
    return getBytes(a.map((x, i) => (x + b[i]) & 0xff));
}
function multiplyScalarNoCarry(data, scalar) {
    return getBytes(data.map(x => (x * scalar) & 0xff));
}
function isBitsSet(value, bitNum) {
    return (value & (1 << bitNum)) !== 0;
}
function areBitsSet(value, mask) {
    return (value & mask) !== 0;
}
function setBit(value, bitNum) {
    return value | (1 << bitNum);
}
function setBits(value, mask) {
    return value | mask;
}
function resetBit(value, bitNum) {
    return value & ~(1 << bitNum);
}
function resetBits(value, mask) {
    return value & ~mask;
}
function bytesReverse(data) {
    return getBytes(data).reverse();
}
function convertBits(data, fromBits, toBits) {
    const input = Array.isArray(data) ? data : Array.from(data);
    const maxVal = (1 << toBits) - 1;
    let acc = 0;
    let bits = 0;
    const out = [];
    for (const val of input) {
        if (val < 0 || val >> fromBits) {
            return null;
        }
        acc |= val << bits;
        bits += fromBits;
        while (bits >= toBits) {
            out.push(acc & maxVal);
            acc >>= toBits;
            bits -= toBits;
        }
    }
    if (bits > 0) {
        out.push(acc & maxVal);
    }
    return out;
}
function bytesChunkToWords(bytesChunk, wordsList, endianness) {
    const len = BigInt(wordsList.length);
    let chunkNum = bytesToInteger(new Uint8Array(bytesChunk), endianness !== 'big');
    const i1 = Number(chunkNum % len);
    const i2 = Number(((chunkNum / len) + BigInt(i1)) % len);
    const i3 = Number(((chunkNum / len / len) + BigInt(i2)) % len);
    return [wordsList[i1], wordsList[i2], wordsList[i3]];
}
function wordsToBytesChunk(w1, w2, w3, wordsList, endianness) {
    const len = BigInt(wordsList.length);
    const idxMap = new Map(wordsList.map((w, i) => [w, BigInt(i)]));
    const i1 = idxMap.get(w1);
    const i2 = idxMap.get(w2);
    const i3 = idxMap.get(w3);
    const chunk = i1 + len * ((i2 - i1 + len) % len) + len * len * ((i3 - i2 + len) % len);
    const u8 = integerToBytes(chunk, 4, endianness);
    return getBytes(u8);
}
function toCamelCase(input) {
    return input.toLowerCase().replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}
function ensureTypeMatch(instanceOrClass, expectedType, options = {}) {
    const tryMatch = (type) => {
        if (type === 'any')
            return true;
        if (type === 'null')
            return instanceOrClass === null;
        if (type === 'array')
            return Array.isArray(instanceOrClass);
        if (typeof type === 'string')
            return typeof instanceOrClass === type;
        if (typeof type === 'function') {
            if (typeof instanceOrClass === 'function') {
                let proto = instanceOrClass;
                while (proto && proto !== Function.prototype) {
                    if (proto === type)
                        return true;
                    proto = Object.getPrototypeOf(proto);
                }
                return false;
            }
            return options.strict
                ? instanceOrClass?.constructor === type
                : instanceOrClass instanceof type;
        }
        return false;
    };
    const allExpectedTypes = [expectedType, ...(options.otherTypes || [])];
    const matched = allExpectedTypes.find(tryMatch);
    if (!matched && (options.errorClass || options.otherTypes)) {
        const expectedNames = allExpectedTypes.map((type) => typeof type === 'function' ? type.name : String(type));
        const gotName = typeof instanceOrClass === 'function'
            ? instanceOrClass.name
            : instanceOrClass?.constructor?.name ?? typeof instanceOrClass;
        if (options.errorClass) {
            throw new options.errorClass(`Invalid type`, {
                expected: expectedNames, got: gotName
            });
        }
        else {
            throw new exceptions_1.TypeError(`Invalid type`, {
                expected: expectedNames, got: gotName
            });
        }
    }
    return matched && options.errorClass ? instanceOrClass : {
        value: instanceOrClass, isValid: tryMatch(expectedType)
    };
}
//# sourceMappingURL=utils.js.map