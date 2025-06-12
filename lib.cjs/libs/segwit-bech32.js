"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseBech32Encode = baseBech32Encode;
exports.baseBech32Decode = baseBech32Decode;
exports.bech32Encode = bech32Encode;
exports.bech32Decode = bech32Decode;
exports.segwitEncode = segwitEncode;
exports.segwitDecode = segwitDecode;
const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const CHARSET_REV = CHARSET
    .split('')
    .reduce((map, char, i) => ((map[char] = i), map), {});
function bech32Polymod(values) {
    const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
    let chk = 1;
    for (const value of values) {
        const top = chk >>> 25;
        chk = ((chk & 0x1ffffff) << 5) ^ value;
        for (let i = 0; i < 5; i++) {
            if ((top >>> i) & 1)
                chk ^= GENERATOR[i];
        }
    }
    return chk;
}
function bech32HrpExpand(hrp) {
    return [
        ...hrp.split('').map(c => c.charCodeAt(0) >>> 5),
        0,
        ...hrp.split('').map(c => c.charCodeAt(0) & 31)
    ];
}
function bech32CreateChecksum(hrp, data) {
    const encoding = data[0] === 0 ? 1 : 0x2bc830a3;
    const values = [...bech32HrpExpand(hrp), ...data];
    const polymod = bech32Polymod([...values, 0, 0, 0, 0, 0, 0]) ^ encoding;
    return Array.from({ length: 6 }, (_, i) => (polymod >>> (5 * (5 - i))) & 31);
}
function bech32VerifyChecksum(hrp, data) {
    const encoding = data[0] === 0 ? 1 : 0x2bc830a3;
    return bech32Polymod([...bech32HrpExpand(hrp), ...data]) === encoding;
}
function convertBits(data, fromBits, toBits, pad = true) {
    let acc = 0;
    let bits = 0;
    const ret = [];
    const maxv = (1 << toBits) - 1;
    const maxAcc = (1 << (fromBits + toBits - 1)) - 1;
    for (const value of data) {
        if (value < 0 || (value >>> fromBits))
            return null;
        acc = ((acc << fromBits) | value) & maxAcc;
        bits += fromBits;
        while (bits >= toBits) {
            bits -= toBits;
            ret.push((acc >>> bits) & maxv);
        }
    }
    if (pad) {
        if (bits)
            ret.push((acc << (toBits - bits)) & maxv);
    }
    else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv)) {
        return null;
    }
    return ret;
}
function baseBech32Encode(hrp, data) {
    const combined = [...data, ...bech32CreateChecksum(hrp, data)];
    return hrp + '1' + combined.map(d => CHARSET[d]).join('');
}
function baseBech32Decode(bech) {
    if (bech.length > 90 ||
        [...bech].some(x => x.charCodeAt(0) < 33 || x.charCodeAt(0) > 126) ||
        (bech !== bech.toLowerCase() && bech !== bech.toUpperCase()))
        return [null, null];
    const lowered = bech.toLowerCase();
    const pos = lowered.lastIndexOf('1');
    if (pos < 1 || pos + 7 > lowered.length)
        return [null, null];
    const hrp = lowered.slice(0, pos);
    const data = lowered.slice(pos + 1).split('').map(c => CHARSET_REV[c]);
    // @ts-ignore
    if (data.includes(undefined))
        return [null, null];
    if (!bech32VerifyChecksum(hrp, data))
        return [null, null];
    return [hrp, data.slice(0, -6)];
}
function bech32Encode(hrp, witprog) {
    const ret = baseBech32Encode(hrp, convertBits(witprog, 8, 5) ?? []);
    return baseBech32Decode(ret)[0] === null ? null : ret;
}
function bech32Decode(hrp, addr) {
    const [gotHrp, data] = baseBech32Decode(addr);
    if (gotHrp !== hrp || !data)
        return [null, null];
    return [data[0], convertBits(data.slice(1), 5, 8, false)];
}
function segwitEncode(hrp, witver, witprog) {
    const data = [witver, ...(convertBits([...witprog], 8, 5) ?? [])];
    const ret = baseBech32Encode(hrp, data);
    return segwitDecode(hrp, ret)[0] === null ? '' : ret;
}
function segwitDecode(hrp, addr) {
    const [gotHrp, data] = baseBech32Decode(addr);
    if (gotHrp !== hrp || !data || data.length < 1 || data[0] > 16)
        return [null, null];
    const decoded = convertBits(data.slice(1), 5, 8, false);
    if (!decoded || decoded.length < 2 || decoded.length > 40)
        return [null, null];
    if (data[0] === 0 && decoded.length !== 20 && decoded.length !== 32)
        return [null, null];
    return [data[0], Uint8Array.from(decoded)];
}
//# sourceMappingURL=segwit-bech32.js.map