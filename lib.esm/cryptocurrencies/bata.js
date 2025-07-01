// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x19;
    static SCRIPT_ADDRESS_PREFIX = 0x05;
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0xa40b91bd,
        P2SH: 0xa40b91bd
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0xa40c86fa,
        P2SH: 0xa40c86fa
    });
    static MESSAGE_PREFIX = '\x18Bata Signed Message:\n';
    static WIF_PREFIX = 0xa4;
}
export class Bata extends Cryptocurrency {
    static NAME = 'Bata';
    static SYMBOL = 'BTA';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/BTA-BATA/Bataoshi',
        WHITEPAPER: 'https://bata.io/wp-content/uploads/2021/09/Bata-Cryptocurrency-Whitepaper.pdf',
        WEBSITES: [
            'https://bata.io',
            'https://bata.digital'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.Bata;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Bata.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Bata.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Bata.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Bata.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=bata.js.map