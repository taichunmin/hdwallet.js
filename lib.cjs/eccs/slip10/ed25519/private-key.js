"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Ed25519PrivateKey = void 0;
const ed25519_1 = require("@noble/curves/ed25519");
const private_key_1 = require("../../private-key");
const public_key_1 = require("./public-key");
const consts_1 = require("../../../consts");
class SLIP10Ed25519PrivateKey extends private_key_1.PrivateKey {
    getName() {
        return 'SLIP10-Ed25519';
    }
    static fromBytes(privateKey) {
        if (privateKey.length !== consts_1.SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
            throw new Error('Invalid private key bytes length');
        }
        try {
            return new this(privateKey);
        }
        catch {
            throw new Error('Invalid private key bytes');
        }
    }
    static getLength() {
        return consts_1.SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
    }
    getRaw() {
        return this.privateKey;
    }
    getUnderlyingObject() {
        return this.privateKey;
    }
    getPublicKey() {
        const pub = ed25519_1.ed25519.getPublicKey(this.getRaw());
        return public_key_1.SLIP10Ed25519PublicKey.fromBytes(pub);
    }
}
exports.SLIP10Ed25519PrivateKey = SLIP10Ed25519PrivateKey;
//# sourceMappingURL=private-key.js.map