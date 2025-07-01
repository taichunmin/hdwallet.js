"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIP10Ed25519MoneroPoint = void 0;
const point_1 = require("../point");
class SLIP10Ed25519MoneroPoint extends point_1.SLIP10Ed25519Point {
    getName() {
        return 'SLIP10-Ed25519-Monero';
    }
}
exports.SLIP10Ed25519MoneroPoint = SLIP10Ed25519MoneroPoint;
//# sourceMappingURL=point.js.map