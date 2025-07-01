"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Ed25519Blake2bPoint = void 0;
const point_1 = require("../point");
class SLIP10Ed25519Blake2bPoint extends point_1.SLIP10Ed25519Point {
    getName() {
        return 'SLIP10-Ed25519-Blake2b';
    }
}
exports.SLIP10Ed25519Blake2bPoint = SLIP10Ed25519Blake2bPoint;
//# sourceMappingURL=point.js.map