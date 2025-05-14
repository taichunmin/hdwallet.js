// SPDX-License-Identifier: MIT

import { EllipticCurveCryptography } from '../ecc';
import { BIP86Derivation, CHANGES } from '../derivations';
import { Bitcoin } from '../cryptocurrencies';
import { P2TRAddress } from '../addresses';
import { BIP44HD } from './bip44';
import { PUBLIC_KEY_TYPES } from '../const';
import { serialize } from '../keys';
import { HDAddressOptionsInterface, HDOptionsInterface } from '../interfaces';
import { integerToBytes, checkTypeMatch } from '../utils';
import { DerivationError } from '../exceptions';

export class BIP86HD extends BIP44HD {

  protected coinType: number;

  constructor(ecc: typeof EllipticCurveCryptography, options: HDOptionsInterface = {
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
  }) {
    super(ecc, options);
    this.coinType = options.coinType ?? Bitcoin.COIN_TYPE;
    this.derivation = new BIP86Derivation({
      coinType: this.coinType,
      account: options.account ?? 0,
      change: options.change ?? CHANGES.EXTERNAL_CHANGE,
      address: options.account ?? 0
    });
  }

  getName(): string {
    return 'BIP86';
  }

  fromDerivation(derivation: BIP86Derivation): this {
    if (!checkTypeMatch(derivation, BIP86Derivation).isValid) {
      throw new DerivationError('Invalid derivation instance', {
        expected: BIP86Derivation.name, got: derivation.constructor.name
      });
    }

    this.cleanDerivation();
    this.derivation = derivation;
    for (const index of this.derivation.getIndexes()) {
      this.drive(index);
    }
    return this;
  }

  updateDerivation(derivation: BIP86Derivation): this {
    this.cleanDerivation();
    this.fromDerivation(derivation);
    return this;
  }

  cleanDerivation(): this {
    if (this.rootPrivateKey) {
      this.privateKey = this.rootPrivateKey;
      this.chainCode = this.rootChainCode;
      this.parentFingerprint = integerToBytes(0, 4);
      this.publicKey = this.privateKey.getPublicKey();
      this.derivation = new BIP86Derivation({
        coinType: this.coinType, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
      });
      this.depth = 5;
    } else if (this.rootPublicKey) {
      this.publicKey = this.rootPublicKey;
      this.chainCode = this.rootChainCode;
      this.parentFingerprint = integerToBytes(0, 4);
      this.derivation = new BIP86Derivation({
        coinType: this.coinType, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
      });
      this.depth = 5;
    }
    return this;
  }

  getRootXPrivateKey(
    version: Uint8Array | number = Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2TR, encoded = true
  ): string | undefined {
    if (!this.getRootPrivateKey() || !this.getRootChainCode()) return undefined;

    return serialize(
      typeof version === 'number' ? integerToBytes(version) : version,
      this.rootDepth,
      new Uint8Array(4),
      this.rootIndex,
      this.getRootChainCode()!,
      '00' + this.getRootPrivateKey()!,
      encoded
    );
  }

  getRootXPublicKey(
    version: Uint8Array | number = Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2TR, encoded = true
  ): string | undefined {
    if (!this.getRootChainCode()) return undefined;

    return serialize(
      typeof version === 'number' ? integerToBytes(version) : version,
      this.rootDepth,
      new Uint8Array(4),
      this.rootIndex,
      this.getRootChainCode()!,
      this.getRootPublicKey(PUBLIC_KEY_TYPES.COMPRESSED)!,
      encoded
    );
  }

  getXPrivateKey(
    version: Uint8Array | number = Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2TR, encoded = true
  ): string | undefined {
    if (!this.getPrivateKey() || !this.getChainCode()) return undefined;

    return serialize(
      typeof version === 'number' ? integerToBytes(version) : version,
      this.depth,
      this.getParentFingerprint()!,
      this.index,
      this.getChainCode()!,
      '00' + this.getPrivateKey()!,
      encoded
    );
  }

  getXPublicKey(
    version: Uint8Array | number = Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2TR, encoded = true
  ): string | undefined {
    if (!this.getChainCode()) return undefined;

    return serialize(
      typeof version === 'number' ? integerToBytes(version) : version,
      this.depth,
      this.getParentFingerprint()!,
      this.index,
      this.getChainCode()!,
      this.getPublicKey(PUBLIC_KEY_TYPES.COMPRESSED)!,
      encoded
    );
  }

  getAddress(options: HDAddressOptionsInterface = {
    hrp: Bitcoin.NETWORKS.MAINNET.HRP,
    witnessVersion: Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2TR
  }): string {
    return P2TRAddress.encode(this.publicKey!, {
      hrp: options.hrp ?? Bitcoin.NETWORKS.MAINNET.HRP,
      witnessVersion: options.witnessVersion ?? Bitcoin.NETWORKS.MAINNET.WITNESS_VERSIONS.P2TR,
      publicKeyType: this.publicKeyType
    });
  }
}
