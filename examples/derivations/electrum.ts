// SPDX-License-Identifier: MIT

import { DERIVATIONS, ElectrumDerivation } from '../../src/derivations';

const ElectrumClass = DERIVATIONS.getDerivationClass('Electrum');
console.log(
  'Retrieve class:',
  ElectrumClass === ElectrumDerivation,
  ElectrumClass.prototype.getName() === 'Electrum'
);

const deriv = new ElectrumDerivation();
console.log(
  'Default:',
  deriv instanceof ElectrumDerivation,
  deriv.getName(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromChange(1);
console.log(
  'fromChange:',
  deriv.getChange(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromAddress(10);
console.log(
  'fromAddress:',
  deriv.getAddress(),
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

const rangeArray = new ElectrumDerivation({ address: [0, 5] });
console.log(
  'Range array [0,5]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);

const rangeString = new ElectrumDerivation({ address: '0-5' });
console.log(
  'Range string \'0-5\':',
  rangeString.toString(),
  rangeString.getIndexes()
);