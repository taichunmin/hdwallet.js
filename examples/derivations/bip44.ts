// SPDX-License-Identifier: MIT

import { DERIVATIONS, BIP44Derivation, CHANGES } from '../../src/derivations';

const BIP44Class = DERIVATIONS.getDerivationClass('BIP44') as typeof BIP44Derivation;
console.log(
  'Retrieve class:',
  BIP44Class === BIP44Derivation,
  BIP44Class.prototype.getName() === 'BIP44'
);

const deriv = new BIP44Derivation();
console.log(
  'Default:',
  deriv instanceof BIP44Derivation,
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

const rangeArray = new BIP44Derivation({ address: [0, 5] });
console.log(
  'Range array [0,5]:',
  rangeArray.toString(),
  rangeArray.getIndexes()
);

const rangeString = new BIP44Derivation({ address: '0-5' });
console.log(
  'Range string "0-5":',
  rangeString.toString(),
  rangeString.getIndexes()
);
