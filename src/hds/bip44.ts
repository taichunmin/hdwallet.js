// SPDX-License-Identifier: MIT

import { EllipticCurveCryptography } from '../ecc';
import { BIP44Derivation, CHANGES, Derivation } from '../derivations';
import { Bitcoin } from '../cryptocurrencies';
import { P2PKHAddress } from '../addresses';
import { BIP32HD } from './bip32';
import { PUBLIC_KEY_TYPES } from '../const';
import { HDAddressOptionsInterface, HDOptionsInterface } from '../interfaces';
import { integerToBytes, checkTypeMatch } from '../utils';
import { DerivationError } from '../exceptions';

export class BIP44HD extends BIP32HD {

  protected coinType: number;
  protected derivation: BIP44Derivation;

  constructor(ecc: typeof EllipticCurveCryptography, options: HDOptionsInterface = {
    publicKeyType: PUBLIC_KEY_TYPES.COMPRESSED
  }) {
    super(ecc, options);
    this.coinType = options.coinType ?? Bitcoin.COIN_TYPE;
    this.derivation = new BIP44Derivation({
      coinType: this.coinType,
      account: options.account ?? 0,
      change: options.change ?? CHANGES.EXTERNAL_CHANGE,
      address: options.account ?? 0
    });
  }

  getName(): string {
    return 'BIP44';
  }

  fromCoinType(coinType: number): this {
    this.derivation.fromCoinType(coinType);
    this.fromDerivation(this.derivation);
    return this;
  }

  fromAccount(account: number | [number, number]): this {
    this.derivation.fromAccount(account);
    this.fromDerivation(this.derivation);
    return this;
  }

  fromChange(change: string | number): this {
    this.derivation.fromChange(change);
    this.fromDerivation(this.derivation);
    return this;
  }

  fromAddress(address: number | [number, number]): this {
    this.derivation.fromAddress(address);
    this.fromDerivation(this.derivation);
    return this;
  }

  fromDerivation(derivation: BIP44Derivation): this {
    if (!checkTypeMatch(derivation, BIP44Derivation).isValid) {
      throw new DerivationError('Invalid derivation instance', {
        expected: BIP44Derivation.name, got: derivation.constructor.name
      });
    }

    this.cleanDerivation();
    this.derivation = derivation;
    for (const index of this.derivation.getIndexes()) {
      this.drive(index);
    }
    return this;
  }

  updateDerivation(derivation: BIP44Derivation): this {
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
      this.derivation = new BIP44Derivation({
        coinType: this.coinType, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
      });
      this.depth = 5;
    } else if (this.rootPublicKey) {
      this.publicKey = this.rootPublicKey;
      this.chainCode = this.rootChainCode;
      this.parentFingerprint = integerToBytes(0, 4);
      this.derivation = new BIP44Derivation({
        coinType: this.coinType, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
      });
      this.depth = 5;
    }
    return this;
  }

  getAddress(options: HDAddressOptionsInterface = {
    publicKeyAddressPrefix: Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX
  }): string {
    return P2PKHAddress.encode(this.publicKey!, {
      publicKeyAddressPrefix: options.publicKeyAddressPrefix ?? Bitcoin.NETWORKS.MAINNET.PUBLIC_KEY_ADDRESS_PREFIX,
      publicKeyType: this.publicKeyType
    });
  }
}
