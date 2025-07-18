// SPDX-License-Identifier: MIT
import { p256 } from '@noble/curves/p256';
import { bytesToNumberBE, numberToBytesBE } from '@noble/curves/abstract/utils';
import { PrivateKey } from '../../private-key';
import { SLIP10Nist256p1PublicKey } from './public-key';
import { SLIP10_SECP256K1_CONST } from '../../../consts';
import { getBytes } from '../../../utils';
export class SLIP10Nist256p1PrivateKey extends PrivateKey {
    getName() {
        return 'SLIP10-Nist256p1';
    }
    static fromBytes(privateKey) {
        if (privateKey.length !== SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH) {
            throw new Error('Invalid private key bytes length');
        }
        try {
            const priv = bytesToNumberBE(getBytes(privateKey));
            const point = p256.Point.BASE.multiply(priv);
            return new SLIP10Nist256p1PrivateKey({ priv, point });
        }
        catch {
            throw new Error('Invalid private key bytes');
        }
    }
    static getLength() {
        return SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH;
    }
    getRaw() {
        return numberToBytesBE(this.privateKey.priv, SLIP10_SECP256K1_CONST.PRIVATE_KEY_BYTE_LENGTH);
    }
    getUnderlyingObject() {
        return this.privateKey;
    }
    getPublicKey() {
        return new SLIP10Nist256p1PublicKey(this.privateKey.point);
    }
}
//# sourceMappingURL=private-key.js.map