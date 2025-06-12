"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneroDerivation = void 0;
const derivation_1 = require("./derivation");
const utils_1 = require("../utils");
class MoneroDerivation extends derivation_1.Derivation {
    minor;
    major;
    constructor(options = {
        minor: 1, major: 0
    }) {
        super(options);
        this.minor = (0, utils_1.normalizeIndex)(options.minor ?? 0, false);
        this.major = (0, utils_1.normalizeIndex)(options.major ?? 0, false);
        this.updateDerivation();
    }
    static getName() {
        return 'Monero';
    }
    updateDerivation() {
        const [path, indexes, derivations] = (0, utils_1.normalizeDerivation)(`m/${(0, utils_1.indexTupleToString)(this.minor)}/` +
            `${(0, utils_1.indexTupleToString)(this.major)}`);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = path;
    }
    fromMinor(minor) {
        this.minor = (0, utils_1.normalizeIndex)(minor, false);
        this.updateDerivation();
        return this;
    }
    fromMajor(major) {
        this.major = (0, utils_1.normalizeIndex)(major, false);
        this.updateDerivation();
        return this;
    }
    clean() {
        this.minor = (0, utils_1.normalizeIndex)(1, false);
        this.major = (0, utils_1.normalizeIndex)(0, false);
        this.updateDerivation();
        return this;
    }
    getMinor() {
        return this.minor.length === 3 ? this.minor[1] : this.minor[0];
    }
    getMajor() {
        return this.major.length === 3 ? this.major[1] : this.major[0];
    }
}
exports.MoneroDerivation = MoneroDerivation;
//# sourceMappingURL=monero.js.map