// SPDX-License-Identifier: MIT

import { Entropy } from './entropy';

export const ALGORAND_ENTROPY_STRENGTHS = {
  TWO_HUNDRED_FIFTY_SIX: 256
} as const;

export class AlgorandEntropy extends Entropy {

  static strengths = [
      ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  ];

  static getName(): string {
    return 'Algorand';
  }
}
