"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateKey = exports.PublicKey = exports.Point = exports.EllipticCurveCryptography = void 0;
const point_1 = require("./point");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return point_1.Point; } });
const public_key_1 = require("./public-key");
Object.defineProperty(exports, "PublicKey", { enumerable: true, get: function () { return public_key_1.PublicKey; } });
const private_key_1 = require("./private-key");
Object.defineProperty(exports, "PrivateKey", { enumerable: true, get: function () { return private_key_1.PrivateKey; } });
class EllipticCurveCryptography {
    static NAME;
    static ORDER;
    static GENERATOR;
    static POINT;
    static PUBLIC_KEY;
    static PRIVATE_KEY;
}
exports.EllipticCurveCryptography = EllipticCurveCryptography;
//# sourceMappingURL=ecc.js.map