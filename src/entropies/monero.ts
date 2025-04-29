import { IEntropy } from "./ientropy";

export const MONERO_ENTROPY_STRENGTHS = {
  ONE_HUNDRED_TWENTY_EIGHT: 128,
  TWO_HUNDRED_FIFTY_SIX: 256
} as const;

export class MoneroEntropy extends IEntropy {

  static strengths = [
    MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT,
    MONERO_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
  ];

  static client(): string {
    return "Monero";
  }
}