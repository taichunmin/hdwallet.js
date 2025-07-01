// SPDX-License-Identifier: MIT
import { AddressError } from '../exceptions';
import { SLIP10Ed25519PublicKey, validateAndGetPublicKey } from '../eccs';
import { bytesToString, getBytes } from '../utils';
import { Address } from './address';
export class NearAddress extends Address {
    static getName() {
        return 'Near';
    }
    static encode(publicKey) {
        const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
        return bytesToString(pk.getRawCompressed()).slice(2);
    }
    static decode(address) {
        const bytes = getBytes(address);
        const expectedLength = 32;
        if (bytes.length !== expectedLength) {
            throw new AddressError('Invalid address length', {
                expected: expectedLength, got: bytes.length
            });
        }
        validateAndGetPublicKey(bytes, SLIP10Ed25519PublicKey);
        return address;
    }
}
//# sourceMappingURL=near.js.map