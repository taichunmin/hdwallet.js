// SPDX-License-Identifier: MIT

import { Bitcoin, Qtum } from '../../src/cryptocurrencies';
import { DERIVATIONS, BIP86Derivation, CHANGES } from '../../src/derivations';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'BIP86',
  purpose: 86,
  coinType: 2301,
  account: 0,
  change: 'internal-chain',
  address: 0,
  path: "m/86'/2301'/0'/1/0",
  indexes: [ 2147483734, 2147485949, 2147483648, 1, 0 ],
  depth: 5,
  derivations: [
    {
      coinType: Qtum.COIN_TYPE, account: 0, change: CHANGES.INTERNAL_CHANGE, address: 0
    },
    {
      coinType: '2301', account: '0', change: 'internal-chain', address: '0'
    },
    {
      coinType: 2301, account: '0', change: 1, address: '0'
    }
  ],
  default: {
    purpose: 86,
    coinType: Bitcoin.COIN_TYPE,
    account: 0,
    change: 'external-chain',
    address: 0,
    path: "m/86'/0'/0'/0/0",
    indexes: [ 2147483734, 2147483648, 2147483648, 0, 0 ],
    depth: 5
  }
}

const BIP86DerivationClass: typeof BIP86Derivation = DERIVATIONS.getDerivationClass(data.name);

for (let derivation of data.derivations) {

  const bip86DerivationClass: BIP86Derivation = new BIP86DerivationClass({
    coinType: derivation.coinType, account: derivation.account, change: derivation.change, address: derivation.address
  });
  const bip86Derivation: BIP86Derivation = new BIP86Derivation({
    coinType: derivation.coinType, account: derivation.account, change: derivation.change, address: derivation.address
  });

  console.log(
    isAllEqual(bip86DerivationClass.getPurpose(), bip86Derivation.getPurpose(), data.purpose),
    isAllEqual(bip86DerivationClass.getCoinType(), bip86Derivation.getCoinType(), data.coinType),
    isAllEqual(bip86DerivationClass.getAccount(), bip86Derivation.getAccount(), data.account),
    isAllEqual(bip86DerivationClass.getChange(true), bip86Derivation.getChange(true), data.change),
    isAllEqual(bip86DerivationClass.getAddress(), bip86Derivation.getAddress(), data.address),
    isAllEqual(bip86DerivationClass.getPath(), bip86Derivation.getPath(), data.path),
    isAllEqual(bip86DerivationClass.getIndexes(), bip86Derivation.getIndexes(), data.indexes),
    isAllEqual(bip86DerivationClass.getDepth(), bip86Derivation.getDepth(), data.depth),
  );

  bip86DerivationClass.clean();
  bip86Derivation.clean();

  console.log(
    isAllEqual(bip86DerivationClass.getPurpose(), bip86Derivation.getPurpose(), data.default.purpose),
    isAllEqual(bip86DerivationClass.getCoinType(), bip86Derivation.getCoinType(), data.default.coinType),
    isAllEqual(bip86DerivationClass.getAccount(), bip86Derivation.getAccount(), data.default.account),
    isAllEqual(bip86DerivationClass.getChange(true), bip86Derivation.getChange(true), data.default.change),
    isAllEqual(bip86DerivationClass.getAddress(), bip86Derivation.getAddress(), data.default.address),
    isAllEqual(bip86DerivationClass.getPath(), bip86Derivation.getPath(), data.default.path),
    isAllEqual(bip86DerivationClass.getIndexes(), bip86Derivation.getIndexes(), data.default.indexes),
    isAllEqual(bip86DerivationClass.getDepth(), bip86Derivation.getDepth(), data.default.depth),
  );

  bip86DerivationClass.fromCoinType(derivation.coinType);
  bip86Derivation.fromCoinType(derivation.coinType);
  bip86DerivationClass.fromAccount(derivation.account);
  bip86Derivation.fromAccount(derivation.account);
  bip86DerivationClass.fromChange(derivation.change);
  bip86Derivation.fromChange(derivation.change);
  bip86DerivationClass.fromAddress(derivation.address);
  bip86Derivation.fromAddress(derivation.address);

  console.log(
    isAllEqual(bip86DerivationClass.getPurpose(), bip86Derivation.getPurpose(), data.purpose),
    isAllEqual(bip86DerivationClass.getCoinType(), bip86Derivation.getCoinType(), data.coinType),
    isAllEqual(bip86DerivationClass.getAccount(), bip86Derivation.getAccount(), data.account),
    isAllEqual(bip86DerivationClass.getChange(true), bip86Derivation.getChange(true), data.change),
    isAllEqual(bip86DerivationClass.getAddress(), bip86Derivation.getAddress(), data.address),
    isAllEqual(bip86DerivationClass.getPath(), bip86Derivation.getPath(), data.path),
    isAllEqual(bip86DerivationClass.getIndexes(), bip86Derivation.getIndexes(), data.indexes),
    isAllEqual(bip86DerivationClass.getDepth(), bip86Derivation.getDepth(), data.depth), '\n'
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
