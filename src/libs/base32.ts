// SPDX-License-Identifier: MIT

import * as base32 from "hi-base32";

const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/**
 * Translate characters between custom and default alphabets.
 */
function translateAlphabet(data: string, fromAlphabet: string, toAlphabet: string): string {
  return data
    .split("")
    .map(char => {
      const idx = fromAlphabet.indexOf(char);
      return idx !== -1 ? toAlphabet[idx] : char;
    })
    .join("");
}

/**
 * Encode hex string to Base32 (with optional custom alphabet).
 */
export function encode(hex: string, customAlphabet?: string): string {
  const b32 = base32.encode(Buffer.from(hex, "hex")).toUpperCase();
  return customAlphabet ? translateAlphabet(b32, DEFAULT_ALPHABET, customAlphabet) : b32;
}

/**
 * Encode hex string to Base32 without padding.
 */
export function encodeNoPadding(hex: string, customAlphabet?: string): string {
  return encode(hex, customAlphabet).replace(/=+$/, "");
}

/**
 * Decode Base32 string to hex (with optional custom alphabet).
 */
export function decode(data: string, customAlphabet?: string): string {
  try {
    let input = data.toUpperCase();
    if (customAlphabet) {
      input = translateAlphabet(input, customAlphabet, DEFAULT_ALPHABET);
    }
    const buffer = base32.decode.asBytes(input);
    return Buffer.from(buffer).toString("hex");
  } catch {
    throw new Error("Invalid Base32 string");
  }
}
