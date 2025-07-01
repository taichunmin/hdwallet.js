// SPDX-License-Identifier: MIT
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Cosmos } from '../cryptocurrencies';
import { sha256, ripemd160 } from '../crypto';
import { bytesToString } from '../utils';
import { Address } from './address';
import { AddressError } from '../exceptions';
export class CosmosAddress extends Address {
    static hrp = Cosmos.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'Cosmos';
    }
    static encode(publicKey, options = {
        hrp: this.hrp
    }) {
        const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
        const hash = ripemd160(sha256(pk.getRawCompressed()));
        const hrp = options.hrp ?? this.hrp;
        const encoded = bech32Encode(hrp, hash);
        if (encoded === null) {
            throw new AddressError('Failed to encode Bech32 address');
        }
        return encoded;
    }
    static decode(address, options = {
        hrp: this.hrp
    }) {
        const hrp = options.hrp ?? this.hrp;
        const [gotHrp, decoded] = bech32Decode(hrp, address);
        if (typeof gotHrp !== 'string' || gotHrp !== hrp) {
            throw new AddressError('Invalid HRP prefix or decode failure', {
                expected: hrp, got: gotHrp
            });
        }
        return bytesToString(decoded);
    }
}
//# sourceMappingURL=cosmos.js.map