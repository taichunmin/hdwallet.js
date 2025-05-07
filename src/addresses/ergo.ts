// SPDX-License-Identifier: MIT

import { Buffer } from 'buffer';
import { ensureString, encode, decode } from '../libs/base58';
import {
  IPublicKey,
  SLIP10Secp256k1PublicKey,
  validateAndGetPublicKey
} from '../ecc';
import { Ergo } from '../cryptocurrencies';
import { blake2b256 } from '../crypto';
import { bytesToString, integerToBytes, validateAndGetData, toBuffer } from '../utils';
import { AddressOptionsInterface, IAddress } from './iaddress';
import { AddressError, NetworkError } from '../exceptions';
import { INetwork } from '../cryptocurrencies/icryptocurrency';

export class ErgoAddress implements IAddress {

  static checksumLength: number = Ergo.PARAMS.CHECKSUM_LENGTH;
  static addressType: string = Ergo.DEFAULT_ADDRESS_TYPE;
  static addressTypes: Record<string, number> = {
    'p2pkh': Ergo.PARAMS.ADDRESS_TYPES.P2PKH,
    'p2sh': Ergo.PARAMS.ADDRESS_TYPES.P2SH
  };
  static networkType: string = Ergo.DEFAULT_NETWORK;
  static networkTypes: Record<string, number> = {
    'mainnet': Ergo.NETWORKS.MAINNET.TYPE,
    'testnet': Ergo.NETWORKS.TESTNET.TYPE
  };

  static getName(): string {
    return 'Ergo';
  }

  static computeChecksum(data: Buffer): Buffer {
    return blake2b256(data).slice(0, this.checksumLength);
  }

  static encode(
    publicKey: Buffer | string | IPublicKey, options: AddressOptionsInterface = {
      addressType: this.addressType,
      networkType: this.networkType
    }
  ): string {

    const network = options.networkType ?? this.networkType;
    let [networkKey, isValid] = validateAndGetData(network, INetwork);
    networkKey = isValid ? networkKey.getName() : networkKey;
    const networkType = this.networkTypes[networkKey];
    if (networkType === undefined) {
      throw new NetworkError('Invalid Ergo network type', {
        expected: Object.keys(this.networkTypes),
        got: network
      });
    }
    const typeKey = options.addressType ?? this.addressType;
    const addressType = this.addressTypes[typeKey];
    if (addressType === undefined) {
      throw new AddressError('Invalid Ergo address type', {
        expected: Object.keys(this.addressTypes),
        got: typeKey
      });
    }
    const pk = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    const prefix = integerToBytes(addressType + networkType);
    const addressPayload = Buffer.concat([prefix, pk.rawCompressed()]);
    const checksum = this.computeChecksum(addressPayload);

    return ensureString(encode(Buffer.concat([addressPayload, checksum])));
  }

  static decode(
    address: string, options: AddressOptionsInterface = {
      addressType: this.addressType,
      networkType: this.networkType
    }
  ): string {

    const network = options.networkType ?? this.networkType;
    let [networkKey, isValid] = validateAndGetData(network, INetwork);
    networkKey = isValid ? networkKey.getName() : networkKey;
    const networkType = this.networkTypes[networkKey];
    if (networkType === undefined) {
      throw new NetworkError('Invalid Ergo network type', {
        expected: Object.keys(this.networkTypes),
        got: network
      });
    }
    const typeKey = options.addressType ?? this.addressType;
    const addressType = this.addressTypes[typeKey];
    if (addressType === undefined) {
      throw new AddressError('Invalid Ergo address type', {
        expected: Object.keys(this.addressTypes),
        got: typeKey
      });
    }

    const prefix = toBuffer(integerToBytes(addressType + networkType));
    const decoded = decode(address);

    const expectedLength =
      SLIP10Secp256k1PublicKey.compressedLength() + this.checksumLength + prefix.length;
    if (decoded.length !== expectedLength) {
      throw new AddressError('Invalid length', {
        expected: expectedLength,
        got: decoded.length
      });
    }

    const checksum = decoded.slice(-this.checksumLength);
    const payload = decoded.slice(0, -this.checksumLength);
    const checksumExpected = this.computeChecksum(payload);

    if (!checksum.equals(checksumExpected)) {
      throw new AddressError('Invalid checksum', {
        expected: checksumExpected.toString('hex'),
        got: checksum.toString('hex')
      });
    }

    const prefixGot = payload.slice(0, prefix.length);
    if (!prefix.equals(prefixGot)) {
      throw new AddressError('Invalid prefix', {
        expected: prefix.toString('hex'),
        got: prefixGot.toString('hex')
      });
    }

    const pubKey = payload.slice(prefix.length);
    if (!SLIP10Secp256k1PublicKey.isValidBytes(pubKey)) {
      throw new AddressError('Invalid public key', {
        got: pubKey.toString('hex')
      });
    }

    return bytesToString(pubKey);
  }
}
