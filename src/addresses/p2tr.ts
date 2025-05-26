// SPDX-License-Identifier: MIT

import { segwitEncode, segwitDecode } from '../libs/segwit-bech32';
import {
  PublicKey, SLIP10Secp256k1ECC, SLIP10Secp256k1Point, SLIP10Secp256k1PublicKey, validateAndGetPublicKey
} from '../ecc';
import { Bitcoin } from '../cryptocurrencies';
import { sha256 } from '../crypto';
import {
  getBytes, integerToBytes, bytesToInteger, bytesToString
} from '../utils';
import { AddressOptionsInterface } from '../interfaces';
import { Address } from './address';


export class P2TRAddress extends Address {
  
  static hrp: string = Bitcoin.NETWORKS.MAINNET.HRP;
  static fieldSize: bigint = BigInt(Bitcoin.PARAMS.FIELD_SIZE);
  static tapTweakTagHash: Uint8Array = getBytes(Bitcoin.PARAMS.TAP_TWEAK_SHA256);
  static witnessVersion: number = Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2TR;

  static getName(): string {
    return 'P2TR';
  }

  static taggedHash(tag: string | Uint8Array, data: Uint8Array): Uint8Array {
    const tagHash = typeof tag === 'string' ? sha256(tag) : tag;
    return sha256(new Uint8Array([...tagHash, ...tagHash, ...data]));
  }

  static hashTapTweak(pubKey: PublicKey): Uint8Array {
    const x = BigInt(pubKey.getPoint().getX());
    return this.taggedHash(this.tapTweakTagHash, integerToBytes(x));
  }

  static liftX(pubKey: PublicKey): SLIP10Secp256k1Point {
    const p = this.fieldSize;
    const x = BigInt(pubKey.getPoint().getX());

    if (x >= p) throw new Error('Unable to compute LiftX point');
    
    const xCubed = this.modPow(x, BigInt(3), p);
    const c = (xCubed + BigInt(7)) % p;

    const y = this.modularSqrt(c, p);
    const ySquared = this.modPow(y, BigInt(2), p);
    
    if (ySquared !== c) throw new Error('Unable to compute LiftX point');
    
    const evenY = y % BigInt(2) === BigInt(0) ? y : p - y;
    return SLIP10Secp256k1Point.fromCoordinates(x, evenY);
  }

  static tweakPublicKey(pubKey: PublicKey): Uint8Array {
    const tweak = BigInt(bytesToInteger(this.hashTapTweak(pubKey)));
    const lifted = this.liftX(pubKey);
    const tweaked = lifted.add(SLIP10Secp256k1ECC.GENERATOR.multiply(tweak));
    return integerToBytes(BigInt(tweaked.getX()));
  }

  static encode(
    publicKey: string | Uint8Array | PublicKey, options: AddressOptionsInterface = {
      hrp: this.hrp,
      witnessVersion: this.witnessVersion
    }
  ): string {
    
    const pubKey = validateAndGetPublicKey(publicKey, SLIP10Secp256k1PublicKey);
    return segwitEncode(
      options.hrp ?? this.hrp,
      options.witnessVersion ?? this.witnessVersion,
      this.tweakPublicKey(pubKey)
    );
  }

  static decode(
    address: string, options: AddressOptionsInterface = { hrp: this.hrp }
  ): string {

    const [witnessVersion, data] = segwitDecode(options.hrp ?? this.hrp, address);

    const expectedLength = SLIP10Secp256k1PublicKey.getCompressedLength() - 1;
    if (data?.length !== expectedLength) {
      throw new Error(`Invalid length (expected: ${expectedLength}, got: ${data?.length})`);
    }

    if (witnessVersion !== this.witnessVersion) {
      throw new Error(`Invalid witness version (expected: ${this.witnessVersion}, got: ${witnessVersion})`);
    }

    return bytesToString(data);
  }

  private static modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    if (modulus === BigInt(1)) return BigInt(0);
    let result = BigInt(1);
    base = base % modulus;
    while (exponent > BigInt(0)) {
      if (exponent % BigInt(2) === BigInt(1)) {
        result = (result * base) % modulus;
      }
      exponent = exponent >> BigInt(1);
      base = (base * base) % modulus;
    }
    return result;
  }

  private static modularSqrt(a: bigint, p: bigint): bigint {
    const exponent = (p + BigInt(1)) / BigInt(4);
    return this.modPow(a, exponent, p);
  }
}
