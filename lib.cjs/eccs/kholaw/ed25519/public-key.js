"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.KholawEd25519PublicKey = void 0;
const slip10_1 = require("../../slip10");
const point_1 = require("./point");
class KholawEd25519PublicKey extends slip10_1.SLIP10Ed25519PublicKey {
    getName() {
        return 'Kholaw-Ed25519';
    }
    getPoint() {
        return new point_1.KholawEd25519Point(this.publicKey);
    }
}
exports.KholawEd25519PublicKey = KholawEd25519PublicKey;
//# sourceMappingURL=public-key.js.map