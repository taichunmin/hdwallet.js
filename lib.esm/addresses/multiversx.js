// SPDX-License-Identifier: MIT
import { MultiversX } from '../cryptocurrencies';
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { SLIP10Ed25519PublicKey, validateAndGetPublicKey } from '../eccs';
import { bytesToString, getBytes } from '../utils';
import { AddressError } from '../exceptions';
import { Address } from './address';
export class MultiversXAddress extends Address {
    static hrp = MultiversX.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'MultiversX';
    }
    static encode(publicKey, options = {
        hrp: this.hrp
    }) {
        const pk = validateAndGetPublicKey(publicKey, SLIP10Ed25519PublicKey);
        const raw = pk.getRawCompressed().subarray(1);
        return bech32Encode(options.hrp ?? this.hrp, getBytes(raw));
    }
    static decode(address, options = {
        hrp: this.hrp
    }) {
        const [hrpGot, data] = bech32Decode(options.hrp ?? this.hrp, address);
        if (!data) {
            throw new AddressError('Invalid Bech32 decoding result');
        }
        return bytesToString(data);
    }
}
//# sourceMappingURL=multiversx.js.map