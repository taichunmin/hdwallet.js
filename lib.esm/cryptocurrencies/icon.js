// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, Params, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static NAME = 'mainnet';
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
    static WIF_PREFIX = 0x80;
}
export class Icon extends Cryptocurrency {
    static NAME = 'Icon';
    static SYMBOL = 'ICX';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/icon-project',
        WHITEPAPER: 'https://icondev.io',
        WEBSITES: [
            'https://www.icon.foundation',
            'https://icon.community'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.Icon;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Icon.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Icon.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Icon.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses({
        ICON: 'Icon'
    });
    static DEFAULT_ADDRESS = Icon.ADDRESSES.ICON;
    static SEMANTICS = ['p2pkh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
    static PARAMS = new Params({
        ADDRESS_PREFIX: 'hx',
        KEY_HASH_LENGTH: 0x14
    });
}
//# sourceMappingURL=icon.js.map