"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.Derivation = void 0;
const utils_1 = require("../utils");
class Derivation {
    path;
    indexes;
    derivations;
    purpose = [0, true];
    constructor(options = {}) {
        const [path, indexes, derivations] = (0, utils_1.normalizeDerivation)(options?.path, options?.indexes);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = path;
    }
    static getName() {
        throw new Error('Must override getName()');
    }
    getName() {
        return this.constructor.getName();
    }
    clean() {
        throw new Error('Must override clean()');
    }
    getPath() {
        return this.path;
    }
    getIndexes() {
        return this.indexes;
    }
    getDerivations() {
        return this.derivations;
    }
    getDepth() {
        return this.derivations.length;
    }
    getPurpose() {
        throw new Error('Must override getPurpose()');
    }
    getCoinType() {
        throw new Error('Must override getCoinType()');
    }
    getAccount() {
        throw new Error('Must override getAccount()');
    }
    getChange(...args) {
        throw new Error('Must override getChange()');
    }
    getRole(...args) {
        throw new Error('Must override getRole()');
    }
    getAddress() {
        throw new Error('Must override getAddress()');
    }
    getMinor() {
        throw new Error('Must override getMinor()');
    }
    getMajor() {
        throw new Error('Must override getMajor()');
    }
}
exports.Derivation = Derivation;
//# sourceMappingURL=derivation.js.map