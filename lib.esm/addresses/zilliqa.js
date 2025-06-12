// SPDX-License-Identifier: MIT
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { SLIP10Secp256k1PublicKey, validateAndGetPublicKey } from '../eccs';
import { Zilliqa } from '../cryptocurrencies';
import { sha256 } from '../crypto';
import { bytesToString } from '../utils';
import { Address } from './address';
import { AddressError } from '../exceptions';
export class ZilliqaAddress extends Address {
    static hrp = Zilliqa.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'Zilliqa';
    }
    static encode(publicKey, options = {
        hrp: this.hrp
    }) {
        const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
        const hash = sha256(pk.getRawCompressed()).slice(-20);
        const hrp = options.hrp ?? this.hrp;
        const encoded = bech32Encode(hrp, hash);
        if (!encoded) {
            throw new AddressError('Failed to encode Bech32 Zilliqa address');
        }
        return encoded;
    }
    static decode(address, options = {
        hrp: this.hrp
    }) {
        const hrp = options.hrp ?? this.hrp;
        const [gotHrp, data] = bech32Decode(hrp, address);
        if (!gotHrp || !data) {
            throw new AddressError('Failed to decode Bech32 Zilliqa address');
        }
        if (data.length !== 20) {
            throw new AddressError('Invalid address length', {
                expected: 20, got: data.length
            });
        }
        return bytesToString(data);
    }
}
//# sourceMappingURL=zilliqa.js.map