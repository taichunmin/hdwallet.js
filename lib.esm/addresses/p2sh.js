// SPDX-License-Identifier: MIT
import { checkDecode, checkEncode } from '../libs/base58';
import { PUBLIC_KEY_TYPES } from '../consts';
import { SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Bitcoin } from '../cryptocurrencies';
import { hash160 } from '../crypto';
import { AddressError } from '../exceptions';
import { bytesToString, getBytes, integerToBytes, ensureString, concatBytes, equalBytes, bytesToHex } from '../utils';
import { Address } from './address';
export class P2SHAddress extends Address {
    static scriptAddressPrefix = Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX;
    static alphabet = Bitcoin.PARAMS.ALPHABET;
    static getName() {
        return 'P2SH';
    }
    static encode(publicKey, options = {
        scriptAddressPrefix: this.scriptAddressPrefix,
        publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
        alphabet: this.alphabet
    }) {
        const prefixValue = options.scriptAddressPrefix ?? this.scriptAddressPrefix;
        const prefixBytes = integerToBytes(prefixValue);
        const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
        const rawBytes = options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
            ? pk.getRawUncompressed() : pk.getRawCompressed();
        const pubKeyHash = hash160(rawBytes);
        const redeemScriptHex = '76a914' + bytesToString(pubKeyHash) + '88ac';
        const redeemScript = getBytes(redeemScriptHex);
        const scriptHash = hash160(redeemScript);
        const payload = concatBytes(prefixBytes, scriptHash);
        const alphabet = options.alphabet ?? this.alphabet;
        return ensureString(checkEncode(payload, alphabet));
    }
    static decode(address, options = {
        scriptAddressPrefix: this.scriptAddressPrefix,
        alphabet: this.alphabet
    }) {
        const prefixValue = options.scriptAddressPrefix ?? this.scriptAddressPrefix;
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
        const scriptHash = decoded.slice(prefixBytes.length);
        return bytesToString(scriptHash);
    }
}
//# sourceMappingURL=p2sh.js.map