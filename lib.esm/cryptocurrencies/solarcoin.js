// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Secp256k1ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static PUBLIC_KEY_ADDRESS_PREFIX = 0x12;
    static SCRIPT_ADDRESS_PREFIX = 0x05;
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4,
        P2SH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e,
        P2SH: 0x0488b21e
    });
    static MESSAGE_PREFIX = '\x18SolarCoin Signed Message:\n';
    static WIF_PREFIX = 0x92;
}
export class Solarcoin extends Cryptocurrency {
    static NAME = 'Solarcoin';
    static SYMBOL = 'SLR';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/onsightit/solarcoin',
        WHITEPAPER: 'https://solarcoin.org/sites/default/files/slr-basic-page/2018-02/SolarCoin_Policy_Paper_FINAL.pdf',
        WEBSITES: [
            'http://solarcoin.org'
        ]
    });
    static ECC = SLIP10Secp256k1ECC;
    static COIN_TYPE = CoinTypes.Solarcoin;
    static SUPPORT_BIP38 = true;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Solarcoin.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Solarcoin.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Solarcoin.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses([
        'P2PKH',
        'P2SH'
    ]);
    static DEFAULT_ADDRESS = Solarcoin.ADDRESSES.P2PKH;
    static DEFAULT_SEMANTIC = 'p2pkh';
}
//# sourceMappingURL=solarcoin.js.map