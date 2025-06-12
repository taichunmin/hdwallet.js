// SPDX-License-Identifier: MIT
import { NetworkError } from './exceptions';
import { integerToBytes, bytesToInteger } from './utils';
export class NestedNamespace {
    constructor(data) {
        if (data instanceof Set) {
            data.forEach(item => {
                this[item] = item;
            });
        }
        else if (Array.isArray(data)) {
            data.forEach(item => {
                if (item != null && typeof item === 'object' && !Array.isArray(item)) {
                    Object.entries(item).forEach(([key, value]) => {
                        this[key] = (value != null && typeof value === 'object')
                            ? new NestedNamespace(value)
                            : value;
                    });
                }
                else {
                    this[item] = item;
                }
            });
        }
        else {
            Object.entries(data).forEach(([key, value]) => {
                this[key] = (value != null && typeof value === 'object')
                    ? new NestedNamespace(value)
                    : value;
            });
        }
    }
}
export const SLIP10_ED25519_CONST = {
    PRIVATE_KEY_BYTE_LENGTH: 32,
    PUBLIC_KEY_PREFIX: integerToBytes(0x00),
    PUBLIC_KEY_BYTE_LENGTH: 32
};
export const KHOLAW_ED25519_CONST = {
    ...SLIP10_ED25519_CONST,
    PRIVATE_KEY_BYTE_LENGTH: 64
};
export const SLIP10_SECP256K1_CONST = {
    POINT_COORDINATE_BYTE_LENGTH: 32,
    PRIVATE_KEY_BYTE_LENGTH: 32,
    PRIVATE_KEY_UNCOMPRESSED_PREFIX: 0x00,
    PRIVATE_KEY_COMPRESSED_PREFIX: 0x01,
    PUBLIC_KEY_UNCOMPRESSED_PREFIX: integerToBytes(0x04),
    PUBLIC_KEY_COMPRESSED_BYTE_LENGTH: 33,
    PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH: 65,
    CHECKSUM_BYTE_LENGTH: 4
};
export class Info extends NestedNamespace {
    SOURCE_CODE;
    WHITEPAPER;
    WEBSITES;
    constructor(data) {
        super(data);
    }
}
export class WitnessVersions extends NestedNamespace {
    getWitnessVersion(address) {
        return this[address.toUpperCase()];
    }
}
export class Entropies extends NestedNamespace {
    isEntropy(entropy) {
        return this.getEntropies().includes(entropy);
    }
    getEntropies() {
        return Object.values(this);
    }
}
export class Mnemonics extends NestedNamespace {
    isMnemonic(mnemonic) {
        return this.getMnemonics().includes(mnemonic);
    }
    getMnemonics() {
        return Object.values(this);
    }
}
export class Seeds extends NestedNamespace {
    isSeed(seed) {
        return this.getSeeds().includes(seed);
    }
    getSeeds() {
        return Object.values(this);
    }
}
export class HDs extends NestedNamespace {
    isHD(hd) {
        return this.getHDS().includes(hd);
    }
    getHDS() {
        return Object.values(this);
    }
}
export class Addresses extends NestedNamespace {
    isAddress(address) {
        return this.getAddresses().includes(address);
    }
    getAddresses() {
        return Object.values(this);
    }
    length() {
        return this.getAddresses().length;
    }
}
export class AddressTypes extends NestedNamespace {
    isAddressType(addressType) {
        return this.getAddressTypes().includes(addressType);
    }
    getAddressTypes() {
        return Object.values(this);
    }
}
export class AddressPrefixes extends NestedNamespace {
    isAddressPrefix(addressPrefix) {
        return this.getAddressPrefixes().includes(addressPrefix);
    }
    getAddressPrefixes() {
        return Object.values(this);
    }
}
export class Networks extends NestedNamespace {
    isNetwork(network) {
        return this.getNetworks().includes(network.toLowerCase());
    }
    getNetworks() {
        return Object.keys(this).map(k => k.toLowerCase());
    }
    getNetwork(network) {
        if (!this.isNetwork(network)) {
            throw new NetworkError(`${network} network is not available`);
        }
        return this[network.toUpperCase()];
    }
}
export class Params extends NestedNamespace {
}
export class ExtendedKeyVersions extends NestedNamespace {
    isVersion(version) {
        return Object.values(this).includes(Number(bytesToInteger(version)));
    }
    getVersions() {
        return Object.keys(this).map(k => k.toLowerCase().replace(/_/g, '-'));
    }
    getVersion(name) {
        return this[name.toUpperCase().replace(/-/g, '_')];
    }
    getName(version) {
        const intVer = bytesToInteger(version);
        return Object.entries(this).find(([, v]) => v === intVer)?.[0];
    }
}
export class XPrivateKeyVersions extends ExtendedKeyVersions {
}
export class XPublicKeyVersions extends ExtendedKeyVersions {
}
export class PUBLIC_KEY_TYPES {
    static UNCOMPRESSED = 'uncompressed';
    static COMPRESSED = 'compressed';
    static getTypes() {
        return [this.UNCOMPRESSED, this.COMPRESSED];
    }
}
export class WIF_TYPES {
    static WIF = 'wif';
    static WIF_COMPRESSED = 'wif-compressed';
    static getTypes() {
        return [this.WIF, this.WIF_COMPRESSED];
    }
}
export class SEMANTICS {
    static P2WPKH = 'p2wpkh';
    static P2WPKH_IN_P2SH = 'p2wpkh-in-p2sh';
    static P2WSH = 'p2wsh';
    static P2WSH_IN_P2SH = 'p2wsh-in-p2sh';
    static getTypes() {
        return [this.P2WPKH, this.P2WPKH_IN_P2SH, this.P2WSH, this.P2WSH_IN_P2SH];
    }
}
export class MODES {
    static STANDARD = 'standard';
    static SEGWIT = 'segwit';
    static getTypes() {
        return [this.STANDARD, this.SEGWIT];
    }
}
//# sourceMappingURL=consts.js.map