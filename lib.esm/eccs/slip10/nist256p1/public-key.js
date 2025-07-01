// SPDX-License-Identifier: MIT
import { p256 } from '@noble/curves/p256';
import { PublicKey } from '../../public-key';
import { SLIP10Nist256p1Point } from './point';
import { SLIP10_SECP256K1_CONST } from '../../../consts';
import { getBytes } from '../../../utils';
export class SLIP10Nist256p1PublicKey extends PublicKey {
    getName() {
        return 'SLIP10-Nist256p1';
    }
    static fromBytes(publicKey) {
        try {
            const point = p256.Point.fromHex(getBytes(publicKey));
            return new SLIP10Nist256p1PublicKey(point);
        }
        catch {
            throw new Error('Invalid key bytes');
        }
    }
    static fromPoint(point) {
        const base = point.getUnderlyingObject();
        return new SLIP10Nist256p1PublicKey(base);
    }
    static getCompressedLength() {
        return SLIP10_SECP256K1_CONST.PUBLIC_KEY_COMPRESSED_BYTE_LENGTH;
    }
    static getUncompressedLength() {
        return SLIP10_SECP256K1_CONST.PUBLIC_KEY_UNCOMPRESSED_BYTE_LENGTH;
    }
    getUnderlyingObject() {
        return this.publicKey;
    }
    getRawCompressed() {
        return this.publicKey.toRawBytes(true);
    }
    getRawUncompressed() {
        return this.publicKey.toRawBytes(false);
    }
    getRaw() {
        return this.getRawCompressed();
    }
    getPoint() {
        return new SLIP10Nist256p1Point(this.publicKey);
    }
}
//# sourceMappingURL=public-key.js.map