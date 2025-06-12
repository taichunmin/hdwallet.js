// SPDX-License-Identifier: MIT
import { encode, decode, Tag } from 'cbor2';
import { Cardano } from '../cryptocurrencies';
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { encode as base58Encode, decode as base58Decode } from '../libs/base58';
import { KholawEd25519PublicKey, validateAndGetPublicKey } from '../eccs';
import { crc32, blake2b224, sha3_256, chacha20Poly1305Encrypt } from '../crypto';
import { getBytes, bytesToInteger, bytesToString, integerToBytes, pathToIndexes, concatBytes, ensureString, equalBytes } from '../utils';
import { AddressError, BaseError } from '../exceptions';
import { Address } from './address';
export class CardanoAddress extends Address {
    static addressTypes = {
        'public-key': Cardano.PARAMS.PUBLIC_KEY_ADDRESS,
        'redemption': Cardano.PARAMS.REDEMPTION_ADDRESS
    };
    static networkTypes = {
        'mainnet': Cardano.NETWORKS.MAINNET.TYPE,
        'testnet': Cardano.NETWORKS.TESTNET.TYPE
    };
    static prefixTypes = {
        'payment': Cardano.PARAMS.PAYMENT_PREFIX,
        'reward': Cardano.PARAMS.REWARD_PREFIX
    };
    static paymentAddressHrp = {
        'mainnet': Cardano.NETWORKS.MAINNET.PAYMENT_ADDRESS_HRP,
        'testnet': Cardano.NETWORKS.TESTNET.PAYMENT_ADDRESS_HRP
    };
    static rewardAddressHrp = {
        'mainnet': Cardano.NETWORKS.MAINNET.REWARD_ADDRESS_HRP,
        'testnet': Cardano.NETWORKS.TESTNET.REWARD_ADDRESS_HRP
    };
    static chacha20Poly1305AssociatedData = new Uint8Array();
    static chacha20Poly1305Nonce = getBytes('7365726f6b656c6c666f7265');
    static payloadTag = 24;
    static getName() {
        return 'Cardano';
    }
    static encode(publicKey, options = {
        encodeType: Cardano.ADDRESS_TYPES.PAYMENT
    }) {
        const encodeType = options.encodeType ?? Cardano.ADDRESS_TYPES.PAYMENT;
        if (encodeType === Cardano.TYPES.BYRON_LEGACY) {
            return this.encodeByronLegacy(publicKey, options.path, options.pathKey, options.chainCode, options.addressType ?? Cardano.ADDRESS_TYPES.PUBLIC_KEY);
        }
        else if (encodeType === Cardano.TYPES.BYRON_ICARUS) {
            return this.encodeByronIcarus(publicKey, options.chainCode, options.addressType ?? Cardano.ADDRESS_TYPES.PUBLIC_KEY);
        }
        else if (encodeType === Cardano.ADDRESS_TYPES.PAYMENT) {
            return this.encodeShelley(publicKey, options.stakingPublicKey, options.network ?? 'mainnet');
        }
        else if (encodeType === Cardano.ADDRESS_TYPES.STAKING ||
            encodeType === Cardano.ADDRESS_TYPES.REWARD) {
            return this.encodeShelleyStaking(publicKey, options.network ?? 'mainnet');
        }
        throw new AddressError('Invalid encode type');
    }
    static decode(address, options = {
        decodeType: Cardano.ADDRESS_TYPES.PAYMENT
    }) {
        const decodeType = options.decodeType ?? Cardano.ADDRESS_TYPES.PAYMENT;
        if (decodeType === Cardano.TYPES.BYRON_LEGACY ||
            decodeType === Cardano.TYPES.BYRON_ICARUS) {
            return this.decodeByron(address, options.addressType ?? Cardano.ADDRESS_TYPES.PUBLIC_KEY);
        }
        else if (decodeType === Cardano.ADDRESS_TYPES.PAYMENT) {
            return this.decodeShelley(address, options.network ?? 'mainnet');
        }
        else if (decodeType === Cardano.ADDRESS_TYPES.STAKING ||
            decodeType === Cardano.ADDRESS_TYPES.REWARD) {
            return this.decodeShelleyStaking(address, options.network ?? 'mainnet');
        }
        throw new AddressError('Invalid decode type');
    }
    static encodeByron(publicKey, chainCode, addressAttributes, addressType = Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        if (!(addressType in this.addressTypes)) {
            throw new AddressError('Invalid address type');
        }
        const serialized = encode([
            this.addressTypes[addressType],
            [this.addressTypes[addressType], concatBytes(publicKey.getRawCompressed().slice(1), chainCode)],
            addressAttributes
        ]);
        const rootHash = blake2b224(sha3_256(serialized));
        const payload = encode([
            rootHash,
            addressAttributes,
            this.addressTypes[addressType]
        ]);
        const full = encode([
            new Tag(this.payloadTag, payload), bytesToInteger(crc32(payload))
        ]);
        return ensureString(base58Encode(full));
    }
    static encodeByronIcarus(publicKey, chainCode, addressType = Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        const pk = validateAndGetPublicKey(publicKey, KholawEd25519PublicKey);
        return this.encodeByron(pk, getBytes(chainCode), {}, addressType);
    }
    static encodeByronLegacy(publicKey, path, pathKey, chainCode, addressType = Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        const pathK = getBytes(pathKey);
        if (pathK.length !== 32) {
            throw new BaseError('Invalid HD path key length', { expected: 32, got: pathK.length });
        }
        const pk = validateAndGetPublicKey(publicKey, KholawEd25519PublicKey);
        const indexes = pathToIndexes(path);
        const plain = concatBytes(integerToBytes(0x9f), ...indexes.map(i => encode(i)), integerToBytes(0xff));
        const { cipherText, tag } = chacha20Poly1305Encrypt(pathK, this.chacha20Poly1305Nonce, this.chacha20Poly1305AssociatedData, plain);
        const attributes = new Map();
        attributes.set(1, encode(concatBytes(cipherText, tag)));
        return this.encodeByron(pk, getBytes(chainCode), attributes, addressType);
    }
    static decodeByron(address, addressType = Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        const decoded = base58Decode(address);
        const outer = decode(decoded);
        if (!Array.isArray(outer) || outer.length !== 2 || !(outer[0] instanceof Tag)) {
            throw new AddressError('Invalid address encoding');
        }
        const tag = outer[0];
        if (tag.tag !== this.payloadTag) {
            throw new AddressError('Invalid CBOR tag');
        }
        const payload = tag.contents;
        const crcExpected = outer[1];
        const crcActual = bytesToInteger(crc32(payload));
        if (Number(crcExpected) !== Number(crcActual)) {
            throw new AddressError('Invalid CRC', { expected: crcExpected, got: crcActual });
        }
        const inner = decode(payload);
        const [rootHash, attrs, tagType] = inner;
        if (tagType !== this.addressTypes[addressType]) {
            throw new AddressError('Invalid address type', { expected: this.addressTypes[addressType], got: tagType });
        }
        if (rootHash.length !== 28) {
            throw new AddressError('Invalid root hash length', { expected: 28, got: rootHash.length });
        }
        let extra = new Uint8Array(0);
        if (attrs instanceof Map && attrs.has(1)) {
            const attr1 = attrs.get(1);
            const decrypted = decode(attr1);
            extra = typeof decrypted === 'string' ? getBytes(decrypted) : decrypted;
        }
        return bytesToString(concatBytes(rootHash, extra));
    }
    static decodeByronIcarus(address, addressType = Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        return CardanoAddress.decodeByron(address, addressType);
    }
    static decodeByronLegacy(address, addressType = Cardano.ADDRESS_TYPES.PUBLIC_KEY) {
        return CardanoAddress.decodeByron(address, addressType);
    }
    static encodeShelley(publicKey, stakingPublicKey, network) {
        const pk = validateAndGetPublicKey(publicKey, KholawEd25519PublicKey);
        const spk = validateAndGetPublicKey(stakingPublicKey, KholawEd25519PublicKey);
        const prefix = integerToBytes((this.prefixTypes['payment'] << 4) + this.networkTypes[network]);
        const hash1 = blake2b224(pk.getRawCompressed().slice(1));
        const hash2 = blake2b224(spk.getRawCompressed().slice(1));
        return bech32Encode(this.paymentAddressHrp[network], concatBytes(prefix, hash1, hash2));
    }
    static decodeShelley(address, network) {
        const [hrp, data] = bech32Decode(this.paymentAddressHrp[network], address);
        if (!data || data.length !== 57) {
            throw new AddressError('Invalid length', { expected: 57, got: data?.length });
        }
        const prefix = integerToBytes((this.prefixTypes['payment'] << 4) + this.networkTypes[network]);
        if (!equalBytes(data.slice(0, 1), prefix)) {
            throw new AddressError('Invalid prefix');
        }
        return bytesToString(data.slice(1));
    }
    static encodeShelleyStaking(publicKey, network) {
        const pk = validateAndGetPublicKey(publicKey, KholawEd25519PublicKey);
        const prefix = integerToBytes((this.prefixTypes['reward'] << 4) + this.networkTypes[network]);
        const hash = blake2b224(pk.getRawCompressed().slice(1));
        return bech32Encode(this.rewardAddressHrp[network], concatBytes(prefix, hash));
    }
    static decodeShelleyStaking(address, network) {
        const [hrp, data] = bech32Decode(this.rewardAddressHrp[network], address);
        if (!data || data.length !== 29) {
            throw new AddressError('Invalid length', { expected: 29, got: data?.length });
        }
        const prefix = integerToBytes((this.prefixTypes['reward'] << 4) + this.networkTypes[network]);
        if (!equalBytes(data.slice(0, 1), prefix)) {
            throw new AddressError('Invalid prefix');
        }
        return bytesToString(data.slice(1));
    }
}
//# sourceMappingURL=cardano.js.map