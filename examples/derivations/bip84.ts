// SPDX-License-Identifier: MIT

import { DERIVATIONS, BIP84Derivation, CHANGES } from '../../src/derivations';

const BIP84Class = DERIVATIONS.getDerivationClass('BIP84');
console.log(
  'Retrieve class:',
  BIP84Class === BIP84Derivation,
  BIP84Class.prototype.getName() === 'BIP84'
);

const deriv = new BIP84Derivation();
console.log(
  'Default:',
  deriv instanceof BIP84Derivation,
  deriv.getName(),
  deriv.toString(),
  deriv.getIndexes()
);

deriv.fromCoinType(60);
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

deriv.fromChange(CHANGES.InternalChain);
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
  'Purpose & Depth:',
  deriv.getPurpose(),
  deriv.getDepth()
);

deriv.clean();
console.log(
  'Cleaned:',
  deriv.toString(),
  deriv.getIndexes()
);

const rangeArray = new BIP84Derivation({ address: [0, 5] });
console.log(
  'Range array [0,5]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);

const rangeString = new BIP84Derivation({ address: '0-5' });
console.log(
  'Range string "0-5":',
  rangeString.toString(),
  rangeString.getIndexes()
);
