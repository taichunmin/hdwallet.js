// SPDX-License-Identifier: MIT

import { encode, encodeCanonical, Tagged, decode } from 'cbor';

import { Cardano } from '../cryptocurrencies';
import { bech32Encode, bech32Decode } from '../libs/bech32';
import { encode as base58Encode, decode as base58Decode, ensureString } from '../libs/base58';
import { KholawEd25519PublicKey, PublicKey, validateAndGetPublicKey } from '../ecc';
import { crc32, blake2b224, sha3_256, chacha20Poly1305Encrypt } from '../crypto';
import {
  getBytes, bytesToInteger, bytesToString, integerToBytes, pathToIndexes, concatBytes, toBuffer
} from '../utils';
import { AddressError, BaseError } from '../exceptions';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';

export class CardanoAddress extends Address {

  static readonly addressTypes: any = {
    'public-key': Cardano.PARAMS.PUBLIC_KEY_ADDRESS,
    'redemption': Cardano.PARAMS.REDEMPTION_ADDRESS
  };
  static readonly networkTypes: any = {
    'mainnet': Cardano.NETWORKS.MAINNET.TYPE,
    'testnet': Cardano.NETWORKS.TESTNET.TYPE
  };
  static readonly prefixTypes: any = {
    'payment': Cardano.PARAMS.PAYMENT_PREFIX,
    'reward': Cardano.PARAMS.REWARD_PREFIX
  };
  static readonly paymentAddressHrp: any = {
    'mainnet': Cardano.NETWORKS.MAINNET.PAYMENT_ADDRESS_HRP,
    'testnet': Cardano.NETWORKS.TESTNET.PAYMENT_ADDRESS_HRP
  };
  static readonly rewardAddressHrp: any = {
    'mainnet': Cardano.NETWORKS.MAINNET.REWARD_ADDRESS_HRP,
    'testnet': Cardano.NETWORKS.TESTNET.REWARD_ADDRESS_HRP
  };
  static readonly chacha20Poly1305AssociatedData = new Uint8Array();
  static readonly chacha20Poly1305Nonce = getBytes('7365726f6b656c6c666f7265');
  static readonly payloadTag = 24;

  static getName(): string {
    return 'Cardano';
  }

  static encode(publicKey: Buffer | string | PublicKey, options: AddressOptionsInterface = {
    encodeType: Cardano.ADDRESS_TYPES.PAYMENT
  }): string {

    const encodeType = options.encodeType ?? Cardano.ADDRESS_TYPES.PAYMENT;
    if (encodeType === Cardano.TYPES.BYRON_LEGACY) {
      return this.encodeByronLegacy(
        publicKey,
        options.path!,
        options.pathKey!,
        options.chainCode!,
        options.addressType ?? Cardano.ADDRESS_TYPES.PUBLIC_KEY
      );
    } else if (encodeType === Cardano.TYPES.BYRON_ICARUS) {
      return this.encodeByronIcarus(
        publicKey,
        options.chainCode!,
        options.addressType ?? Cardano.ADDRESS_TYPES.PUBLIC_KEY
      );
    } else if (encodeType === Cardano.ADDRESS_TYPES.PAYMENT) {
      return this.encodeShelley(
        publicKey,
        options.stakingPublicKey!,
        options.network ?? 'mainnet'
      );
    } else if (
      encodeType === Cardano.ADDRESS_TYPES.STAKING ||
      encodeType === Cardano.ADDRESS_TYPES.REWARD
    ) {
      return this.encodeShelleyStaking(
        publicKey,
        options.network ?? 'mainnet'
      );
    }
    throw new AddressError('Invalid encode type');
  }

  static decode(address: string, options: AddressOptionsInterface = {
    decodeType: Cardano.ADDRESS_TYPES.PAYMENT
  }): string {
    const decodeType = options.decodeType ?? Cardano.ADDRESS_TYPES.PAYMENT;

    if (
      decodeType === Cardano.TYPES.BYRON_LEGACY ||
      decodeType === Cardano.TYPES.BYRON_ICARUS
    ) {
      return this.decodeByron(address, options.addressType ?? Cardano.ADDRESS_TYPES.PUBLIC_KEY);
    } else if (decodeType === Cardano.ADDRESS_TYPES.PAYMENT) {
      return this.decodeShelley(address, options.network ?? 'mainnet');
    } else if (
      decodeType === Cardano.ADDRESS_TYPES.STAKING ||
      decodeType === Cardano.ADDRESS_TYPES.REWARD
    ) {
      return this.decodeShelleyStaking(address, options.network ?? 'mainnet');
    }
    throw new AddressError('Invalid decode type');
  }

  static encodeByron(
    publicKey: PublicKey,
    chainCode: Uint8Array,
    addressAttributes: any,
    addressType: string = Cardano.ADDRESS_TYPES.PUBLIC_KEY
  ): string {
    if (!(addressType in this.addressTypes)) {
      throw new AddressError('Invalid address type');
    }

    const serialized = encode([
      this.addressTypes[addressType],
      [this.addressTypes[addressType], toBuffer(concatBytes(publicKey.getRawCompressed().slice(1), getBytes(chainCode)))],
      addressAttributes
    ]);

    const rootHash = blake2b224(sha3_256(serialized));
    const payload = encode([
      rootHash,
      addressAttributes,
      this.addressTypes[addressType]
    ]);


    const full = encodeCanonical([
      new Tagged(this.payloadTag, payload), bytesToInteger(crc32(payload))
    ]);
    return ensureString(base58Encode(full));
  }

