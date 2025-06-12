// SPDX-License-Identifier: MIT
import { Derivation } from './derivation';
import { normalizeIndex, normalizeDerivation, indexTupleToString } from '../utils';
export class ElectrumDerivation extends Derivation {
    change;
    address;
    constructor(options = {
        change: 0, address: 0
    }) {
        super(options);
        this.change = normalizeIndex(options.change ?? 0, false);
        this.address = normalizeIndex(options.address ?? 0, false);
        this.updateDerivation();
    }
    static getName() {
        return 'Electrum';
    }
    updateDerivation() {
        const [path, indexes, derivations] = normalizeDerivation(`m/${indexTupleToString(this.change)}/` +
            `${indexTupleToString(this.address)}`);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = path;
    }
    fromChange(change) {
        this.change = normalizeIndex(change, false);
        this.updateDerivation();
        return this;
    }
    fromAddress(address) {
        this.address = normalizeIndex(address, false);
        this.updateDerivation();
        return this;
    }
    clean() {
        this.change = normalizeIndex(0, false);
        this.address = normalizeIndex(0, false);
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
//# sourceMappingURL=electrum.js.map