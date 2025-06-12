"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardanoAddress = void 0;
const cbor2_1 = require("cbor2");
const cryptocurrencies_1 = require("../cryptocurrencies");
const bech32_1 = require("../libs/bech32");
const base58_1 = require("../libs/base58");
const eccs_1 = require("../eccs");
const crypto_1 = require("../crypto");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
const address_1 = require("./address");
class CardanoAddress extends address_1.Address {
    static addressTypes = {
        'public-key': cryptocurrencies_1.Cardano.PARAMS.PUBLIC_KEY_ADDRESS,
        'redemption': cryptocurrencies_1.Cardano.PARAMS.REDEMPTION_ADDRESS
    };
    static networkTypes = {
        'mainnet': cryptocurrencies_1.Cardano.NETWORKS.MAINNET.TYPE,
        'testnet': cryptocurrencies_1.Cardano.NETWORKS.TESTNET.TYPE
    };
    static prefixTypes = {
        'payment': cryptocurrencies_1.Cardano.PARAMS.PAYMENT_PREFIX,
        'reward': cryptocurrencies_1.Cardano.PARAMS.REWARD_PREFIX
    };
    static paymentAddressHrp = {
        'mainnet': cryptocurrencies_1.Cardano.NETWORKS.MAINNET.PAYMENT_ADDRESS_HRP,
        'testnet': cryptocurrencies_1.Cardano.NETWORKS.TESTNET.PAYMENT_ADDRESS_HRP
    };
    static rewardAddressHrp = {
        'mainnet': cryptocurrencies_1.Cardano.NETWORKS.MAINNET.REWARD_ADDRESS_HRP,
        'testnet': cryptocurrencies_1.Cardano.NETWORKS.TESTNET.REWARD_ADDRESS_HRP
    };
    static chacha20Poly1305AssociatedData = new Uint8Array();
    static chacha20Poly1305Nonce = (0, utils_1.getBytes)('7365726f6b656c6c666f7265');
    static payloadTag = 24;
    static getName() {
        return 'Cardano';
    }
    static encode(publicKey, options = {
        encodeType: cryptocurrencies_1.Cardano.ADDRESS_TYPES.PAYMENT
    }) {
        const encodeType = options.encodeType ?? cryptocurrencies_1.Cardano.ADDRESS_TYPES.PAYMENT;
        if (encodeType === cryptocurrencies_1.Cardano.TYPES.BYRON_LEGACY) {
            return this.encodeByronLegacy(publicKey, options.path, options.pathKey, options.chainCode, options.addressType ?? cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY);
        }
        else if (encodeType === cryptocurrencies_1.Cardano.TYPES.BYRON_ICARUS) {
            return this.encodeByronIcarus(publicKey, options.chainCode, options.addressType ?? cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY);
        }
        else if (encodeType === cryptocurrencies_1.Cardano.ADDRESS_TYPES.PAYMENT) {
            return this.encodeShelley(publicKey, options.stakingPublicKey, options.network ?? 'mainnet');
        }
        else if (encodeType === cryptocurrencies_1.Cardano.ADDRESS_TYPES.STAKING ||
            encodeType === cryptocurrencies_1.Cardano.ADDRESS_TYPES.REWARD) {
            return this.encodeShelleyStaking(publicKey, options.network ?? 'mainnet');
        }
        throw new exceptions_1.AddressError('Invalid encode type');
    }
    static decode(address, options = {
        decodeType: cryptocurrencies_1.Cardano.ADDRESS_TYPES.PAYMENT
    }) {
        const decodeType = options.decodeType ?? cryptocurrencies_1.Cardano.ADDRESS_TYPES.PAYMENT;
        if (decodeType === cryptocurrencies_1.Cardano.TYPES.BYRON_LEGACY ||
            decodeType === cryptocurrencies_1.Cardano.TYPES.BYRON_ICARUS) {
            return this.decodeByron(address, options.addressType ?? cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY);
        }
        else if (decodeType === cryptocurrencies_1.Cardano.ADDRESS_TYPES.PAYMENT) {
            return this.decodeShelley(address, options.network ?? 'mainnet');
        }
        else if (decodeType === cryptocurrencies_1.Cardano.ADDRESS_TYPES.STAKING ||
            decodeType === cryptocurrencies_1.Cardano.ADDRESS_TYPES.REWARD) {
            return this.decodeShelleyStaking(address, options.network ?? 'mainnet');
        }
        throw new exceptions_1.AddressError('Invalid decode type');
    }
    static encodeByron(publicKey, chainCode, addressAttributes, addressType = cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        if (!(addressType in this.addressTypes)) {
            throw new exceptions_1.AddressError('Invalid address type');
        }
        const serialized = (0, cbor2_1.encode)([
            this.addressTypes[addressType],
            [this.addressTypes[addressType], (0, utils_1.concatBytes)(publicKey.getRawCompressed().slice(1), chainCode)],
            addressAttributes
        ]);
        const rootHash = (0, crypto_1.blake2b224)((0, crypto_1.sha3_256)(serialized));
        const payload = (0, cbor2_1.encode)([
            rootHash,
            addressAttributes,
            this.addressTypes[addressType]
        ]);
        const full = (0, cbor2_1.encode)([
            new cbor2_1.Tag(this.payloadTag, payload), (0, utils_1.bytesToInteger)((0, crypto_1.crc32)(payload))
        ]);
        return (0, utils_1.ensureString)((0, base58_1.encode)(full));
    }
    static encodeByronIcarus(publicKey, chainCode, addressType = cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.KholawEd25519PublicKey);
        return this.encodeByron(pk, (0, utils_1.getBytes)(chainCode), {}, addressType);
    }
    static encodeByronLegacy(publicKey, path, pathKey, chainCode, addressType = cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        const pathK = (0, utils_1.getBytes)(pathKey);
        if (pathK.length !== 32) {
            throw new exceptions_1.BaseError('Invalid HD path key length', { expected: 32, got: pathK.length });
        }
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.KholawEd25519PublicKey);
        const indexes = (0, utils_1.pathToIndexes)(path);
        const plain = (0, utils_1.concatBytes)((0, utils_1.integerToBytes)(0x9f), ...indexes.map(i => (0, cbor2_1.encode)(i)), (0, utils_1.integerToBytes)(0xff));
        const { cipherText, tag } = (0, crypto_1.chacha20Poly1305Encrypt)(pathK, this.chacha20Poly1305Nonce, this.chacha20Poly1305AssociatedData, plain);
        const attributes = new Map();
        attributes.set(1, (0, cbor2_1.encode)((0, utils_1.concatBytes)(cipherText, tag)));
        return this.encodeByron(pk, (0, utils_1.getBytes)(chainCode), attributes, addressType);
    }
    static decodeByron(address, addressType = cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        const decoded = (0, base58_1.decode)(address);
        const outer = (0, cbor2_1.decode)(decoded);
        if (!Array.isArray(outer) || outer.length !== 2 || !(outer[0] instanceof cbor2_1.Tag)) {
            throw new exceptions_1.AddressError('Invalid address encoding');
        }
        const tag = outer[0];
        if (tag.tag !== this.payloadTag) {
            throw new exceptions_1.AddressError('Invalid CBOR tag');
        }
        const payload = tag.contents;
        const crcExpected = outer[1];
        const crcActual = (0, utils_1.bytesToInteger)((0, crypto_1.crc32)(payload));
        if (Number(crcExpected) !== Number(crcActual)) {
            throw new exceptions_1.AddressError('Invalid CRC', { expected: crcExpected, got: crcActual });
        }
        const inner = (0, cbor2_1.decode)(payload);
        const [rootHash, attrs, tagType] = inner;
        if (tagType !== this.addressTypes[addressType]) {
            throw new exceptions_1.AddressError('Invalid address type', { expected: this.addressTypes[addressType], got: tagType });
        }
        if (rootHash.length !== 28) {
            throw new exceptions_1.AddressError('Invalid root hash length', { expected: 28, got: rootHash.length });
        }
        let extra = new Uint8Array(0);
        if (attrs instanceof Map && attrs.has(1)) {
            const attr1 = attrs.get(1);
            const decrypted = (0, cbor2_1.decode)(attr1);
            extra = typeof decrypted === 'string' ? (0, utils_1.getBytes)(decrypted) : decrypted;
        }
        return (0, utils_1.bytesToString)((0, utils_1.concatBytes)(rootHash, extra));
    }
    static decodeByronIcarus(address, addressType = cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        return CardanoAddress.decodeByron(address, addressType);
    }
    static decodeByronLegacy(address, addressType = cryptocurrencies_1.Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        return CardanoAddress.decodeByron(address, addressType);
    }
    static encodeShelley(publicKey, stakingPublicKey, network) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.KholawEd25519PublicKey);
        const spk = (0, eccs_1.validateAndGetPublicKey)(stakingPublicKey, eccs_1.KholawEd25519PublicKey);
        const prefix = (0, utils_1.integerToBytes)((this.prefixTypes['payment'] << 4) + this.networkTypes[network]);
        const hash1 = (0, crypto_1.blake2b224)(pk.getRawCompressed().slice(1));
        const hash2 = (0, crypto_1.blake2b224)(spk.getRawCompressed().slice(1));
        return (0, bech32_1.bech32Encode)(this.paymentAddressHrp[network], (0, utils_1.concatBytes)(prefix, hash1, hash2));
    }
    static decodeShelley(address, network) {
        const [hrp, data] = (0, bech32_1.bech32Decode)(this.paymentAddressHrp[network], address);
        if (!data || data.length !== 57) {
            throw new exceptions_1.AddressError('Invalid length', { expected: 57, got: data?.length });
        }
        const prefix = (0, utils_1.integerToBytes)((this.prefixTypes['payment'] << 4) + this.networkTypes[network]);
        if (!(0, utils_1.equalBytes)(data.slice(0, 1), prefix)) {
            throw new exceptions_1.AddressError('Invalid prefix');
        }
        return (0, utils_1.bytesToString)(data.slice(1));
    }
    static encodeShelleyStaking(publicKey, network) {
        const pk = (0, eccs_1.validateAndGetPublicKey)(publicKey, eccs_1.KholawEd25519PublicKey);
        const prefix = (0, utils_1.integerToBytes)((this.prefixTypes['reward'] << 4) + this.networkTypes[network]);
        const hash = (0, crypto_1.blake2b224)(pk.getRawCompressed().slice(1));
        return (0, bech32_1.bech32Encode)(this.rewardAddressHrp[network], (0, utils_1.concatBytes)(prefix, hash));
    }
    static decodeShelleyStaking(address, network) {
        const [hrp, data] = (0, bech32_1.bech32Decode)(this.rewardAddressHrp[network], address);
        if (!data || data.length !== 29) {
            throw new exceptions_1.AddressError('Invalid length', { expected: 29, got: data?.length });
        }
        const prefix = (0, utils_1.integerToBytes)((this.prefixTypes['reward'] << 4) + this.networkTypes[network]);
        if (!(0, utils_1.equalBytes)(data.slice(0, 1), prefix)) {
            throw new exceptions_1.AddressError('Invalid prefix');
        }
        return (0, utils_1.bytesToString)(data.slice(1));
    }
}
exports.CardanoAddress = CardanoAddress;
//# sourceMappingURL=cardano.js.map