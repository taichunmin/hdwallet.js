// SPDX-License-Identifier: MIT

// @ts-ignore: no declaration file for 'base32.js'
import * as base32 from 'base32.js';

import { hexToBytes, bytesToHex } from '../utils';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

const translate = (s: string, from: string, to: string) =>
  s.split('')
    .map(c => {
      const i = from.indexOf(c);
      return i === -1 ? c : to[i];
    })
    .join('');

const pad = (s: string) => (s.length % 8 ? s + '='.repeat(8 - (s.length % 8)) : s);

export function encode(hex: string, customAlphabet?: string): string {
  const bytes   = hexToBytes(hex);
  const encoder = new base32.Encoder({ type: 'rfc4648', alphabet: ALPHABET });
  const b32     = encoder.write(bytes).finalize().toUpperCase(); // base32.js returns lower
  return customAlphabet ? translate(b32, ALPHABET, customAlphabet) : b32;
}

export const encodeNoPadding = (hex: string, alpha?: string) =>
  encode(hex, alpha).replace(/=+$/, '');

export function decode(data: string, customAlphabet?: string): string {
  try {
    let inp = pad(data);
    if (customAlphabet) {
      inp = translate(inp, customAlphabet, ALPHABET);
    }
    const dec   = new base32.Decoder({ type: 'rfc4648', alphabet: ALPHABET });
    const bytes = dec.write(inp).finalize();
    return bytesToHex(bytes);
  } catch {
    throw new Error('Invalid Base32 string');
  }
}
