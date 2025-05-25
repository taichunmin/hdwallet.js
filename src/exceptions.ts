// SPDX-License-Identifier: MIT

import { ErrorOptionsInterface } from './interfaces';

export class BaseError extends Error {

  constructor(
    message: string, options?: ErrorOptionsInterface
  ) {
    if (options?.expected && options?.got && options?.detail) {
      super(`${message}, (expected: ${options?.expected} | got: ${options?.got}) ${options?.detail}`);
    } else if (options?.expected && options?.got) {
      super(`${message}, (expected: ${options?.expected} | got: ${options?.got})`);
    } else if (options?.detail) {
      super(`${message} ${options?.detail}`);
    } else {
      super(`${message}`)
    }
  }
}

export class TypeError extends BaseError { }

export class EntropyError extends BaseError { }

export class MnemonicError extends BaseError { }

export class SeedError extends BaseError { }

export class ECCError extends BaseError { }

export class ExtendedKeyError extends BaseError { }

export class XPrivateKeyError extends BaseError { }

export class XPublicKeyError extends BaseError { }

export class PrivateKeyError extends BaseError { }

export class WIFError extends BaseError { }

export class PublicKeyError extends BaseError { }

export class ChecksumError extends BaseError { }

export class SemanticError extends BaseError { }

export class NetworkError extends BaseError { }

export class AddressError extends BaseError { }

export class CryptocurrencyError extends BaseError { }

export class SymbolError extends BaseError { }

export class DerivationError extends BaseError { }
