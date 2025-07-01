// SPDX-License-Identifier: MIT
import { Stellar } from '../cryptocurrencies';
import { encodeNoPadding, decode as base32Decode } from '../libs/base32';
import { xmodemCrc } from '../crypto';
import { SLIP10Ed25519PublicKey, validateAndGetPublicKey } from '../eccs';
import { bytesToString, bytesReverse, integerToBytes, concatBytes, getBytes, equalBytes } from '../utils';
import { AddressError } from '../exceptions';
import { Address } from './address';
export class StellarAddress extends Address {
    static checksumLength = Stellar.PARAMS.CHECKSUM_LENGTH;
    static addressType = Stellar.DEFAULT_ADDRESS_TYPE;
    static addressTypes = {
        privateKey: Stellar.PARAMS.ADDRESS_TYPES.PRIVATE_KEY,
        publicKey: Stellar.PARAMS.ADDRESS_TYPES.PUBLIC_KEY
    };
    static getName() {
        return 'Stellar';
    }
    static computeChecksum(payload) {
        return bytesReverse(xmodemCrc(payload));
    }
    static encode(publicKey, options = {
        addressType: this.addressType
    }) {
        const addressTypeName = options.addressType ?? this.addressType;
        if (!(addressTypeName in this.addressTypes)) {
            throw new AddressError('Invalid Stellar address type', {
                expected: Object.keys(this.addressTypes), got: addressTypeName
            });
        }
        const addressType = this.addressTypes[addressTypeName];
        const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
        const payload = concatBytes(integerToBytes(addressType), pk.getRawCompressed().subarray(1));
        const checksum = this.computeChecksum(payload);
        return encodeNoPadding(bytesToString(concatBytes(payload, checksum)));
    }
    static decode(address, options = {
        addressType: this.addressType
    }) {
        const addressTypeName = options.addressType ?? this.addressType;
        if (!(addressTypeName in this.addressTypes)) {
            throw new AddressError('Invalid Stellar address type', {
                expected: Object.keys(this.addressTypes), got: addressTypeName
            });
        }
        const addressType = this.addressTypes[addressTypeName];
        const decoded = getBytes(base32Decode(address));
        const expectedLength = SLIP10Ed25519PublicKey.getCompressedLength() + this.checksumLength;
        if (decoded.length !== expectedLength) {
            throw new AddressError('Invalid length', {
                expected: expectedLength, got: decoded.length
            });
        }
        const checksum = decoded.subarray(-this.checksumLength);
        const payload = decoded.subarray(0, -this.checksumLength);
        const addressTypeGot = payload[0];
        if (addressTypeGot !== addressType) {
            throw new AddressError('Invalid address type', {
                expected: addressType,
                got: addressTypeGot
            });
        }
        const checksumGot = this.computeChecksum(payload);
        if (!equalBytes(checksum, checksumGot)) {
            throw new AddressError('Invalid checksum', {
                expected: bytesToString(checksum),
                got: bytesToString(checksumGot)
            });
        }
        const pubkey = payload.subarray(1);
        if (!SLIP10Ed25519PublicKey.isValidBytes(pubkey)) {
            throw new AddressError('Invalid public key');
        }
        return bytesToString(pubkey);
    }
}
//# sourceMappingURL=stellar.js.map