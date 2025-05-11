// SPDX-License-Identifier: MIT

import { DERIVATIONS, BIP86Derivation, CHANGES } from '../../src/derivations';

const BIP86Class = DERIVATIONS.getDerivationClass('BIP86');
console.log(
  'Retrieve class:',
  BIP86Class === BIP86Derivation,
  BIP86Class.prototype.getName() === 'BIP86'
);

const deriv = new BIP86Derivation();
console.log(
  'Default:',
  deriv instanceof BIP86Derivation,
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

const rangeArray = new BIP86Derivation({ address: [0, 5] });
console.log(
  'Range array [0,5]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);

const rangeString = new BIP86Derivation({ address: '0-5' });
console.log(
  'Range string "0-5":',
  rangeString.toString(),
  rangeString.getIndexes()
);
