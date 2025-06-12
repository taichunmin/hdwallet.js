"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODES = exports.SEMANTICS = exports.WIF_TYPES = exports.PUBLIC_KEY_TYPES = exports.XPublicKeyVersions = exports.XPrivateKeyVersions = exports.ExtendedKeyVersions = exports.Params = exports.Networks = exports.AddressPrefixes = exports.AddressTypes = exports.Addresses = exports.HDs = exports.Seeds = exports.Mnemonics = exports.Entropies = exports.WitnessVersions = exports.Info = exports.SLIP10_SECP256K1_CONST = exports.KHOLAW_ED25519_CONST = exports.SLIP10_ED25519_CONST = exports.NestedNamespace = void 0;
const exceptions_1 = require("./exceptions");
const utils_1 = require("./utils");
class NestedNamespace {
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
exports.NestedNamespace = NestedNamespace;
exports.SLIP10_ED25519_CONST = {
    PRIVATE_KEY_BYTE_LENGTH: 32,
    PUBLIC_KEY_PREFIX: (0, utils_1.integerToBytes)(0x00),
    PUBLIC_KEY_BYTE_LENGTH: 32
};
exports.KHOLAW_ED25519_CONST = {
    ...exports.SLIP10_ED25519_CONST,
    PRIVATE_KEY_BYTE_LENGTH: 64
};
exports.SLIP10_SECP256K1_CONST = {
    POINT_COORDINATE_BYTE_LENGTH: 32,
    PRIVATE_KEY_BYTE_LENGTH: 32,
    PRIVATE_KEY_UNCOMPRESSED_PREFIX: 0x00,
    PRIVATE_KEY_COMPRESSED_PREFIX: 0x01,
    PUBLIC_KEY_UNCOMPRESSED_PREFIX: (0, utils_1.integerToBytes)(0x04),
    PUBLIC_KEY_COMPRESSED_BYTE_LENGTH: 33,
    PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH: 65,
    CHECKSUM_BYTE_LENGTH: 4
};
class Info extends NestedNamespace {
    SOURCE_CODE;
    WHITEPAPER;
    WEBSITES;
    constructor(data) {
        super(data);
    }
}
exports.Info = Info;
class WitnessVersions extends NestedNamespace {
    getWitnessVersion(address) {
        return this[address.toUpperCase()];
    }
}
exports.WitnessVersions = WitnessVersions;
class Entropies extends NestedNamespace {
    isEntropy(entropy) {
        return this.getEntropies().includes(entropy);
    }
    getEntropies() {
        return Object.values(this);
    }
}
exports.Entropies = Entropies;
class Mnemonics extends NestedNamespace {
    isMnemonic(mnemonic) {
        return this.getMnemonics().includes(mnemonic);
    }
    getMnemonics() {
        return Object.values(this);
    }
}
exports.Mnemonics = Mnemonics;
class Seeds extends NestedNamespace {
    isSeed(seed) {
        return this.getSeeds().includes(seed);
    }
    getSeeds() {
        return Object.values(this);
    }
}
exports.Seeds = Seeds;
class HDs extends NestedNamespace {
    isHD(hd) {
        return this.getHDS().includes(hd);
    }
    getHDS() {
        return Object.values(this);
    }
}
exports.HDs = HDs;
class Addresses extends NestedNamespace {
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
exports.Addresses = Addresses;
class AddressTypes extends NestedNamespace {
    isAddressType(addressType) {
        return this.getAddressTypes().includes(addressType);
    }
    getAddressTypes() {
        return Object.values(this);
    }
}
exports.AddressTypes = AddressTypes;
class AddressPrefixes extends NestedNamespace {
    isAddressPrefix(addressPrefix) {
        return this.getAddressPrefixes().includes(addressPrefix);
    }
    getAddressPrefixes() {
        return Object.values(this);
    }
}
exports.AddressPrefixes = AddressPrefixes;
class Networks extends NestedNamespace {
    isNetwork(network) {
        return this.getNetworks().includes(network.toLowerCase());
    }
    getNetworks() {
        return Object.keys(this).map(k => k.toLowerCase());
    }
    getNetwork(network) {
        if (!this.isNetwork(network)) {
            throw new exceptions_1.NetworkError(`${network} network is not available`);
        }
        return this[network.toUpperCase()];
    }
}
exports.Networks = Networks;
class Params extends NestedNamespace {
}
exports.Params = Params;
class ExtendedKeyVersions extends NestedNamespace {
    isVersion(version) {
        return Object.values(this).includes(Number((0, utils_1.bytesToInteger)(version)));
    }
    getVersions() {
        return Object.keys(this).map(k => k.toLowerCase().replace(/_/g, '-'));
    }
    getVersion(name) {
        return this[name.toUpperCase().replace(/-/g, '_')];
    }
    getName(version) {
        const intVer = (0, utils_1.bytesToInteger)(version);
        return Object.entries(this).find(([, v]) => v === intVer)?.[0];
    }
}
exports.ExtendedKeyVersions = ExtendedKeyVersions;
class XPrivateKeyVersions extends ExtendedKeyVersions {
}
exports.XPrivateKeyVersions = XPrivateKeyVersions;
class XPublicKeyVersions extends ExtendedKeyVersions {
}
exports.XPublicKeyVersions = XPublicKeyVersions;
class PUBLIC_KEY_TYPES {
    static UNCOMPRESSED = 'uncompressed';
    static COMPRESSED = 'compressed';
    static getTypes() {
        return [this.UNCOMPRESSED, this.COMPRESSED];
    }
}
exports.PUBLIC_KEY_TYPES = PUBLIC_KEY_TYPES;
class WIF_TYPES {
    static WIF = 'wif';
    static WIF_COMPRESSED = 'wif-compressed';
    static getTypes() {
        return [this.WIF, this.WIF_COMPRESSED];
    }
}
exports.WIF_TYPES = WIF_TYPES;
class SEMANTICS {
    static P2WPKH = 'p2wpkh';
    static P2WPKH_IN_P2SH = 'p2wpkh-in-p2sh';
    static P2WSH = 'p2wsh';
    static P2WSH_IN_P2SH = 'p2wsh-in-p2sh';
    static getTypes() {
        return [this.P2WPKH, this.P2WPKH_IN_P2SH, this.P2WSH, this.P2WSH_IN_P2SH];
    }
}
exports.SEMANTICS = SEMANTICS;
class MODES {
    static STANDARD = 'standard';
    static SEGWIT = 'segwit';
    static getTypes() {
        return [this.STANDARD, this.SEGWIT];
    }
}
exports.MODES = MODES;
//# sourceMappingURL=consts.js.map