import { ErrorOptionsInterface } from './interfaces';
export declare class BaseError extends Error {
    constructor(message: string, options?: ErrorOptionsInterface);
}
export declare class TypeError extends BaseError {
}
export declare class EntropyError extends BaseError {
}
export declare class MnemonicError extends BaseError {
}
export declare class SeedError extends BaseError {
}
export declare class ECCError extends BaseError {
}
export declare class ExtendedKeyError extends BaseError {
}
export declare class XPrivateKeyError extends BaseError {
}
export declare class XPublicKeyError extends BaseError {
}
export declare class PrivateKeyError extends BaseError {
}
export declare class WIFError extends BaseError {
}
export declare class PublicKeyError extends BaseError {
}
export declare class ChecksumError extends BaseError {
}
export declare class SemanticError extends BaseError {
}
export declare class NetworkError extends BaseError {
}
export declare class AddressError extends BaseError {
}
export declare class CryptocurrencyError extends BaseError {
}
export declare class SymbolError extends BaseError {
}
export declare class HDError extends BaseError {
}
export declare class DerivationError extends BaseError {
}
//# sourceMappingURL=exceptions.d.ts.map