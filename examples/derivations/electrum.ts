// SPDX-License-Identifier: MIT

import { DERIVATIONS, ElectrumDerivation, CHANGES } from '../../src/derivations';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'Electrum',
  change: 10,
  address: 234234,
  path: "m/10/234234",
  indexes: [ 10, 234234 ],
  depth: 2,
  derivations: [
    {
      change: 10, address: 234234
    },
    {
      change: '0-10', address: '234234'
    },
    {
      change: [0, 10], address: '234234'
    }
  ],
  default: {
    change: 0,
    address: 0,
    path: "m/0/0",
    indexes: [ 0, 0 ],
    depth: 2
  }
}

const ElectrumDerivationClass: typeof ElectrumDerivation = DERIVATIONS.getDerivationClass(data.name);

for (let derivation of data.derivations) {

  const electrumDerivationClass: ElectrumDerivation = new ElectrumDerivationClass({
    change: derivation.change, address: derivation.address
  });
  const electrumDerivation: ElectrumDerivation = new ElectrumDerivation({
    change: derivation.change, address: derivation.address
  });

  console.log(
    isAllEqual(electrumDerivationClass.getChange(), electrumDerivation.getChange(), data.change),
    isAllEqual(electrumDerivationClass.getAddress(), electrumDerivation.getAddress(), data.address),
    isAllEqual(electrumDerivationClass.getPath(), electrumDerivation.getPath(), data.path),
    isAllEqual(electrumDerivationClass.getIndexes(), electrumDerivation.getIndexes(), data.indexes),
    isAllEqual(electrumDerivationClass.getDepth(), electrumDerivation.getDepth(), data.depth),
  );

  electrumDerivationClass.clean();
  electrumDerivation.clean();

  console.log(
    isAllEqual(electrumDerivationClass.getChange(), electrumDerivation.getChange(), data.default.change),
    isAllEqual(electrumDerivationClass.getAddress(), electrumDerivation.getAddress(), data.default.address),
    isAllEqual(electrumDerivationClass.getPath(), electrumDerivation.getPath(), data.default.path),
    isAllEqual(electrumDerivationClass.getIndexes(), electrumDerivation.getIndexes(), data.default.indexes),
    isAllEqual(electrumDerivationClass.getDepth(), electrumDerivation.getDepth(), data.default.depth),
  );

  electrumDerivationClass.fromChange(derivation.change);
  electrumDerivation.fromChange(derivation.change);
  electrumDerivationClass.fromAddress(derivation.address);
  electrumDerivation.fromAddress(derivation.address);

  console.log(
    isAllEqual(electrumDerivationClass.getChange(), electrumDerivation.getChange(), data.change),
    isAllEqual(electrumDerivationClass.getAddress(), electrumDerivation.getAddress(), data.address),
    isAllEqual(electrumDerivationClass.getPath(), electrumDerivation.getPath(), data.path),
    isAllEqual(electrumDerivationClass.getIndexes(), electrumDerivation.getIndexes(), data.indexes),
    isAllEqual(electrumDerivationClass.getDepth(), electrumDerivation.getDepth(), data.depth), '\n'
  );
}

console.log('Change:', data.change);
console.log('Address:', data.address, '\n');

console.log('Path:', data.path);
console.log('Indexes:', data.indexes);
console.log('Depth:', data.depth);
