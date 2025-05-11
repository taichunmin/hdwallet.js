// SPDX-License-Identifier: MIT

import { DERIVATIONS, MoneroDerivation } from '../../src/derivations';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'Monero',
  minor: 67,
  major: 77,
  path: "m/67/77",
  indexes: [ 67, 77 ],
  depth: 2,
  derivations: [
    {
      minor: 67, major: 77
    },
    {
      minor: '0-67', major: '77'
    },
    {
      minor: [0, 67], major: '77'
    }
  ],
  default: {
    minor: 1,
    major: 0,
    path: "m/1/0",
    indexes: [ 1, 0 ],
    depth: 2
  }
}

const MoneroDerivationClass: typeof MoneroDerivation = DERIVATIONS.getDerivationClass(data.name);

for (let derivation of data.derivations) {

  const moneroDerivationClass: MoneroDerivation = new MoneroDerivationClass({
    minor: derivation.minor, major: derivation.major
  });
  const moneroDerivation: MoneroDerivation = new MoneroDerivation({
    minor: derivation.minor, major: derivation.major
  });

  console.log(
    isAllEqual(moneroDerivationClass.getMinor(), moneroDerivation.getMinor(), data.minor),
    isAllEqual(moneroDerivationClass.getMajor(), moneroDerivation.getMajor(), data.major),
    isAllEqual(moneroDerivationClass.getPath(), moneroDerivation.getPath(), data.path),
    isAllEqual(moneroDerivationClass.getIndexes(), moneroDerivation.getIndexes(), data.indexes),
    isAllEqual(moneroDerivationClass.getDepth(), moneroDerivation.getDepth(), data.depth),
  );

  moneroDerivationClass.clean();
  moneroDerivation.clean();

  console.log(
    isAllEqual(moneroDerivationClass.getMinor(), moneroDerivation.getMinor(), data.default.minor),
    isAllEqual(moneroDerivationClass.getMajor(), moneroDerivation.getMajor(), data.default.major),
    isAllEqual(moneroDerivationClass.getPath(), moneroDerivation.getPath(), data.default.path),
    isAllEqual(moneroDerivationClass.getIndexes(), moneroDerivation.getIndexes(), data.default.indexes),
    isAllEqual(moneroDerivationClass.getDepth(), moneroDerivation.getDepth(), data.default.depth),
  );

  moneroDerivationClass.fromMinor(derivation.minor);
  moneroDerivation.fromMinor(derivation.minor);
  moneroDerivationClass.fromMajor(derivation.major);
  moneroDerivation.fromMajor(derivation.major);

  console.log(
    isAllEqual(moneroDerivationClass.getMinor(), moneroDerivation.getMinor(), data.minor),
    isAllEqual(moneroDerivationClass.getMajor(), moneroDerivation.getMajor(), data.major),
    isAllEqual(moneroDerivationClass.getPath(), moneroDerivation.getPath(), data.path),
    isAllEqual(moneroDerivationClass.getIndexes(), moneroDerivation.getIndexes(), data.indexes),
    isAllEqual(moneroDerivationClass.getDepth(), moneroDerivation.getDepth(), data.depth), '\n'
  );
}

console.log('Minor:', data.minor);
console.log('Major:', data.major, '\n');

console.log('Path:', data.path);
console.log('Indexes:', data.indexes);
console.log('Depth:', data.depth);
