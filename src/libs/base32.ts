// SPDX-License-Identifier: MIT

import { Encoder, Decoder } from 'base32.js';

const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/*───────────────────────── helpers ─────────────────────────*/

/** translate characters between two alphabets (used for custom alphabets) */
const translate = (s: string, from: string, to: string) =>
  s.split('')
    .map(c => {
      const i = from.indexOf(c);
      return i === -1 ? c : to[i];
    })
    .join('');

/** add “=” padding so the Base-32 length is a multiple of 8 */
const pad = (s: string) => (s.length % 8 ? s + '='.repeat(8 - (s.length % 8)) : s);

/*───────────────────────── encode ─────────────────────────*/

export function encode(hex: string, customAlphabet?: string): string {
  const bytes   = Buffer.from(hex, 'hex');
  const encoder = new Encoder({ type: 'rfc4648', alphabet: DEFAULT_ALPHABET });
  const b32     = encoder.write(bytes).finalize().toUpperCase(); // base32.js returns lower
  return customAlphabet ? translate(b32, DEFAULT_ALPHABET, customAlphabet) : b32;
}

export const encodeNoPadding = (hex: string, alpha?: string) =>
  encode(hex, alpha).replace(/=+$/, '');

/*───────────────────────── decode ─────────────────────────*/

export function decode(data: string, customAlphabet?: string): string {
  try {
    let inp = pad(data);
    if (customAlphabet) {
      inp = translate(inp, customAlphabet, DEFAULT_ALPHABET);
    }
    const dec   = new Decoder({ type: 'rfc4648', alphabet: DEFAULT_ALPHABET });
    const bytes = dec.write(inp).finalize();        // Uint8Array
    return Buffer.from(bytes).toString('hex');
  } catch {
    throw new Error('Invalid Base32 string');
  }
}
