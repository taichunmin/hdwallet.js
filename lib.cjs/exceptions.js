"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.DerivationError = exports.HDError = exports.SymbolError = exports.CryptocurrencyError = exports.AddressError = exports.NetworkError = exports.SemanticError = exports.ChecksumError = exports.PublicKeyError = exports.WIFError = exports.PrivateKeyError = exports.XPublicKeyError = exports.XPrivateKeyError = exports.ExtendedKeyError = exports.ECCError = exports.SeedError = exports.MnemonicError = exports.EntropyError = exports.TypeError = exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message, options) {
        if ((options?.expected || options?.got) && options?.detail) {
            super(`${message}, (expected: ${options?.expected} | got: ${options?.got}) ${options?.detail}`);
        }
        else if (options?.expected || options?.got) {
            super(`${message}, (expected: ${options?.expected} | got: ${options?.got})`);
        }
        else if (options?.detail) {
            super(`${message} ${options?.detail}`);
        }
        else {
            super(`${message}`);
        }
    }
}
exports.BaseError = BaseError;
class TypeError extends BaseError {
}
exports.TypeError = TypeError;
class EntropyError extends BaseError {
}
exports.EntropyError = EntropyError;
class MnemonicError extends BaseError {
}
exports.MnemonicError = MnemonicError;
class SeedError extends BaseError {
}
exports.SeedError = SeedError;
class ECCError extends BaseError {
}
exports.ECCError = ECCError;
class ExtendedKeyError extends BaseError {
}
exports.ExtendedKeyError = ExtendedKeyError;
class XPrivateKeyError extends BaseError {
}
exports.XPrivateKeyError = XPrivateKeyError;
class XPublicKeyError extends BaseError {
}
exports.XPublicKeyError = XPublicKeyError;
class PrivateKeyError extends BaseError {
}
exports.PrivateKeyError = PrivateKeyError;
class WIFError extends BaseError {
}
exports.WIFError = WIFError;
class PublicKeyError extends BaseError {
}
exports.PublicKeyError = PublicKeyError;
class ChecksumError extends BaseError {
}
exports.ChecksumError = ChecksumError;
class SemanticError extends BaseError {
}
exports.SemanticError = SemanticError;
class NetworkError extends BaseError {
}
exports.NetworkError = NetworkError;
class AddressError extends BaseError {
}
exports.AddressError = AddressError;
class CryptocurrencyError extends BaseError {
}
exports.CryptocurrencyError = CryptocurrencyError;
class SymbolError extends BaseError {
}
exports.SymbolError = SymbolError;
class HDError extends BaseError {
}
exports.HDError = HDError;
class DerivationError extends BaseError {
}
exports.DerivationError = DerivationError;
//# sourceMappingURL=exceptions.js.map