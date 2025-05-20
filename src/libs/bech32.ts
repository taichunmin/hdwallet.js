// SPDX-License-Identifier: MIT

const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const CHARSET_REV: Record<string, number> = Object.fromEntries(
  CHARSET.split('').map((c, i) => [c, i])
);

function bech32Polymod(values: number[]): number {
  const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  let chk = 1;
  for (const value of values) {
    const top = chk >>> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ value;
    for (let i = 0; i < 5; i++) {
      chk ^= (top >> i) & 1 ? GENERATOR[i] : 0;
    }
  }
  return chk;
}

function bech32HrpExpand(hrp: string): number[] {
  const hrpChars = hrp.split('').map(c => c.charCodeAt(0));
  return [
    ...hrpChars.map(c => c >> 5),
    0,
    ...hrpChars.map(c => c & 31)
  ];
}

function bech32CreateChecksum(hrp: string, data: number[]): number[] {
  const values = [...bech32HrpExpand(hrp), ...data];
  const polymod = bech32Polymod([...values, 0, 0, 0, 0, 0, 0]) ^ 1;
  return Array.from({ length: 6 }, (_, i) => (polymod >> (5 * (5 - i))) & 31);
}

function bech32VerifyChecksum(hrp: string, data: number[]): boolean {
  return bech32Polymod([...bech32HrpExpand(hrp), ...data]) === 1;
}

function baseBech32Encode(hrp: string, data: number[]): string {
  const combined = [...data, ...bech32CreateChecksum(hrp, data)];
  return hrp + '1' + combined.map(d => CHARSET[d]).join('');
}

function baseBech32Decode(bech: string): [string | null, number[] | null] {
  if (
    [...bech].some(c => c.charCodeAt(0) < 33 || c.charCodeAt(0) > 126) ||
    (bech.toLowerCase() !== bech && bech.toUpperCase() !== bech)
  ) {
    return [null, null];
  }

  bech = bech.toLowerCase();
  const pos = bech.lastIndexOf('1');
  if (pos < 1 || pos + 7 > bech.length || pos + 1 >= bech.length) {
    return [null, null];
  }

  const hrp = bech.slice(0, pos);
  const dataPart = bech.slice(pos + 1);

  const data: number[] = [];
  for (const c of dataPart) {
    const val = CHARSET_REV[c];
    if (val === undefined) return [null, null];
    data.push(val);
  }

  if (!bech32VerifyChecksum(hrp, data)) {
    return [null, null];
  }

  return [hrp, data.slice(0, -6)];
}

function convertBits(data: number[] | Uint8Array, fromBits: number, toBits: number, pad = true): number[] | null {
  let acc = 0;
  let bits = 0;
  const ret: number[] = [];
  const maxv = (1 << toBits) - 1;
  const maxAcc = (1 << (fromBits + toBits - 1)) - 1;

  for (const value of data) {
    if (value < 0 || value >> fromBits) return null;
    acc = ((acc << fromBits) | value) & maxAcc;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      ret.push((acc >> bits) & maxv);
    }
  }

  if (pad) {
    if (bits) ret.push((acc << (toBits - bits)) & maxv);
  } else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv)) {
    return null;
  }

  return ret;
}

// Final export: exposed API for encoding/decoding Bech32
export function bech32Encode(hrp: string, witprog: Buffer): string {
  const data = convertBits([...witprog], 8, 5);
  if (!data) {
    throw new Error('bech32Encode: Failed to convert bits from 8 to 5');
  }

  const ret = baseBech32Encode(hrp, data);
  const [decodedHrp, decodedData] = baseBech32Decode(ret);

  if (
    decodedHrp !== hrp ||
    decodedData === null ||
    decodedData.length !== data.length ||
    !decodedData.every((v, i) => v === data[i])
  ) {
    throw new Error('bech32Encode: Sanity check failed after encoding');
  }
  return ret;
}

export function bech32Decode(expectedHrp: string, addr: string): [string, Buffer] {
  const [hrp, data] = baseBech32Decode(addr);
  if (hrp !== expectedHrp || !data || data.length === 0) {
    throw new Error('bech32Decode: Invalid HRP or data format');
  }

  const decoded = convertBits(data, 5, 8, false);
  if (!decoded) {
    throw new Error('bech32Decode: Failed to convert bits from 5 to 8');
  }
  return [hrp, Buffer.from(decoded)];
}
