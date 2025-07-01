"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDerivation = void 0;
const derivation_1 = require("./derivation");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
class CustomDerivation extends derivation_1.Derivation {
    static getName() {
        return 'Custom';
    }
    fromPath(path) {
        if (!path.startsWith('m/')) {
            throw new exceptions_1.DerivationError('Bad path format', { expected: "like this type of path \'m/0'/0\'", got: path });
        }
        const [_path, indexes, derivations] = (0, utils_1.normalizeDerivation)(path, undefined);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = _path;
        return this;
    }
    fromIndexes(indexes) {
        const [path, _indexes, derivations] = (0, utils_1.normalizeDerivation)(undefined, indexes);
        this.derivations = derivations;
        this.indexes = _indexes;
        this.path = path;
        return this;
    }
    fromIndex(index, hardened = false) {
        const path = hardened ? `${index}'` : `${index}`;
        return this.fromPath(this.path === 'm/' ? `${this.path}${path}` : `${this.path}/${path}`);
    }
    clean() {
        const [path, indexes, derivations] = (0, utils_1.normalizeDerivation)(undefined, undefined);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = path;
        return this;
    }
}
exports.CustomDerivation = CustomDerivation;
//# sourceMappingURL=custom.js.map