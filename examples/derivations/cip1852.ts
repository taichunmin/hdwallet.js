// SPDX-License-Identifier: MIT

import { Cardano } from '../../src/cryptocurrencies';
import { DERIVATIONS, CIP1852Derivation, ROLES } from '../../src/derivations';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'CIP1852',
  purpose: 1852,
  coinType: Cardano.COIN_TYPE,
  account: 5,
  role: 'staking-key',
  address: 45,
  path: "m/1852'/1815'/5'/2/45",
  indexes: [ 2147485500, 2147485463, 2147483653, 2, 45 ],
  depth: 5,
  derivations: [
    {
      coinType: Cardano.COIN_TYPE, account: 5, role: ROLES.STAKING_KEY, address: 45
    },
    {
      coinType: '1815', account: '5', role: 'staking-key', address: '45'
    },
    {
      coinType: 1815, account: '5', role: 2, address: '45'
    }
  ],
  default: {
    purpose: 1852,
    coinType: Cardano.COIN_TYPE,
    account: 0,
    role: 'external-chain',
    address: 0,
    path: "m/1852'/1815'/0'/0/0",
    indexes: [ 2147485500, 2147485463, 2147483648, 0, 0 ],
    depth: 5
  }
}

const CIP1852DerivationClass: typeof CIP1852Derivation = DERIVATIONS.getDerivationClass(data.name);

for (let derivation of data.derivations) {

  const cip1852DerivationClass: CIP1852Derivation = new CIP1852DerivationClass({
    coinType: derivation.coinType, account: derivation.account, role: derivation.role, address: derivation.address
  });
  const cip1852Derivation: CIP1852Derivation = new CIP1852Derivation({
    coinType: derivation.coinType, account: derivation.account, role: derivation.role, address: derivation.address
  });

  console.log(
    isAllEqual(cip1852DerivationClass.getPurpose(), cip1852Derivation.getPurpose(), data.purpose),
    isAllEqual(cip1852DerivationClass.getCoinType(), cip1852Derivation.getCoinType(), data.coinType),
    isAllEqual(cip1852DerivationClass.getAccount(), cip1852Derivation.getAccount(), data.account),
    isAllEqual(cip1852DerivationClass.getRole(true), cip1852Derivation.getRole(true), data.role),
    isAllEqual(cip1852DerivationClass.getAddress(), cip1852Derivation.getAddress(), data.address),
    isAllEqual(cip1852DerivationClass.getPath(), cip1852Derivation.getPath(), data.path),
    isAllEqual(cip1852DerivationClass.getIndexes(), cip1852Derivation.getIndexes(), data.indexes),
    isAllEqual(cip1852DerivationClass.getDepth(), cip1852Derivation.getDepth(), data.depth)
  );

  cip1852DerivationClass.clean();
  cip1852Derivation.clean();

  console.log(
    isAllEqual(cip1852DerivationClass.getPurpose(), cip1852Derivation.getPurpose(), data.default.purpose),
    isAllEqual(cip1852DerivationClass.getCoinType(), cip1852Derivation.getCoinType(), data.default.coinType),
    isAllEqual(cip1852DerivationClass.getAccount(), cip1852Derivation.getAccount(), data.default.account),
    isAllEqual(cip1852DerivationClass.getRole(true), cip1852Derivation.getRole(true), data.default.role),
    isAllEqual(cip1852DerivationClass.getAddress(), cip1852Derivation.getAddress(), data.default.address),
    isAllEqual(cip1852DerivationClass.getPath(), cip1852Derivation.getPath(), data.default.path),
    isAllEqual(cip1852DerivationClass.getIndexes(), cip1852Derivation.getIndexes(), data.default.indexes),
    isAllEqual(cip1852DerivationClass.getDepth(), cip1852Derivation.getDepth(), data.default.depth)
  );

  cip1852DerivationClass.fromCoinType(derivation.coinType);
  cip1852Derivation.fromCoinType(derivation.coinType);
  cip1852DerivationClass.fromAccount(derivation.account);
  cip1852Derivation.fromAccount(derivation.account);
  cip1852DerivationClass.fromRole(derivation.role);
  cip1852Derivation.fromRole(derivation.role);
  cip1852DerivationClass.fromAddress(derivation.address);
  cip1852Derivation.fromAddress(derivation.address);

  console.log(
    isAllEqual(cip1852DerivationClass.getPurpose(), cip1852Derivation.getPurpose(), data.purpose),
    isAllEqual(cip1852DerivationClass.getCoinType(), cip1852Derivation.getCoinType(), data.coinType),
    isAllEqual(cip1852DerivationClass.getAccount(), cip1852Derivation.getAccount(), data.account),
    isAllEqual(cip1852DerivationClass.getRole(true), cip1852Derivation.getRole(true), data.role),
    isAllEqual(cip1852DerivationClass.getAddress(), cip1852Derivation.getAddress(), data.address),
    isAllEqual(cip1852DerivationClass.getPath(), cip1852Derivation.getPath(), data.path),
    isAllEqual(cip1852DerivationClass.getIndexes(), cip1852Derivation.getIndexes(), data.indexes),
    isAllEqual(cip1852DerivationClass.getDepth(), cip1852Derivation.getDepth(), data.depth), '\n'
  );
}

console.log('Purpose:', data.purpose);
console.log('Coin Type:', data.coinType);
console.log('Account:', data.account);
console.log('Role:', data.role);
console.log('Address:', data.address, '\n');

console.log('Path:', data.path);
console.log('Indexes:', data.indexes);
console.log('Depth:', data.depth);
