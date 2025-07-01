// SPDX-License-Identifier: MIT
import { EthereumAddress } from './ethereum';
import { XinFin } from '../cryptocurrencies';
export class XinFinAddress extends EthereumAddress {
    static addressPrefix = XinFin.PARAMS.ADDRESS_PREFIX;
    static getName() {
        return 'XinFin';
    }
}
//# sourceMappingURL=xinfin.js.map