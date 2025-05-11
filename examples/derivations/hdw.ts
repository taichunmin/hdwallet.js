// SPDX-License-Identifier: MIT

import { DERIVATIONS, HDWDerivation, ECCS } from '../../src/derivations';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'HDW',
  account: 0,
  ecc: ECCS.KHOLAW_ED25519,
  address: 123,
  path: "m/0'/3/123",
  indexes: [ 2147483648, 3, 123 ],
  depth: 3,
  derivations: [
    {
      account: 0, ecc: ECCS.KHOLAW_ED25519, address: 123
    },
    {
      account: '0', ecc: '3', address: '123'
    },
    {
      account: '0', ecc: 3, address: '78-123'
    }
  ],
  default: {
    account: 0,
    ecc: ECCS.SLIP10_SECP256K1,
    address: 0,
    path: "m/0'/0/0",
    indexes: [ 2147483648, 0, 0 ],
    depth: 3
  }
}

const HDWDerivationClass: typeof HDWDerivation = DERIVATIONS.getDerivationClass(data.name);

for (let derivation of data.derivations) {

  const hdwDerivationClass: HDWDerivation = new HDWDerivationClass({
    account: derivation.account, ecc: derivation.ecc, address: derivation.address
  });
  const hdwDerivation: HDWDerivation = new HDWDerivation({
    account: derivation.account, ecc: derivation.ecc, address: derivation.address
  });

  console.log(
    isAllEqual(hdwDerivationClass.getAccount(), hdwDerivation.getAccount(), data.account),
    isAllEqual(hdwDerivationClass.getECC(true), hdwDerivation.getECC(true), data.ecc),
    isAllEqual(hdwDerivationClass.getAddress(), hdwDerivation.getAddress(), data.address),
    isAllEqual(hdwDerivationClass.getPath(), hdwDerivation.getPath(), data.path),
    isAllEqual(hdwDerivationClass.getIndexes(), hdwDerivation.getIndexes(), data.indexes),
    isAllEqual(hdwDerivationClass.getDepth(), hdwDerivation.getDepth(), data.depth),
  );

  hdwDerivationClass.clean();
  hdwDerivation.clean();

  console.log(
    isAllEqual(hdwDerivationClass.getAccount(), hdwDerivation.getAccount(), data.default.account),
    isAllEqual(hdwDerivationClass.getECC(true), hdwDerivation.getECC(true), data.default.ecc),
    isAllEqual(hdwDerivationClass.getAddress(), hdwDerivation.getAddress(), data.default.address),
    isAllEqual(hdwDerivationClass.getPath(), hdwDerivation.getPath(), data.default.path),
    isAllEqual(hdwDerivationClass.getIndexes(), hdwDerivation.getIndexes(), data.default.indexes),
    isAllEqual(hdwDerivationClass.getDepth(), hdwDerivation.getDepth(), data.default.depth),
  );

  hdwDerivationClass.fromAccount(derivation.account);
  hdwDerivation.fromAccount(derivation.account);
  hdwDerivationClass.fromECC(derivation.ecc);
  hdwDerivation.fromECC(derivation.ecc);
  hdwDerivationClass.fromAddress(derivation.address);
  hdwDerivation.fromAddress(derivation.address);

  console.log(
    isAllEqual(hdwDerivationClass.getAccount(), hdwDerivation.getAccount(), data.account),
    isAllEqual(hdwDerivationClass.getECC(true), hdwDerivation.getECC(true), data.ecc),
    isAllEqual(hdwDerivationClass.getAddress(), hdwDerivation.getAddress(), data.address),
    isAllEqual(hdwDerivationClass.getPath(), hdwDerivation.getPath(), data.path),
    isAllEqual(hdwDerivationClass.getIndexes(), hdwDerivation.getIndexes(), data.indexes),
    isAllEqual(hdwDerivationClass.getDepth(), hdwDerivation.getDepth(), data.depth), '\n'
  );
}

console.log('Account:', data.account);
console.log('ECC:', data.ecc);
console.log('Address:', data.address, '\n');

console.log('Path:', data.path);
console.log('Indexes:', data.indexes);
console.log('Depth:', data.depth);
