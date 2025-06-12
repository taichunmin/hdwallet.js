// SPDX-License-Identifier: MIT
import { checkDecode, checkEncode } from '../libs/base58';
import { PUBLIC_KEY_TYPES } from '../consts';
import { SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Bitcoin } from '../cryptocurrencies';
import { bytesToString, concatBytes, integerToBytes, getBytes, ensureString, equalBytes, bytesToHex } from '../utils';
import { hash160 } from '../crypto';
import { Address } from './address';
import { AddressError } from '../exceptions';
export class P2PKHAddress extends Address {
    static publicKeyAddressPrefix = Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX;
    static alphabet = Bitcoin.PARAMS.ALPHABET;
    static getName() {
        return 'P2PKH';
    }
    static encode(publicKey, options = {
        publicKeyAddressPrefix: this.publicKeyAddressPrefix,
        publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
        alphabet: this.alphabet
    }) {
        const prefixValue = options.publicKeyAddressPrefix ?? this.publicKeyAddressPrefix;
        const prefixBytes = integerToBytes(prefixValue);
        const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
        const rawPubBytes = options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
            ? pk.getRawUncompressed() : pk.getRawCompressed();
        const pubKeyHash = hash160(getBytes(rawPubBytes));
        const payload = concatBytes(prefixBytes, pubKeyHash);
        const alphabet = options.alphabet ?? this.alphabet;
        return ensureString(checkEncode(payload, alphabet));
    }
    static decode(address, options = {
        publicKeyAddressPrefix: this.publicKeyAddressPrefix,
        alphabet: this.alphabet
    }) {
        const prefixValue = options.publicKeyAddressPrefix ?? this.publicKeyAddressPrefix;
        const prefixBytes = getBytes(integerToBytes(prefixValue));
        const alphabet = options.alphabet ?? this.alphabet;
        const decoded = checkDecode(address, alphabet);
        const expectedLen = prefixBytes.length + 20;
        if (decoded.length !== expectedLen) {
            throw new AddressError('Invalid length', { expected: expectedLen, got: decoded.length });
        }
        const gotPrefix = decoded.slice(0, prefixBytes.length);
        if (!equalBytes(prefixBytes, gotPrefix)) {
            throw new AddressError('Invalid prefix', { expected: bytesToHex(prefixBytes), got: bytesToHex(gotPrefix) });
        }
        const pubKeyHash = decoded.slice(prefixBytes.length);
        return bytesToString(pubKeyHash);
    }
}
//# sourceMappingURL=p2pkh.js.map