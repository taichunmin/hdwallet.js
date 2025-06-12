"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CIP1852Derivation = exports.ROLES = void 0;
const derivation_1 = require("./derivation");
const cryptocurrencies_1 = require("../cryptocurrencies");
const utils_1 = require("../utils");
const exceptions_1 = require("../exceptions");
exports.ROLES = {
    EXTERNAL_CHAIN: 'external-chain',
    INTERNAL_CHAIN: 'internal-chain',
    STAKING_KEY: 'staking-key'
};
class CIP1852Derivation extends derivation_1.Derivation {
    purpose = [1852, true];
    coinType;
    account;
    role;
    address;
    constructor(options = {
        coinType: cryptocurrencies_1.Cardano.COIN_TYPE, account: 0, role: exports.ROLES.EXTERNAL_CHAIN, address: 0
    }) {
        super(options);
        this.coinType = (0, utils_1.normalizeIndex)(options.coinType ?? cryptocurrencies_1.Cardano.COIN_TYPE, true);
        this.account = (0, utils_1.normalizeIndex)(options.account ?? 0, true);
        this.role = (0, utils_1.normalizeIndex)(this.getRoleValue(options.role ?? exports.ROLES.EXTERNAL_CHAIN), false);
        this.address = (0, utils_1.normalizeIndex)(options.address ?? 0, false);
        this.updateDerivation();
    }
    static getName() {
        return 'CIP1852';
    }
    getRoleValue(role, nameOnly = false) {
        if (Array.isArray(role)) {
            throw new exceptions_1.DerivationError('Bad role instance', {
                expected: 'number | string', got: typeof role
            });
        }
        const externalChange = [exports.ROLES.EXTERNAL_CHAIN, 0, '0'];
        const internalChange = [exports.ROLES.INTERNAL_CHAIN, 1, '1'];
        const stakingKey = [exports.ROLES.STAKING_KEY, 2, '2'];
        const exceptedRole = [
            ...externalChange, ...internalChange, ...stakingKey
        ];
        if (!exceptedRole.includes(role)) {
            throw new exceptions_1.DerivationError(`Bad ${this.getName()} role index`, {
                expected: exceptedRole, got: role
            });
        }
        if (externalChange.includes(role))
            return nameOnly ? exports.ROLES.EXTERNAL_CHAIN : 0;
        if (internalChange.includes(role))
            return nameOnly ? exports.ROLES.INTERNAL_CHAIN : 1;
        if (stakingKey.includes(role))
            return nameOnly ? exports.ROLES.STAKING_KEY : 2;
    }
    updateDerivation() {
        const [path, indexes, derivations] = (0, utils_1.normalizeDerivation)(`m/${(0, utils_1.indexTupleToString)(this.purpose)}/` +
            `${(0, utils_1.indexTupleToString)(this.coinType)}/` +
            `${(0, utils_1.indexTupleToString)(this.account)}/` +
            `${(0, utils_1.indexTupleToString)(this.role)}/` +
            `${(0, utils_1.indexTupleToString)(this.address)}`);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = path;
    }
    fromCoinType(coinType) {
        this.coinType = (0, utils_1.normalizeIndex)(coinType, true);
        this.updateDerivation();
        return this;
    }
    fromAccount(account) {
        this.account = (0, utils_1.normalizeIndex)(account, true);
        this.updateDerivation();
        return this;
    }
    fromRole(role) {
        this.role = (0, utils_1.normalizeIndex)(this.getRoleValue(role), false);
        this.updateDerivation();
        return this;
    }
    fromAddress(address) {
        this.address = (0, utils_1.normalizeIndex)(address, false);
        this.updateDerivation();
        return this;
    }
    clean() {
        this.coinType = (0, utils_1.normalizeIndex)(cryptocurrencies_1.Cardano.COIN_TYPE, true);
        this.account = (0, utils_1.normalizeIndex)(0, true);
        this.role = (0, utils_1.normalizeIndex)(this.getRoleValue(exports.ROLES.EXTERNAL_CHAIN), false);
        this.address = (0, utils_1.normalizeIndex)(0, false);
        this.updateDerivation();
        return this;
    }
    getPurpose() {
        return this.purpose[0];
    }
    getCoinType() {
        return this.coinType[0];
    }
    getAccount() {
        return this.account.length === 3 ? this.account[1] : this.account[0];
    }
    getRole(nameOnly = true) {
        return this.getRoleValue(this.role[0], nameOnly);
    }
    getAddress() {
        return this.address.length === 3 ? this.address[1] : this.address[0];
    }
}
exports.CIP1852Derivation = CIP1852Derivation;
//# sourceMappingURL=cip1852.js.map