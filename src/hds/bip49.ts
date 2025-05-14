// SPDX-License-Identifier: MIT

import { EllipticCurveCryptography } from '../ecc';
import { BIP49Derivation, CHANGES } from '../derivations';
import { Bitcoin } from '../cryptocurrencies';
import { P2WPKHInP2SHAddress } from '../addresses';
import { BIP44HD } from './bip44';
import { PUBLIC_KEY_TYPES } from '../const';
import { serialize } from '../keys';
import { HDAddressOptionsInterface, HDOptionsInterface } from '../interfaces';
import { integerToBytes, checkTypeMatch } from '../utils';
import { DerivationError } from '../exceptions';

export class BIP49HD extends BIP44HD {

  protected coinType: number;

  constructor(ecc: typeof EllipticCurveCryptography, options: HDOptionsInterface = {
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
  }) {
    super(ecc, options);
    this.coinType = options.coinType ?? Bitcoin.COIN_TYPE;
    this.derivation = new BIP49Derivation({
      coinType: this.coinType,
      account: options.account ?? 0,
      change: options.change ?? CHANGES.EXTERNAL_CHANGE,
      address: options.account ?? 0
    });
  }

  getName(): string {
    return 'BIP49';
  }

  fromDerivation(derivation: BIP49Derivation): this {
    if (!checkTypeMatch(derivation, BIP49Derivation).isValid) {
      throw new DerivationError('Invalid derivation instance', {
        expected: BIP49Derivation.name, got: derivation.constructor.name
      });
    }

    this.cleanDerivation();
    this.derivation = derivation;
    for (const index of this.derivation.getIndexes()) {
      this.drive(index);
    }
    return this;
  }

  updateDerivation(derivation: BIP49Derivation): this {
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
      this.derivation = new BIP49Derivation({
        coinType: this.coinType, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
      });
      this.depth = 5;
    } else if (this.rootPublicKey) {
      this.publicKey = this.rootPublicKey;
      this.chainCode = this.rootChainCode;
      this.parentFingerprint = integerToBytes(0, 4);
      this.derivation = new BIP49Derivation({
        coinType: this.coinType, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
      });
      this.depth = 5;
    }
    return this;
  }

  getRootXPrivateKey(
    version: Uint8Array | number = Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2WPKH_IN_P2SH, encoded = true
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
    version: Uint8Array | number = Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2WPKH_IN_P2SH, encoded = true
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
    version: Uint8Array | number = Bitcoin.NETWORKS.MAINNET.XPRIVATE_KEY_VERSIONS.P2WPKH_IN_P2SH, encoded = true
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
    version: Uint8Array | number = Bitcoin.NETWORKS.MAINNET.XPUBLIC_KEY_VERSIONS.P2WPKH_IN_P2SH, encoded = true
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
    scriptAddressPrefix: Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX
  }): string {
    return P2WPKHInP2SHAddress.encode(this.publicKey!, {
      scriptAddressPrefix: options.scriptAddressPrefix ?? Bitcoin.NETWORKS.MAINNET.SCRIPT_ADDRESS_PREFIX,
      publicKeyType: this.publicKeyType
    });
  }
}
