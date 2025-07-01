"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Nist256p1PrivateKey = void 0;
const p256_1 = require("@noble/curves/p256");
const utils_1 = require("@noble/curves/abstract/utils");
const private_key_1 = require("../../private-key");
const public_key_1 = require("./public-key");
const consts_1 = require("../../../consts");
const utils_2 = require("../../../utils");
class SLIP10Nist256p1PrivateKey extends private_key_1.PrivateKey {
    getName() {
        return 'SLIP10-Nist256p1';
    }
    static fromBytes(privateKey) {
        if (privateKey.length !== consts_1.SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH) {
            throw new Error('Invalid private key bytes length');
        }
        try {
            const priv = (0, utils_1.bytesToNumberBE)((0, utils_2.getBytes)(privateKey));
            const point = p256_1.p256.Point.BASE.multiply(priv);
            return new SLIP10Nist256p1PrivateKey({ priv, point });
        }
        catch {
            throw new Error('Invalid private key bytes');
        }
    }
    static getLength() {
        return consts_1.SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH;
    }
    getRaw() {
        return (0, utils_1.numberToBytesBE)(this.privateKey.priv, consts_1.SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH);
    }
    getUnderlyingObject() {
        return this.privateKey;
    }
    getPublicKey() {
        return new public_key_1.SLIP10Nist256p1PublicKey(this.privateKey.point);
    }
}
exports.SLIP10Nist256p1PrivateKey = SLIP10Nist256p1PrivateKey;
//# sourceMappingURL=private-key.js.map