// SPDX-License-Identifier: MIT
export class Seed {
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
//# sourceMappingURL=seed.js.map