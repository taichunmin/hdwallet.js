// SPDX-License-Identifier: MIT

import { DERIVATIONS, CustomDerivation } from '../../src/derivations';

const CustomClass = DERIVATIONS.getDerivationClass('Custom');
console.log(
  'Retrieve class:',
  CustomClass === CustomDerivation,
  CustomClass.prototype.getName() === 'Custom'
);

const deriv = new CustomDerivation();
console.log(
  'Default:',
  deriv instanceof CustomDerivation,
  deriv.getName(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromIndexes([1, 3]);
console.log(
  'fromIndexes:',
  deriv.toString(),
  deriv.getIndexes()
);

const deriv2 = new CustomDerivation().fromPath('m/2-4');
console.log(
  'fromPath:',
  deriv2.toString(),
  deriv2.getIndexes()
);

const deriv3 = new CustomDerivation().fromIndex(5, true);
console.log(
  'fromIndex hardened:',
  deriv3.toString(),
  deriv3.getIndexes()
);

console.log(
  'Depth:',
  deriv3.getDepth()
);

deriv3.clean();
console.log(
  'Cleaned:',
  deriv3.toString(),
  deriv3.getIndexes()
);

const rangeArray = new CustomDerivation().fromIndexes([0, 5]);
const rangeString = new CustomDerivation().fromPath('m/0-5');
console.log(
  'Range array [0,5]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);
console.log(
  'Range string "0-5":',
  rangeString.toString(),
  rangeString.getIndexes()
);

