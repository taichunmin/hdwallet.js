// SPDX-License-Identifier: MIT

import { Solana } from '../cryptocurrencies';
import { encode as base58Encode, decode as base58Decode, ensureString } from '../libs/base58';
import { SLIP10Ed25519PublicKey, PublicKey, validateAndGetPublicKey } from '../ecc';
import { bytesToString, toBuffer } from '../utils';
import { AddressError } from '../exceptions';
import { Address } from './address';

export class SolanaAddress extends Address {

  static alphabet: string = Solana.PARAMS.ALPHABET;

  static getName(): string {
    return 'Solana';
  }

  static encode(publicKey: Buffer | string | PublicKey): string {
    const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
    return ensureString(base58Encode(toBuffer(pk.getRawCompressed().subarray(1))));
  }

  static decode(address: string): string {
    const publicKey = base58Decode(address);
    const expectedLength = SLIP10Ed25519PublicKey.getCompressedLength() - 1;

    if (publicKey.length !== expectedLength) {
      throw new AddressError('Invalid public key length', {
        expected: expectedLength, got: publicKey.length
      });
    }

    if (!SLIP10Ed25519PublicKey.isValidBytes(publicKey)) {
      throw new AddressError(`Invalid SLIP10-Ed25519 public key`);
    }
    return bytesToString(publicKey);
  }
}
