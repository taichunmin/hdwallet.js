"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Ed25519Blake2bPrivateKey = void 0;
const tslib_1 = require("tslib");
const nacl = tslib_1.__importStar(require("tweetnacl-blake2b"));
const private_key_1 = require("../../../private-key");
const public_key_1 = require("./public-key");
const consts_1 = require("../../../../consts");
const utils_1 = require("../../../../utils");
class SLIP10Ed25519Blake2bPrivateKey extends private_key_1.PrivateKey {
    getName() {
        return 'SLIP10-Ed25519-Blake2b';
    }
    static fromBytes(privateKey) {
        if (privateKey.length !== consts_1.SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
            throw new Error('Invalid private key bytes length');
        }
        try {
            const kp = nacl.sign.keyPair.fromSeed((0, utils_1.getBytes)(privateKey));
            return new this(kp);
        }
        catch {
            throw new Error('Invalid private key bytes');
        }
    }
    static getLength() {
        return consts_1.SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
    }
    getRaw() {
        const secret = this.privateKey.secretKey;
        return new Uint8Array(secret.subarray(0, nacl.sign.seedLength));
    }
    getUnderlyingObject() {
        return this.privateKey;
    }
    getPublicKey() {
        const publicKey = this.privateKey.publicKey;
        return public_key_1.SLIP10Ed25519Blake2bPublicKey.fromBytes(publicKey);
    }
}
exports.SLIP10Ed25519Blake2bPrivateKey = SLIP10Ed25519Blake2bPrivateKey;
//# sourceMappingURL=private-key.js.map