// SPDX-License-Identifier: MIT
export class Point {
    point;
    constructor(point) {
        this.point = point;
    }
    static fromBytes(point) {
        throw new Error('Must override fromBytes()');
    }
    static fromCoordinates(x, y) {
        throw new Error('Must override fromCoordinates()');
    }
    getRaw() {
        return this.getRawEncoded();
    }
}
//# sourceMappingURL=point.js.map