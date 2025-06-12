"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
class Point {
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
exports.Point = Point;
//# sourceMappingURL=point.js.map