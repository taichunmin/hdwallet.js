// SPDX-License-Identifier: MIT
import { Derivation } from './derivation';
import { Cardano } from '../cryptocurrencies';
import { normalizeIndex, normalizeDerivation, indexTupleToString } from '../utils';
import { DerivationError } from '../exceptions';
export const ROLES = {
    EXTERNAL_CHAIN: 'external-chain',
    INTERNAL_CHAIN: 'internal-chain',
    STAKING_KEY: 'staking-key'
};
export class CIP1852Derivation extends Derivation {
    purpose = [1852, true];
    coinType;
    account;
    role;
    address;
    constructor(options = {
        coinType: Cardano.COIN_TYPE, account: 0, role: ROLES.EXTERNAL_CHAIN, address: 0
    }) {
        super(options);
        this.coinType = normalizeIndex(options.coinType ?? Cardano.COIN_TYPE, true);
        this.account = normalizeIndex(options.account ?? 0, true);
        this.role = normalizeIndex(this.getRoleValue(options.role ?? ROLES.EXTERNAL_CHAIN), false);
        this.address = normalizeIndex(options.address ?? 0, false);
        this.updateDerivation();
    }
    static getName() {
        return 'CIP1852';
    }
    getRoleValue(role, nameOnly = false) {
        if (Array.isArray(role)) {
            throw new DerivationError('Bad role instance', {
                expected: 'number | string', got: typeof role
            });
        }
        const externalChange = [ROLES.EXTERNAL_CHAIN, 0, '0'];
        const internalChange = [ROLES.INTERNAL_CHAIN, 1, '1'];
        const stakingKey = [ROLES.STAKING_KEY, 2, '2'];
        const exceptedRole = [
            ...externalChange, ...internalChange, ...stakingKey
        ];
        if (!exceptedRole.includes(role)) {
            throw new DerivationError(`Bad ${this.getName()} role index`, {
                expected: exceptedRole, got: role
            });
        }
        if (externalChange.includes(role))
            return nameOnly ? ROLES.EXTERNAL_CHAIN : 0;
        if (internalChange.includes(role))
            return nameOnly ? ROLES.INTERNAL_CHAIN : 1;
        if (stakingKey.includes(role))
            return nameOnly ? ROLES.STAKING_KEY : 2;
    }
    updateDerivation() {
        const [path, indexes, derivations] = normalizeDerivation(`m/${indexTupleToString(this.purpose)}/` +
            `${indexTupleToString(this.coinType)}/` +
            `${indexTupleToString(this.account)}/` +
            `${indexTupleToString(this.role)}/` +
            `${indexTupleToString(this.address)}`);
        this.derivations = derivations;
        this.indexes = indexes;
        this.path = path;
    }
    fromCoinType(coinType) {
        this.coinType = normalizeIndex(coinType, true);
        this.updateDerivation();
        return this;
    }
    fromAccount(account) {
        this.account = normalizeIndex(account, true);
        this.updateDerivation();
        return this;
    }
    fromRole(role) {
        this.role = normalizeIndex(this.getRoleValue(role), false);
        this.updateDerivation();
        return this;
    }
    fromAddress(address) {
        this.address = normalizeIndex(address, false);
        this.updateDerivation();
        return this;
    }
    clean() {
        this.coinType = normalizeIndex(Cardano.COIN_TYPE, true);
        this.account = normalizeIndex(0, true);
        this.role = normalizeIndex(this.getRoleValue(ROLES.EXTERNAL_CHAIN), false);
        this.address = normalizeIndex(0, false);
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
//# sourceMappingURL=cip1852.js.map