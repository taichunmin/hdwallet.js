// SPDX-License-Identifier: MIT
import * as nacl from 'tweetnacl-blake2b';
import { PrivateKey } from '../../../private-key';
import { SLIP10Ed25519Blake2bPublicKey } from './public-key';
import { SLIP10_ED25519_CONST } from '../../../../consts';
import { getBytes } from '../../../../utils';
export class SLIP10Ed25519Blake2bPrivateKey extends PrivateKey {
    getName() {
        return 'SLIP10-Ed25519-Blake2b';
    }
    static fromBytes(privateKey) {
        if (privateKey.length !== SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH) {
            throw new Error('Invalid private key bytes length');
        }
        try {
            const kp = nacl.sign.keyPair.fromSeed(getBytes(privateKey));
            return new this(kp);
        }
        catch {
            throw new Error('Invalid private key bytes');
        }
    }
    static getLength() {
        return SLIP10_ED25519_CONST.PRIVATE_KEY_BYTE_LENGTH;
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
        return SLIP10Ed25519Blake2bPublicKey.fromBytes(publicKey);
    }
}
//# sourceMappingURL=private-key.js.map