  static encodeByronIcarus(
    publicKey: Buffer | string | PublicKey,
    chainCode: Uint8Array | string,
    addressType: string = Cardano.ADDRESS_TYPES.PUBLIC_KEY
  ): string {
    const pk = validateAndGetPublicKey(publicKey, KholawEd25519PublicKey);
    return this.encodeByron(pk, getBytes(chainCode), { }, addressType);
  }

  static encodeByronLegacy(
    publicKey: Buffer | string | PublicKey,
    path: string,
    pathKey: Uint8Array | string,
    chainCode: Uint8Array | string,
    addressType: string = Cardano.ADDRESS_TYPES.PUBLIC_KEY
  ): string {
    const pathK = getBytes(pathKey);
    if (pathK.length !== 32) {
      throw new BaseError('Invalid HD path key length', { expected: 32, got: pathK.length });
    }
    const pk = validateAndGetPublicKey(publicKey, KholawEd25519PublicKey);
    const indexes = pathToIndexes(path);
    const plain = concatBytes(
      integerToBytes(0x9f),
      ...indexes.map(i => encode(i)),
      integerToBytes(0xff)
    );
    const { cipherText, tag } = chacha20Poly1305Encrypt(
      pathK, this.chacha20Poly1305Nonce, this.chacha20Poly1305AssociatedData, plain
    );

    const attributes = new Map<number, Buffer>();
    attributes.set(1, encode(toBuffer(concatBytes(cipherText, tag))));
    return this.encodeByron(pk, toBuffer(chainCode), attributes, addressType);
  }

  static decodeByron(address: string, addressType: string = Cardano.ADDRESS_TYPES.PUBLIC_KEY): string {
    const decoded = base58Decode(address);
    const outer = decode(decoded) as [Tagged, number];

    if (!Array.isArray(outer) || outer.length !== 2 || !(outer[0] instanceof Tagged)) {
      throw new AddressError('Invalid address encoding');
    }

    const tag = outer[0];
    if (tag.tag !== this.payloadTag) {
      throw new AddressError('Invalid CBOR tag');
    }

    const payload = tag.value as Buffer;
    const crcExpected = outer[1];
    const crcActual = bytesToInteger(crc32(payload));

    if (Number(crcExpected) !== Number(crcActual)) {
      throw new AddressError('Invalid CRC', { expected: crcExpected, got: crcActual });
    }

    const inner = decode(payload) as [Uint8Array, Map<number, any>, number];
    const [rootHash, attrs, tagType] = inner;

    if (tagType !== this.addressTypes[addressType]) {
      throw new AddressError('Invalid address type', { expected: this.addressTypes[addressType], got: tagType });
    }

    if (rootHash.length !== 28) {
      throw new AddressError('Invalid root hash length', { expected: 28, got: rootHash.length });
    }

    let extra = Buffer.alloc(0);
    if (attrs instanceof Map && attrs.has(1)) {
      const attr1 = attrs.get(1);
      const decrypted = decode(attr1);
      extra = Buffer.isBuffer(decrypted) ? decrypted : Buffer.from(decrypted);
    }
    return bytesToString(concatBytes(rootHash, extra));
  }

  static decodeByronIcarus(
    address: string, addressType: string = Cardano.ADDRESS_TYPES.PUBLIC_KEY
  ): string {
    return CardanoAddress.decodeByron(address, addressType);
  }

  static decodeByronLegacy(
    address: string, addressType: string = Cardano.ADDRESS_TYPES.PUBLIC_KEY
  ): string {
    return CardanoAddress.decodeByron(address, addressType);
  }

  static encodeShelley(
    publicKey: Buffer | string | PublicKey,
    stakingPublicKey: Buffer | string | PublicKey,
    network: string
  ): string {
    const pk = validateAndGetPublicKey(publicKey, KholawEd25519PublicKey);
    const spk = validateAndGetPublicKey(stakingPublicKey, KholawEd25519PublicKey);
    const prefix = integerToBytes(
      (this.prefixTypes['payment'] << 4) + this.networkTypes[network]
    );
    const hash1 = blake2b224(pk.getRawCompressed().slice(1));
    const hash2 = blake2b224(spk.getRawCompressed().slice(1));
    return bech32Encode(this.paymentAddressHrp[network], toBuffer(concatBytes(prefix, hash1, hash2)));
  }

  static decodeShelley(address: string, network: string): string {
    const [hrp, data] = bech32Decode(this.paymentAddressHrp[network], address);
    if (!data || data.length !== 57) {
      throw new AddressError('Invalid length', { expected: 57, got: data?.length });
    }
    const prefix = integerToBytes(
      (this.prefixTypes['payment'] << 4) + this.networkTypes[network]
    );
    if (!data.slice(0, 1).equals(prefix)) {
      throw new AddressError('Invalid prefix');
    }
    return bytesToString(data.slice(1));
  }

  static encodeShelleyStaking(
    publicKey: Buffer | string | PublicKey, network: string
  ): string {
    const pk = validateAndGetPublicKey(publicKey, KholawEd25519PublicKey);
    const prefix = integerToBytes(
      (this.prefixTypes['reward'] << 4) + this.networkTypes[network]
    );
    const hash = blake2b224(pk.getRawCompressed().slice(1));
    return bech32Encode(this.rewardAddressHrp[network], Buffer.concat([prefix, hash]));
  }

  static decodeShelleyStaking(address: string, network: string): string {
    const [hrp, data] = bech32Decode(this.rewardAddressHrp[network], address);
    if (!data || data.length !== 29) {
      throw new AddressError('Invalid length', { expected: 29, got: data?.length });
    }
    const prefix = integerToBytes(
      (this.prefixTypes['reward'] << 4) + this.networkTypes[network]
    );
    if (!data.slice(0, 1).equals(prefix)) {
      throw new AddressError('Invalid prefix');
    }
    return bytesToString(data.slice(1));
  }
}
