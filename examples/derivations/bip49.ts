// SPDX-License-Identifier: MIT

import { DERIVATIONS, BIP49Derivation, CHANGES } from '../../src/derivations';

const BIP49Class = DERIVATIONS.getDerivationClass('BIP49');
console.log(
  'Retrieve class:',
  BIP49Class === BIP49Derivation,
  BIP49Class.prototype.getName() === 'BIP49'
);

const deriv = new BIP49Derivation();
console.log(
  'Default:',
  deriv instanceof BIP49Derivation,
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


const rangeArray = new BIP49Derivation({ address: [0, 5] });
console.log(
  'Range array [0,5]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);

const rangeString = new BIP49Derivation({ address: '0-5' });
console.log(
  'Range string "0-5":',
  rangeString.toString(),
  rangeString.getIndexes()
);
