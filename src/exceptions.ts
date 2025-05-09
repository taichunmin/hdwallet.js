// SPDX-License-Identifier: MIT

export interface ErrorOptionsInterface {
  expected?: any; got?: any; detail?: string;
}

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

export class EntropyError extends BaseError { }

export class MnemonicError extends BaseError { }

export class SeedError extends BaseError { }

export class ECCError extends BaseError { }

export class PublicKeyError extends BaseError { }

export class ChecksumError extends BaseError { }

export class NetworkError extends BaseError { }

export class AddressError extends BaseError { }

export class CryptocurrencyError extends BaseError { }

export class SymbolError extends BaseError { }

export class DerivationError extends BaseError { }
