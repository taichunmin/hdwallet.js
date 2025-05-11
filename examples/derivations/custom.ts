// SPDX-License-Identifier: MIT

import { DERIVATIONS, CustomDerivation } from '../../src/derivations';
import { isAllEqual } from '../../src/utils';

const data = {
  name: 'Custom',
  path: "m/123'/123'/4'/5/6/7'/8",
  indexes: [ 2147483771, 2147483771, 2147483652, 5, 6, 2147483655, 8 ],
  depth: 7,
  default: {
    path: "m/",
    indexes: [],
    depth: 0
  }
}

const CustomDerivationClass: typeof CustomDerivation = DERIVATIONS.getDerivationClass(data.name);

const customDerivationClass: CustomDerivation = new CustomDerivationClass({
  path: data.path
});
const customDerivation: CustomDerivation = new CustomDerivation({
  indexes: data.indexes
});

console.log(
  isAllEqual(customDerivationClass.getPath(), customDerivation.getPath(), data.path),
  isAllEqual(customDerivationClass.getIndexes(), customDerivation.getIndexes(), data.indexes),
  isAllEqual(customDerivationClass.getDepth(), customDerivation.getDepth(), data.depth),
);

customDerivationClass.clean();
customDerivation.clean();

console.log(
  isAllEqual(customDerivationClass.getPath(), customDerivation.getPath(), data.default.path),
  isAllEqual(customDerivationClass.getIndexes(), customDerivation.getIndexes(), data.default.indexes),
  isAllEqual(customDerivationClass.getDepth(), customDerivation.getDepth(), data.default.depth),
);

customDerivationClass.fromPath(data.path);
customDerivation.fromPath(data.path);

console.log(
  isAllEqual(customDerivationClass.getPath(), customDerivation.getPath(), data.path),
  isAllEqual(customDerivationClass.getIndexes(), customDerivation.getIndexes(), data.indexes),
  isAllEqual(customDerivationClass.getDepth(), customDerivation.getDepth(), data.depth),
);

customDerivationClass.clean();
customDerivation.clean();

customDerivationClass.fromIndexes(data.indexes);
customDerivation.fromIndexes(data.indexes);

console.log(
  isAllEqual(customDerivationClass.getPath(), customDerivation.getPath(), data.path),
  isAllEqual(customDerivationClass.getIndexes(), customDerivation.getIndexes(), data.indexes),
  isAllEqual(customDerivationClass.getDepth(), customDerivation.getDepth(), data.depth),
);

customDerivationClass.clean();
customDerivation.clean();

customDerivationClass.fromIndex(123, true);
customDerivation.fromIndex(123, true);
customDerivationClass.fromIndex(123, true);
customDerivation.fromIndex(123, true);
customDerivationClass.fromIndex(4, true);
customDerivation.fromIndex(4, true);
customDerivationClass.fromIndex(5);
customDerivation.fromIndex(5);
customDerivationClass.fromIndex(6);
customDerivation.fromIndex(6);
customDerivationClass.fromIndex(7, true);
customDerivation.fromIndex(7, true);
customDerivationClass.fromIndex(8);
customDerivation.fromIndex(8);

console.log(
  isAllEqual(customDerivationClass.getPath(), customDerivation.getPath(), data.path),
  isAllEqual(customDerivationClass.getIndexes(), customDerivation.getIndexes(), data.indexes),
  isAllEqual(customDerivationClass.getDepth(), customDerivation.getDepth(), data.depth), '\n'
);

console.log('Path:', data.path);
console.log('Indexes:', data.indexes);
console.log('Depth:', data.depth);
