// SPDX-License-Identifier: MIT
import { secp256k1 } from '@noble/curves/secp256k1';
import { PublicKey } from '../../public-key';
import { SLIP10Secp256k1Point } from './point';
import { SLIP10_SECP256K1_CONST } from '../../../consts';
import { getBytes } from '../../../utils';
export class SLIP10Secp256k1PublicKey extends PublicKey {
    getName() {
        return 'SLIP10-Secp256k1';
    }
    static fromBytes(publicKey) {
        try {
            const point = secp256k1.Point.fromHex(getBytes(publicKey));
            return new SLIP10Secp256k1PublicKey(point);
        }
        catch {
            throw new Error('Invalid key bytes');
        }
    }
    static fromPoint(point) {
        const base = point.getUnderlyingObject();
        return new SLIP10Secp256k1PublicKey(base);
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
        return new SLIP10Secp256k1Point(this.publicKey);
    }
}
//# sourceMappingURL=public-key.js.map