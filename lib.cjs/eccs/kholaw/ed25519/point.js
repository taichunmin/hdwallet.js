"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.KholawEd25519Point = void 0;
const slip10_1 = require("../../slip10");
class KholawEd25519Point extends slip10_1.SLIP10Ed25519Point {
    getName() {
        return 'Kholaw-Ed25519';
    }
}
exports.KholawEd25519Point = KholawEd25519Point;
//# sourceMappingURL=point.js.map