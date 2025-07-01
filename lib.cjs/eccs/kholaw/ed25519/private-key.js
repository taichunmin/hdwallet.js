"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.KholawEd25519PrivateKey = void 0;
const consts_1 = require("../../../consts");
const slip10_1 = require("../../slip10");
const public_key_1 = require("./public-key");
const ed25519_utils_1 = require("../../../libs/ed25519-utils");
class KholawEd25519PrivateKey extends slip10_1.SLIP10Ed25519PrivateKey {
    constructor(privateKey, options) {
        if (!options.extendedKey) {
            throw new Error('Extended key is required');
        }
        if (options.extendedKey.length !== slip10_1.SLIP10Ed25519PrivateKey.getLength()) {
            throw new Error('Invalid extended key length');
        }
        super(privateKey, options);
    }
    getName() {
        return 'Kholaw-Ed25519';
    }
    static fromBytes(privateKey) {
        if (privateKey.length !== consts_1.KHOLAW_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
            throw new Error('Invalid private key bytes length');
        }
        const privateKeyBytes = privateKey.slice(0, slip10_1.SLIP10Ed25519PrivateKey.getLength());
        const extendedKeyBytes = privateKey.slice(slip10_1.SLIP10Ed25519PrivateKey.getLength());
        return new KholawEd25519PrivateKey(privateKeyBytes, { extendedKey: extendedKeyBytes });
    }
    static getLength() {
        return consts_1.KHOLAW_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
    }
    getRaw() {
        const combined = new Uint8Array(KholawEd25519PrivateKey.getLength());
        combined.set(this.privateKey);
        if (!this.options.extendedKey)
            throw new Error('Extended key is required');
        combined.set(this.options.extendedKey, slip10_1.SLIP10Ed25519PrivateKey.getLength());
        return combined;
    }
    getPublicKey() {
        const point = (0, ed25519_utils_1.pointScalarMulBase)(this.privateKey);
        return public_key_1.KholawEd25519PublicKey.fromBytes(point);
    }
}
exports.KholawEd25519PrivateKey = KholawEd25519PrivateKey;
//# sourceMappingURL=private-key.js.map