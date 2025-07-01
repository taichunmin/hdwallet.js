// SPDX-License-Identifier: MIT
import { segwitEncode, segwitDecode } from '../libs/segwit-bech32';
import { PUBLIC_KEY_TYPES } from '../consts';
import { SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Bitcoin } from '../cryptocurrencies';
import { hash160 } from '../crypto';
import { bytesToString, ensureString } from '../utils';
import { Address } from './address';
import { AddressError } from '../exceptions';
export class P2WPKHAddress extends Address {
    static hrp = Bitcoin.NETWORKS.MAINNET.HRP;
    static witnessVersion = Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2WPKH;
    static getName() {
        return 'P2WPKH';
    }
    static encode(publicKey, options = {
        hrp: this.hrp,
        publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED,
        witnessVersion: this.witnessVersion
    }) {
        const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
        const rawPubBytes = options.publicKeyType === PUBLIC_KEY_TYPES.UNCOMPRESSED
            ? pk.getRawUncompressed() : pk.getRawCompressed();
        const pubKeyHash = hash160(rawPubBytes);
        const hrp = options.hrp ?? this.hrp;
        const witnessVersion = options.witnessVersion ?? this.witnessVersion;
        return ensureString(segwitEncode(hrp, witnessVersion, pubKeyHash));
    }
    static decode(address, options = { hrp: this.hrp }) {
        const hrp = options.hrp ?? this.hrp;
        const [witnessVersion, decoded] = segwitDecode(hrp, address);
        if (!decoded) {
            throw new AddressError('Invalid address decoding');
        }
        return bytesToString(decoded);
    }
}
//# sourceMappingURL=p2wpkh.js.map