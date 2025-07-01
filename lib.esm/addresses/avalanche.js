// SPDX-License-Identifier: MIT
import { CosmosAddress } from './cosmos';
import { Avalanche } from '../cryptocurrencies';
import { Address } from './address';
import { AddressError } from '../exceptions';
export class AvalancheAddress extends Address {
    static hrp = Avalanche.NETWORKS.MAINNET.HRP;
    static addressType = Avalanche.DEFAULT_ADDRESS_TYPE;
    static addressTypes = {
        'p-chain': Avalanche.PARAMS.ADDRESS_TYPES.P_CHAIN,
        'x-chain': Avalanche.PARAMS.ADDRESS_TYPES.X_CHAIN
    };
    static getName() {
        return 'Avalanche';
    }
    static encode(publicKey, options = {
        hrp: this.hrp, addressType: this.addressType
    }) {
        const typeKey = options.addressType ?? this.addressType;
        const addressType = AvalancheAddress.addressTypes[typeKey];
        if (!addressType) {
            throw new AddressError('Invalid Avalanche address type', {
                expected: Object.keys(AvalancheAddress.addressTypes), got: typeKey
            });
        }
        const base = CosmosAddress.encode(publicKey, {
            hrp: options.hrp ?? this.hrp
        });
        return addressType + base;
    }
    static decode(address, options = {
        addressType: this.addressType
    }) {
        const typeKey = options.addressType ?? this.addressType;
        const addressType = AvalancheAddress.addressTypes[typeKey];
        if (!addressType) {
            throw new AddressError('Invalid Avalanche address type', {
                expected: Object.keys(AvalancheAddress.addressTypes), got: typeKey
            });
        }
        const prefix = address.slice(0, addressType.length);
        if (prefix !== addressType) {
            throw new AddressError('Invalid prefix', {
                expected: addressType, got: prefix
            });
        }
        const rest = address.slice(addressType.length);
        return CosmosAddress.decode(rest, { hrp: options.hrp ?? this.hrp });
    }
}
//# sourceMappingURL=avalanche.js.map