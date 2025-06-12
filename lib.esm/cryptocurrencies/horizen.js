// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x00002089;
    static SCRIPT_ADDRESS_PREFIX = 0x00002096;
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e
    });
    static MESSAGE_PREFIX = '\x18Zcash Signed Message:\n';
    static WIF_PREFIX = 0x80;
}
export class Horizen extends Cryptocurrency {
    static NAME = 'Horizen';
    static SYMBOL = 'ZEN';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/HorizenOfficial/zen',
        WHITEPAPER: 'https://www.horizen.io/research',
        WEBSITES: [
            'https://www.horizen.io',
            'https://academy.horizen.io'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.Horizen;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Horizen.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Horizen.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Horizen.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Horizen.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=horizen.js.map