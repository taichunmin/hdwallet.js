"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectrumDerivation = void 0;
const derivation_1 = require("./derivation");
const utils_1 = require("../utils");
class ElectrumDerivation extends derivation_1.Derivation {
    change;
    address;
    constructor(options = {
        change: 0, address: 0
    }) {
        super(options);
        this.change = (0, utils_1.normalizeIndex)(options.change ?? 0, false);
        this.address = (0, utils_1.normalizeIndex)(options.address ?? 0, false);
        this.updateDerivation();
    }
    static getName() {
        return 'Electrum';
    }
    updateDerivation() {
        const [path, indexes, derivations] = (0, utils_1.normalizeDerivation)(`m/${(0, utils_1.indexTupleToString)(this.change)}/` +
            `${(0, utils_1.indexTupleToString)(this.address)}`);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = path;
    }
    fromChange(change) {
        this.change = (0, utils_1.normalizeIndex)(change, false);
        this.updateDerivation();
        return this;
    }
    fromAddress(address) {
        this.address = (0, utils_1.normalizeIndex)(address, false);
        this.updateDerivation();
        return this;
    }
    clean() {
        this.change = (0, utils_1.normalizeIndex)(0, false);
        this.address = (0, utils_1.normalizeIndex)(0, false);
        this.updateDerivation();
        return this;
    }
    getChange() {
        return this.change.length === 3 ? this.change[1] : this.change[0];
    }
    getAddress() {
        return this.address.length === 3 ? this.address[1] : this.address[0];
    }
}
exports.ElectrumDerivation = ElectrumDerivation;
//# sourceMappingURL=electrum.js.map