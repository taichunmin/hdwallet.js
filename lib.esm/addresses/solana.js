// SPDX-License-Identifier: MIT
import { Solana } from '../cryptocurrencies';
import { encode as base58Encode, decode as base58Decode } from '../libs/base58';
import { SLIP10Ed25519PublicKey, validateAndGetPublicKey } from '../eccs';
import { bytesToString, getBytes, ensureString } from '../utils';
import { AddressError } from '../exceptions';
import { Address } from './address';
export class SolanaAddress extends Address {
    static alphabet = Solana.PARAMS.ALPHABET;
    static getName() {
        return 'Solana';
    }
    static encode(publicKey) {
        const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
        return ensureString(base58Encode(getBytes(pk.getRawCompressed().subarray(1))));
    }
    static decode(address) {
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
//# sourceMappingURL=solana.js.map