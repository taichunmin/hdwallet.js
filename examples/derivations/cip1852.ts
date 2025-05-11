// SPDX-License-Identifier: MIT

import { DERIVATIONS, CIP1852Derivation, ROLES } from '../../src/derivations';

const CIP1852Class = DERIVATIONS.getDerivationClass('CIP1852');
console.log(
  'Retrieve class:',
  CIP1852Class === CIP1852Derivation,
  CIP1852Class.prototype.getName() === 'CIP1852'
);

const deriv = new CIP1852Derivation();
console.log(
  'Default:',
  deriv instanceof CIP1852Derivation,
  deriv.getName(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromCoinType(1815);
console.log(
  'fromCoinType:',
  deriv.getCoinType(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromAccount(2);
console.log(
  'fromAccount:',
  deriv.getAccount(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromRole(ROLES.StakingKey);
console.log(
  'fromRole:',
  deriv.getRole(),
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
  'Purpose, CoinType & Depth:',
  deriv.getPurpose(),
  deriv.getCoinType(),
  deriv.getDepth()
);

deriv.clean();
console.log(
  'Cleaned:',
  deriv.toString(),
  deriv.getIndexes()
);

const rangeArray = new CIP1852Derivation({ address: [0, 5] });
console.log(
  'Range array [0,5]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);

const rangeString = new CIP1852Derivation({ address: '0-5' });
console.log(
  'Range string \'0-5\':',
  rangeString.toString(),
  rangeString.getIndexes()
);
