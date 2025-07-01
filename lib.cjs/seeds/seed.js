"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed = void 0;
class Seed {
    seed;
    options;
    constructor(seed, options = {}) {
        this.seed = seed;
        this.options = options;
    }
    static getName() {
        throw new Error("Must override getName()");
    }
    getName() {
        return this.constructor.getName();
    }
    getSeed() {
        return this.seed;
    }
    static fromMnemonic(mnemonic, options = {}) {
        throw new Error("Must override fromMnemonic()");
    }
}
exports.Seed = Seed;
//# sourceMappingURL=seed.js.map