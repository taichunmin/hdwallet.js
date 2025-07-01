// SPDX-License-Identifier: MIT
import { secp256k1 } from '@noble/curves/secp256k1';
import { Point } from '../../point';
import { getBytes } from '../../../utils';
export class SLIP10Secp256k1Point extends Point {
    getName() {
        return 'SLIP10-Secp256k1';
    }
    static fromBytes(point) {
        try {
            const pubPoint = secp256k1.Point.fromHex(getBytes(point));
            return new SLIP10Secp256k1Point(pubPoint);
        }
        catch {
            throw new Error('Invalid point bytes');
        }
    }
    static fromCoordinates(x, y) {
        const pt = new secp256k1.Point(x, y, 1n);
        return new SLIP10Secp256k1Point(pt);
    }
    getUnderlyingObject() {
        return this.point;
    }
    getX() {
        return this.point.toAffine().x;
    }
    getY() {
        return this.point.toAffine().y;
    }
    getRawEncoded() {
        return this.point.toRawBytes(true);
    }
    getRawDecoded() {
        return this.point.toRawBytes(false).slice(1);
    }
    add(point) {
        const other = point.getUnderlyingObject();
        const sum = this.point.add(other);
        return new SLIP10Secp256k1Point(sum);
    }
    multiply(scalar) {
        const prod = this.point.multiply(scalar);
        return new SLIP10Secp256k1Point(prod);
    }
}
//# sourceMappingURL=point.js.map