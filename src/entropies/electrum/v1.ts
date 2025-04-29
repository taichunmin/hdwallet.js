import { IEntropy } from "../ientropy";

export const ELECTRUM_V1_ENTROPY_STRENGTHS = {
  ONE_HUNDRED_TWENTY_EIGHT: 128
} as const;

export class ElectrumV1Entropy extends IEntropy {

  static strengths = [
      ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
  ];

  static client(): string {
    return "Electrum-V1";
  }
}