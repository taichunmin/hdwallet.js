// SPDX-License-Identifier: MIT
import { CoinTypes } from '../slip44';
import { SLIP10Nist256p1ECC } from '../eccs';
import { Info, Entropies, Mnemonics, Seeds, HDs, Addresses, Networks, Params, XPrivateKeyVersions, XPublicKeyVersions } from '../consts';
import { Cryptocurrency, Network } from './cryptocurrency';
export class Mainnet extends Network {
    static XPRIVATE_KEY_VERSIONS = new XPrivateKeyVersions({
        P2PKH: 0x0488ade4
    });
    static XPUBLIC_KEY_VERSIONS = new XPublicKeyVersions({
        P2PKH: 0x0488b21e
    });
}
export class Ontology extends Cryptocurrency {
    static NAME = 'Ontology';
    static SYMBOL = 'ONT';
    static INFO = new Info({
        SOURCE_CODE: 'https://github.com/ontio/ontology',
        WHITEPAPER: 'https://docs.ont.io',
        WEBSITES: [
            'https://ont.io'
        ]
    });
    static ECC = SLIP10Nist256p1ECC;
    static COIN_TYPE = CoinTypes.Ontology;
    static SUPPORT_BIP38 = false;
    static NETWORKS = new Networks({
        MAINNET: Mainnet
    });
    static DEFAULT_NETWORK = Ontology.NETWORKS.MAINNET;
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
    static DEFAULT_HD = Ontology.HDS.BIP44;
    static DEFAULT_PATH = `m/44'/${Ontology.COIN_TYPE}'/0'/0/0`;
    static ADDRESSES = new Addresses({
        NEO: 'Neo'
    });
    static DEFAULT_ADDRESS = Ontology.ADDRESSES.NEO;
    static DEFAULT_SEMANTIC = 'p2pkh';
    static PARAMS = new Params({
        ADDRESS_VERSION: 0x17
    });
}
//# sourceMappingURL=ontology.js.map