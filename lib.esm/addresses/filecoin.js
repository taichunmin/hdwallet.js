// SPDX-License-Identifier: MIT
import { encodeNoPadding, decode } from '../libs/base32';
import { SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Filecoin } from '../cryptocurrencies';
import { blake2b160, blake2b32 } from '../crypto';
import { integerToBytes, bytesToString, getBytes, concatBytes, equalBytes, bytesToHex } from '../utils';
import { Address } from './address';
import { AddressError } from '../exceptions';
export class FilecoinAddress extends Address {
    static alphabet = Filecoin.PARAMS.ALPHABET;
    static addressPrefix = Filecoin.PARAMS.ADDRESS_PREFIX;
    static addressType = Filecoin.DEFAULT_ADDRESS_TYPE;
    static addressTypes = {
        secp256k1: Filecoin.PARAMS.ADDRESS_TYPES.SECP256K1,
        bls: Filecoin.PARAMS.ADDRESS_TYPES.BLS
    };
    static getName() {
        return 'Filecoin';
    }
    static computeChecksum(pubKeyHash, addressType) {
        return blake2b32(concatBytes(integerToBytes(addressType), pubKeyHash));
    }
    static encode(publicKey, options = {
        addressPrefix: this.addressPrefix,
        addressType: this.addressType
    }) {
        const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
        const pubKeyHash = blake2b160(pk.getRawUncompressed());
        const typeKey = options.addressType ?? this.addressType;
        const addressType = this.addressTypes[typeKey];
        if (addressType === undefined) {
            throw new AddressError('Invalid Filecoin address type', {
                expected: Object.keys(FilecoinAddress.addressTypes),
                got: typeKey
            });
        }
        const checksum = FilecoinAddress.computeChecksum(pubKeyHash, addressType);
        const base32Encoded = encodeNoPadding(bytesToString(concatBytes(pubKeyHash, checksum)), FilecoinAddress.alphabet);
        return FilecoinAddress.addressPrefix + String.fromCharCode(addressType + '0'.charCodeAt(0)) + base32Encoded;
    }
    static decode(address, options = {
        addressPrefix: this.addressPrefix,
        addressType: this.addressType
    }) {
        const prefix = FilecoinAddress.addressPrefix;
        if (!address.startsWith(prefix)) {
            throw new AddressError('Invalid prefix', {
                expected: prefix,
                got: address.slice(0, prefix.length)
            });
        }
        const addressBody = address.slice(prefix.length);
        const typeKey = options.addressType ?? this.addressType;
        const expectedType = FilecoinAddress.addressTypes[typeKey];
        if (expectedType === undefined) {
            throw new AddressError('Invalid Filecoin address type', {
                expected: Object.keys(FilecoinAddress.addressTypes),
                got: typeKey
            });
        }
        const actualType = addressBody.charCodeAt(0) - '0'.charCodeAt(0);
        if (expectedType !== actualType) {
            throw new AddressError('Invalid address type', {
                expected: expectedType,
                got: actualType
            });
        }
        const payloadBytes = getBytes(decode(addressBody.slice(1), FilecoinAddress.alphabet));
        if (payloadBytes.length !== 24) {
            throw new AddressError('Invalid length', {
                expected: 24, got: payloadBytes.length
            });
        }
        const publicKeyHash = payloadBytes.slice(0, 20);
        const checksum = payloadBytes.slice(20);
        const expectedChecksum = FilecoinAddress.computeChecksum(publicKeyHash, expectedType);
        if (!equalBytes(checksum, expectedChecksum)) {
            throw new AddressError('Invalid checksum', {
                expected: bytesToHex(expectedChecksum), got: bytesToHex(checksum)
            });
        }
        return bytesToString(publicKeyHash);
    }
}
//# sourceMappingURL=filecoin.js.map