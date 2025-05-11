// SPDX-License-Identifier: MIT

import { DERIVATIONS, MoneroDerivation } from '../../src/derivations';

const MoneroClass = DERIVATIONS.getDerivationClass('Monero');
console.log(
  'Retrieve class:',
  MoneroClass === MoneroDerivation,
  MoneroClass.prototype.getName() === 'Monero'
);

const deriv = new MoneroDerivation();
console.log(
  'Default:',
  deriv instanceof MoneroDerivation,
  deriv.getName(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromMinor(2);
console.log(
  'fromMinor:',
  deriv.getMinor(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromMajor(3);
console.log(
  'fromMajor:',
  deriv.getMajor(),
  deriv.toString(),
  deriv.getIndexes()
);

console.log(
  'Depth:',
  deriv.getDepth()
);

deriv.clean();
console.log(
  'Cleaned:',
  deriv.toString(),
  deriv.getIndexes()
);

const rangeArray = new MoneroDerivation({ minor: [0, 5] });
console.log(
  'Range minor [0,5]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);

const rangeString = new MoneroDerivation({ minor: '0-5' });
console.log(
  'Range minor \'0-5\':',
  rangeString.toString(),
  rangeString.getIndexes()
);