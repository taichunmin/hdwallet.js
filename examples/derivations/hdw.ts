// SPDX-License-Identifier: MIT

import { ECCS } from '../../src/derivations/hdw';
import { DERIVATIONS, HDWDerivation } from '../../src/derivations';

const HDWClass = DERIVATIONS.getDerivationClass('HDW') as typeof HDWDerivation;
console.log(
  'Retrieve class:',
  HDWClass === HDWDerivation,
  HDWClass.prototype.getName() === 'HDW'
);

const deriv = new HDWDerivation();
console.log(
  'Default:',
  deriv instanceof HDWDerivation,
  deriv.getName(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromAccount(1);
console.log(
  'fromAccount:',
  deriv.getAccount(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromEcc(ECCS.SLIP10Ed25519);
console.log(
  'fromEcc:',
  deriv.getEcc(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromAddress(5);
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

const rangeArray = new HDWDerivation({ address: [2, 4] });
console.log(
  'Range address [2,4]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);

const rangeString = new HDWDerivation({ address: '2-4' });
console.log(
  'Range address \'2-4\':',
  rangeString.toString(),
  rangeString.getIndexes()
);
