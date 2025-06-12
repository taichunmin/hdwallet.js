// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Ed25519ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
}
export class Near extends Cryptocurrency {
    static NAME = 'Near';
    static SYMBOL = 'NEAR';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/near/nearcore',
        WHITEPAPER: 'https://near.org/papers/the-official-near-white-paper',
        WEBSITES: [
            'https://near.org'
        ]
    });
    static ECC = SLIP10Ed25519ECC;
    static COIN_TYPE = CoinTypes.Near;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Near.NETWORKS.MAINNET;
    static ENTROPIES = new Entropies([
        'BIP39'
    ]);
    static MNEMONICS = new Mnemonics([
        'BIP39'
    ]);
    static SEEDS = new Seeds([
        'BIP39'
    ]);
    static HDS = new HDs([
        'BIP32',
        'BIP44'
    ]);
    static DEFAULT_HD = Near.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Near.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses({
        NEAR: 'Near'
    });
    static DEFAULT_ADDRESS = Near.ADDRESSES.NEAR;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=near.js.map