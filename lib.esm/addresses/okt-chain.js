// SPDX-License-Identifier: MIT
import { EthereumAddress } from './ethereum';
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { OKTChain } from '../cryptocurrencies';
import { bytesToString, getBytes } from '../utils';
import { Address } from './address';
import { AddressError } from '../exceptions';
export class OKTChainAddress extends Address {
    static hrp = OKTChain.NETWORKS.MAINNET.HRP;
    static getName() {
        return 'OKT-Chain';
    }
    static encode(publicKey, options = {
        hrp: this.hrp
    }) {
        const baseEth = EthereumAddress.encode(publicKey, {
            skipChecksumEncode: true
        });
        const ethHexWithoutPrefix = baseEth.slice(2); // strip "0x"
        const bytes = getBytes(ethHexWithoutPrefix);
        const hrp = options.hrp ?? this.hrp;
        const encoded = bech32Encode(hrp, bytes);
        if (!encoded) {
            throw new AddressError('Failed to encode OKTChain Bech32 address');
        }
        return encoded;
    }
    static decode(address, options = {
        hrp: this.hrp
    }) {
        const hrp = options.hrp ?? this.hrp;
        const [decodedHrp, data] = bech32Decode(hrp, address);
        if (!decodedHrp || !data) {
            throw new AddressError('Failed to decode OKTChain Bech32 address');
        }
        const ethHex = EthereumAddress.addressPrefix + bytesToString(data);
        return EthereumAddress.decode(ethHex, {
            skipChecksumEncode: true
        });
    }
}
//# sourceMappingURL=okt-chain.js.map