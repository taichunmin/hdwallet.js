// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static NAME = 'mainnet';
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x23;
    static SCRIPT_ADDRESS_PREFIX = 0x1c;
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e
    });
    static MESSAGE_PREFIX = '\x18Kobocoin Signed Message:\n';
    static WIF_PREFIX = 0xa3;
}
export class Kobocoin extends Cryptocurrency {
    static NAME = 'Kobocoin';
    static SYMBOL = 'KOBO';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/kobocoin/Kobocoin',
        WHITEPAPER: 'https://kobocoin.com/Tech.html',
        WEBSITES: [
            'http://kobocoin.com'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.Kobocoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Kobocoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Kobocoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Kobocoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Kobocoin.ADDRESSES.P2PKH;
    static SEMANTICS = ['p2pkh', 'p2sh'];
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=kobocoin.js.map