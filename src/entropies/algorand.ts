import { IEntropy } from "./ientropy";

export const ALGORAND_ENTROPY_STRENGTHS = {
  TWO_HUNDRED_FIFTY_SIX: 256
} as const;

export class AlgorandEntropy extends IEntropy {

  static strengths = [
      ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  ];

  static client(): string {
    return "Algorand";
  }
}