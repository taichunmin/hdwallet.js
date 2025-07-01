// SPDX-License-Identifier: MIT
import { KHOLAW_ED25519_CONST } from '../../../consts';
import { SLIP10Ed25519PrivateKey } from '../../slip10';
import { KholawEd25519PublicKey } from './public-key';
import { pointScalarMulBase } from '../../../libs/ed25519-utils';
export class KholawEd25519PrivateKey extends SLIP10Ed25519PrivateKey {
    constructor(privateKey, options) {
        if (!options.extendedKey) {
            throw new Error('Extended key is required');
        }
        if (options.extendedKey.length !== SLIP10Ed25519PrivateKey.getLength()) {
            throw new Error('Invalid extended key length');
        }
        super(privateKey, options);
    }
    getName() {
        return 'Kholaw-Ed25519';
    }
    static fromBytes(privateKey) {
        if (privateKey.length !== KHOLAW_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
            throw new Error('Invalid private key bytes length');
        }
        const privateKeyBytes = privateKey.slice(0, SLIP10Ed25519PrivateKey.getLength());
        const extendedKeyBytes = privateKey.slice(SLIP10Ed25519PrivateKey.getLength());
        return new KholawEd25519PrivateKey(privateKeyBytes, { extendedKey: extendedKeyBytes });
    }
    static getLength() {
        return KHOLAW_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
    }
    getRaw() {
        const combined = new Uint8Array(KholawEd25519PrivateKey.getLength());
        combined.set(this.privateKey);
        if (!this.options.extendedKey)
            throw new Error('Extended key is required');
        combined.set(this.options.extendedKey, SLIP10Ed25519PrivateKey.getLength());
        return combined;
    }
    getPublicKey() {
        const point = pointScalarMulBase(this.privateKey);
        return KholawEd25519PublicKey.fromBytes(point);
    }
}
//# sourceMappingURL=private-key.js.map