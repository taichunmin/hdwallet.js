// SPDX-License-Identifier: MIT
import { segwitEncode } from '../libs/segwit-bech32';
import { PUBLIC_KEY_TYPES } from '../consts';
import { SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Bitcoin } from '../cryptocurrencies';
import { sha256 } from '../crypto';
import { bytesToString, getBytes, ensureString } from '../utils';
import { P2WPKHAddress } from './p2wpkh';
export class P2WSHAddress extends P2WPKHAddress {
    static witnessVersion = Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WSH;
    static getName() {
        return 'P2WSH';
    }
    static encode(publicKey, options = {
        hrp: this.hrp,
        publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
        witnessVersion: this.witnessVersion
    }) {
        const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
        const rawPubBytes = options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
            ? pk.getRawUncompressed() : pk.getRawCompressed();
        const script = '5121' + bytesToString(rawPubBytes) + '51ae';
        const scriptHash = sha256(getBytes(script));
        const hrp = options.hrp ?? this.hrp;
        const version = options.witnessVersion ?? this.witnessVersion;
        return ensureString(segwitEncode(hrp, version, scriptHash));
    }
}
//# sourceMappingURL=p2wsh.js.map