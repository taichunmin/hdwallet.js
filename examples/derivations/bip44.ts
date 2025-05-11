// SPDX-License-Identifier: MIT

import { Bitcoin, Ethereum } from '../../src/cryptocurrencies';
import { DERIVATIONS, BIP44Derivation, CHANGES } from '../../src/derivations';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'BIP44',
  purpose: 44,
  coinType: Ethereum.COIN_TYPE,
  account: 0,
  change: 'external-chain',
  address: 0,
  path: "m/44'/60'/0'/0/0",
  indexes: [ 2147483692, 2147483708, 2147483648, 0, 0 ],
  depth: 5,
  derivations: [
    {
      coinType: Ethereum.COIN_TYPE, account: 0, change: CHANGES.EXTERNAL_CHANGE, address: 0
    },
    {
      coinType: '60', account: '0', change: 'external-chain', address: '0'
    },
    {
      coinType: 60, account: '0', change: 0, address: '0'
    }
  ],
  default: {
    purpose: 44,
    coinType: Bitcoin.COIN_TYPE,
    account: 0,
    change: 'external-chain',
    address: 0,
    path: "m/44'/0'/0'/0/0",
    indexes: [ 2147483692, 2147483648, 2147483648, 0, 0 ],
    depth: 5
  }
}

const BIP44DerivationClass: typeof BIP44Derivation = DERIVATIONS.getDerivationClass(data.name);

for (let derivation of data.derivations) {

  const bip44DerivationClass: BIP44Derivation = new BIP44DerivationClass({
    coinType: derivation.coinType, account: derivation.account, change: derivation.change, address: derivation.address
  });
  const bip44Derivation: BIP44Derivation = new BIP44Derivation({
    coinType: derivation.coinType, account: derivation.account, change: derivation.change, address: derivation.address
  });

  console.log(
    isAllEqual(bip44DerivationClass.getPurpose(), bip44Derivation.getPurpose(), data.purpose),
    isAllEqual(bip44DerivationClass.getCoinType(), bip44Derivation.getCoinType(), data.coinType),
    isAllEqual(bip44DerivationClass.getAccount(), bip44Derivation.getAccount(), data.account),
    isAllEqual(bip44DerivationClass.getChange(true), bip44Derivation.getChange(true), data.change),
    isAllEqual(bip44DerivationClass.getAddress(), bip44Derivation.getAddress(), data.address),
    isAllEqual(bip44DerivationClass.getPath(), bip44Derivation.getPath(), data.path),
    isAllEqual(bip44DerivationClass.getIndexes(), bip44Derivation.getIndexes(), data.indexes),
    isAllEqual(bip44DerivationClass.getDepth(), bip44Derivation.getDepth(), data.depth),
  );

  bip44DerivationClass.clean();
  bip44Derivation.clean();

  console.log(
    isAllEqual(bip44DerivationClass.getPurpose(), bip44Derivation.getPurpose(), data.default.purpose),
    isAllEqual(bip44DerivationClass.getCoinType(), bip44Derivation.getCoinType(), data.default.coinType),
    isAllEqual(bip44DerivationClass.getAccount(), bip44Derivation.getAccount(), data.default.account),
    isAllEqual(bip44DerivationClass.getChange(true), bip44Derivation.getChange(true), data.default.change),
    isAllEqual(bip44DerivationClass.getAddress(), bip44Derivation.getAddress(), data.default.address),
    isAllEqual(bip44DerivationClass.getPath(), bip44Derivation.getPath(), data.default.path),
    isAllEqual(bip44DerivationClass.getIndexes(), bip44Derivation.getIndexes(), data.default.indexes),
    isAllEqual(bip44DerivationClass.getDepth(), bip44Derivation.getDepth(), data.default.depth),
  );

  bip44DerivationClass.fromCoinType(derivation.coinType);
  bip44Derivation.fromCoinType(derivation.coinType);
  bip44DerivationClass.fromAccount(derivation.account);
  bip44Derivation.fromAccount(derivation.account);
  bip44DerivationClass.fromChange(derivation.change);
  bip44Derivation.fromChange(derivation.change);
  bip44DerivationClass.fromAddress(derivation.address);
  bip44Derivation.fromAddress(derivation.address);

  console.log(
    isAllEqual(bip44DerivationClass.getPurpose(), bip44Derivation.getPurpose(), data.purpose),
    isAllEqual(bip44DerivationClass.getCoinType(), bip44Derivation.getCoinType(), data.coinType),
    isAllEqual(bip44DerivationClass.getAccount(), bip44Derivation.getAccount(), data.account),
    isAllEqual(bip44DerivationClass.getChange(true), bip44Derivation.getChange(true), data.change),
    isAllEqual(bip44DerivationClass.getAddress(), bip44Derivation.getAddress(), data.address),
    isAllEqual(bip44DerivationClass.getPath(), bip44Derivation.getPath(), data.path),
    isAllEqual(bip44DerivationClass.getIndexes(), bip44Derivation.getIndexes(), data.indexes),
    isAllEqual(bip44DerivationClass.getDepth(), bip44Derivation.getDepth(), data.depth), '\n'
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
