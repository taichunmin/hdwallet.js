// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x75;
    static SCRIPT_ADDRESS_PREFIX = 0xae;
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0xae3416f6,
        P2SH: 0xae3416f6
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x2780915f,
        P2SH: 0x2780915f
    });
    static MESSAGE_PREFIX = '\x18IoP Signed Message:\n';
    static WIF_PREFIX = 0x31;
}
export class InternetOfPeople extends Cryptocurrency {
    static NAME = 'Internet-Of-People';
    static SYMBOL = 'IOP';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/Internet-of-People',
        WHITEPAPER: 'https://iop.global/whitepaper',
        WEBSITES: [
            'http://iop.global'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.InternetOfPeople;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = InternetOfPeople.NETWORKS.MAINNET;
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
    static DEFAULT_HD = InternetOfPeople.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${InternetOfPeople.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = InternetOfPeople.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=internetofpeople.js.map