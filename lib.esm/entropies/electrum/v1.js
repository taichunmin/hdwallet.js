// SPDX-License-Identifier: MIT
import { Entropy } from '../entropy';
export const ELECTRUM_V1_ENTROPY_STRENGTHS = {
    ONE_HUNDRED_TWENTY_EIGHT: 128
};
export class ElectrumV1Entropy extends Entropy {
    static strengths = [
        ELECTRUM_V1_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
    ];
    static getName() {
        return 'Electrum-V1';
    }
}
//# sourceMappingURL=v1.js.map