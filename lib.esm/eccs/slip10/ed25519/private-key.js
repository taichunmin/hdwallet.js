// SPDX-License-Identifier: MIT
import { ed25519 } from '@noble/curves/ed25519';
import { PrivateKey } from '../../private-key';
import { SLIP10Ed25519PublicKey } from './public-key';
import { SLIP10_ED25519_CONST } from '../../../consts';
export class SLIP10Ed25519PrivateKey extends PrivateKey {
    getName() {
        return 'SLIP10-Ed25519';
    }
    static fromBytes(privateKey) {
        if (privateKey.length !== SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
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
        return SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
    }
    getRaw() {
        return this.privateKey;
    }
    getUnderlyingObject() {
        return this.privateKey;
    }
    getPublicKey() {
        const pub = ed25519.getPublicKey(this.getRaw());
        return SLIP10Ed25519PublicKey.fromBytes(pub);
    }
}
//# sourceMappingURL=private-key.js.map