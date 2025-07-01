// SPDX-License-Identifier: MIT
import { checkEncode } from '../libs/base58';
import { PUBLIC_KEY_TYPES } from '../consts';
import { SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { hash160, sha256 } from '../crypto';
import { getBytes, integerToBytes, bytesToString, concatBytes, ensureString } from '../utils';
import { P2SHAddress } from './p2sh';
export class P2WSHInP2SHAddress extends P2SHAddress {
    static getName() {
        return 'P2WSH-In-P2SH';
    }
    static encode(publicKey, options = {
        scriptAddressPrefix: this.scriptAddressPrefix,
        publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
        alphabet: this.alphabet
    }) {
        const prefixValue = options.scriptAddressPrefix ?? this.scriptAddressPrefix;
        const prefixBytes = integerToBytes(prefixValue);
        const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
        const rawPubBytes = options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
            ? pk.getRawUncompressed() : pk.getRawCompressed();
        const redeemScript = getBytes('5121' + bytesToString(rawPubBytes) + '51ae');
        const sha = sha256(redeemScript);
        const witnessScript = getBytes('0020' + bytesToString(sha));
        const scriptHash = hash160(witnessScript);
        const alphabet = options.alphabet ?? this.alphabet;
        return ensureString(checkEncode(concatBytes(prefixBytes, scriptHash), alphabet));
    }
}
//# sourceMappingURL=p2wsh-in-p2sh.js.map