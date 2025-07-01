// SPDX-License-Identifier: MIT
import { ed25519 } from '@noble/curves/ed25519';
import { Point } from '../../point';
import { SLIP10_ED25519_CONST } from '../../../consts';
import { toBuffer } from '../../../utils';
export class SLIP10Ed25519Point extends Point {
    getName() {
        return 'SLIP10-Ed25519';
    }
    static fromBytes(point) {
        if (point.length !== SLIP10_ED25519_CONST.PUBLIC_KEY_BYTE_LENGTH) {
            throw new Error('Invalid point bytes length');
        }
        try {
            const pt = ed25519.Point.fromHex(point);
            return new this(pt);
        }
        catch {
            throw new Error('Invalid point bytes');
        }
    }
    static fromCoordinates(x, y) {
        try {
            const pt = ed25519.Point.fromAffine({ x, y });
            return new this(pt);
        }
        catch {
            throw new Error('Invalid coordinates for ed25519');
        }
    }
    getUnderlyingObject() {
        return this.point;
    }
    getX() {
        return this.point.x;
    }
    getY() {
        return this.point.y;
    }
    getRawEncoded() {
        return this.point.toRawBytes();
    }
    getRawDecoded() {
        const xBytes = this.point.x.toString(16).padStart(64, '0');
        const yBytes = this.point.y.toString(16).padStart(64, '0');
        return Uint8Array.from(toBuffer(xBytes + yBytes, 'hex'));
    }
    add(point) {
        const other = point.getUnderlyingObject();
        const sum = this.point.add(other);
        return new SLIP10Ed25519Point(sum);
    }
    multiply(scalar) {
        const prod = this.point.multiply(scalar);
        return new SLIP10Ed25519Point(prod);
    }
}
//# sourceMappingURL=point.js.map