// SPDX-License-Identifier: MIT

import { Bitcoin } from '../../src/cryptocurrencies';
import { DERIVATIONS, BIP84Derivation, CHANGES } from '../../src/derivations';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'BIP84',
  purpose: 84,
  coinType: Bitcoin.COIN_TYPE,
  account: 0,
  change: 'external-chain',
  address: 0,
  path: "m/84'/0'/0'/0/0",
  indexes: [ 2147483732, 2147483648, 2147483648, 0, 0 ],
  depth: 5,
  derivations: [
    {
      coinType: Bitcoin.COIN_TYPE, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
    },
    {
      coinType: '0', account: '0', change: 'external-chain', address: '0'
    },
    {
      coinType: 0, account: '0', change: 0, address: '0'
    }
  ],
  default: {
    purpose: 84,
    coinType: Bitcoin.COIN_TYPE,
    account: 0,
    change: 'external-chain',
    address: 0,
    path: "m/84'/0'/0'/0/0",
    indexes: [ 2147483732, 2147483648, 2147483648, 0, 0 ],
    depth: 5
  }
}

const BIP84DerivationClass: typeof BIP84Derivation = DERIVATIONS.getDerivationClass(data.name);

for (let derivation of data.derivations) {

  const bip84DerivationClass: BIP84Derivation = new BIP84DerivationClass({
    coinType: derivation.coinType, account: derivation.account, change: derivation.change, address: derivation.address
  });
  const bip84Derivation: BIP84Derivation = new BIP84Derivation({
    coinType: derivation.coinType, account: derivation.account, change: derivation.change, address: derivation.address
  });

  console.log(
    isAllEqual(bip84DerivationClass.getPurpose(), bip84Derivation.getPurpose(), data.purpose),
    isAllEqual(bip84DerivationClass.getCoinType(), bip84Derivation.getCoinType(), data.coinType),
    isAllEqual(bip84DerivationClass.getAccount(), bip84Derivation.getAccount(), data.account),
    isAllEqual(bip84DerivationClass.getChange(true), bip84Derivation.getChange(true), data.change),
    isAllEqual(bip84DerivationClass.getAddress(), bip84Derivation.getAddress(), data.address),
    isAllEqual(bip84DerivationClass.getPath(), bip84Derivation.getPath(), data.path),
    isAllEqual(bip84DerivationClass.getIndexes(), bip84Derivation.getIndexes(), data.indexes),
    isAllEqual(bip84DerivationClass.getDepth(), bip84Derivation.getDepth(), data.depth),
  );

  bip84DerivationClass.clean();
  bip84Derivation.clean();

  console.log(
    isAllEqual(bip84DerivationClass.getPurpose(), bip84Derivation.getPurpose(), data.default.purpose),
    isAllEqual(bip84DerivationClass.getCoinType(), bip84Derivation.getCoinType(), data.default.coinType),
    isAllEqual(bip84DerivationClass.getAccount(), bip84Derivation.getAccount(), data.default.account),
    isAllEqual(bip84DerivationClass.getChange(true), bip84Derivation.getChange(true), data.default.change),
    isAllEqual(bip84DerivationClass.getAddress(), bip84Derivation.getAddress(), data.default.address),
    isAllEqual(bip84DerivationClass.getPath(), bip84Derivation.getPath(), data.default.path),
    isAllEqual(bip84DerivationClass.getIndexes(), bip84Derivation.getIndexes(), data.default.indexes),
    isAllEqual(bip84DerivationClass.getDepth(), bip84Derivation.getDepth(), data.default.depth),
  );

  bip84DerivationClass.fromCoinType(derivation.coinType);
  bip84Derivation.fromCoinType(derivation.coinType);
  bip84DerivationClass.fromAccount(derivation.account);
  bip84Derivation.fromAccount(derivation.account);
  bip84DerivationClass.fromChange(derivation.change);
  bip84Derivation.fromChange(derivation.change);
  bip84DerivationClass.fromAddress(derivation.address);
  bip84Derivation.fromAddress(derivation.address);

  console.log(
    isAllEqual(bip84DerivationClass.getPurpose(), bip84Derivation.getPurpose(), data.purpose),
    isAllEqual(bip84DerivationClass.getCoinType(), bip84Derivation.getCoinType(), data.coinType),
    isAllEqual(bip84DerivationClass.getAccount(), bip84Derivation.getAccount(), data.account),
    isAllEqual(bip84DerivationClass.getChange(true), bip84Derivation.getChange(true), data.change),
    isAllEqual(bip84DerivationClass.getAddress(), bip84Derivation.getAddress(), data.address),
    isAllEqual(bip84DerivationClass.getPath(), bip84Derivation.getPath(), data.path),
    isAllEqual(bip84DerivationClass.getIndexes(), bip84Derivation.getIndexes(), data.indexes),
    isAllEqual(bip84DerivationClass.getDepth(), bip84Derivation.getDepth(), data.depth), '\n'
  );
}

console.log('Purpose:', data.purpose);
console.log('Coin Type:', data.coinType);
console.log('Account:', data.account);
console.log('Change:', data.change);
console.log('Address:', data.address, '\n');

console.log('Path:', data.path);
console.log('Indexes:', data.indexes);
console.log('Depth:', data.depth);
