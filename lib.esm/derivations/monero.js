// SPDX-License-Identifier: MIT
import { Derivation } from './derivation';
import { normalizeIndex, normalizeDerivation, indexTupleToString } from '../utils';
export class MoneroDerivation extends Derivation {
    minor;
    major;
    constructor(options = {
        minor: 1, major: 0
    }) {
        super(options);
        this.minor = normalizeIndex(options.minor ?? 0, false);
        this.major = normalizeIndex(options.major ?? 0, false);
        this.updateDerivation();
    }
    static getName() {
        return 'Monero';
    }
    updateDerivation() {
        const [path, indexes, derivations] = normalizeDerivation(`m/${indexTupleToString(this.minor)}/` +
            `${indexTupleToString(this.major)}`);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = path;
    }
    fromMinor(minor) {
        this.minor = normalizeIndex(minor, false);
        this.updateDerivation();
        return this;
    }
    fromMajor(major) {
        this.major = normalizeIndex(major, false);
        this.updateDerivation();
        return this;
    }
    clean() {
        this.minor = normalizeIndex(1, false);
        this.major = normalizeIndex(0, false);
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
//# sourceMappingURL=monero.js.map