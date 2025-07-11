"use strict";
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinTypes = void 0;
/**
 * SLIP-0044 coin type registry
 * https://github.com/satoshilabs/slips/blob/master/slip-0044.md
 */
exports.CoinTypes = {
    Adcoin: 161,
    AkashNetwork: 118,
    Algorand: 283,
    Anon: 220,
    Aptos: 637,
    Arbitrum: 60,
    Argoneum: 421,
    Artax: 219,
    Aryacoin: 357,
    Asiacoin: 51,
    Auroracoin: 85,
    Avalanche: 9000,
    Avian: 921,
    Axe: 4242,
    Axelar: 118,
    BandProtocol: 494,
    Bata: 89,
    BeetleCoin: 800,
    BelaCoin: 73,
    Binance: 714,
    BitCloud: 218,
    Bitcoin: 0,
    BitcoinAtom: 185,
    BitcoinCash: 145,
    BitcoinCashSLP: 145,
    BitcoinGold: 156,
    BitcoinGreen: 222,
    BitcoinPlus: 65,
    BitcoinPrivate: 183,
    BitcoinSV: 236,
    BitcoinZ: 177,
    Bitcore: 160,
    BitSend: 91,
    Blackcoin: 10,
    Blocknode: 2941,
    BlockStamp: 254,
    Bolivarcoin: 278,
    BritCoin: 70,
    CanadaECoin: 34,
    Cannacoin: 19,
    Cardano: 1815,
    Celo: 52752,
    Chihuahua: 118,
    Clams: 23,
    ClubCoin: 79,
    Compcoin: 71,
    Cosmos: 118,
    CPUChain: 363,
    CranePay: 2304,
    Crave: 186,
    Dash: 5,
    DeepOnion: 305,
    Defcoin: 1337,
    Denarius: 116,
    Diamond: 152,
    DigiByte: 20,
    Digitalcoin: 18,
    Divi: 301,
    Dogecoin: 3,
    dYdX: 22000118,
    eCash: 145,
    ECoin: 115,
    EDRCoin: 56,
    eGulden: 78,
    Einsteinium: 41,
    Elastos: 2305,
    Energi: 9797,
    EOS: 194,
    Ergo: 429,
    Ethereum: 60,
    EuropeCoin: 151,
    Evrmore: 175,
    ExclusiveCoin: 190,
    Fantom: 60,
    Feathercoin: 8,
    FetchAI: 118,
    Filecoin: 461,
    Firo: 136,
    Firstcoin: 167,
    FIX: 336,
    Flashcoin: 120,
    Flux: 19167,
    Foxdcoin: 175,
    FujiCoin: 75,
    GameCredits: 101,
    GCRCoin: 49,
    GoByte: 176,
    Gridcoin: 84,
    GroestlCoin: 17,
    Gulden: 87,
    Harmony: 1023,
    Helleniccoin: 168,
    Hempcoin: 113,
    Horizen: 121,
    HuobiToken: 553,
    Hush: 197,
    Icon: 74,
    Injective: 60,
    InsaneCoin: 68,
    InternetOfPeople: 66,
    IRISnet: 566,
    IXCoin: 86,
    Jumbucks: 26,
    Kava: 459,
    Kobocoin: 196,
    Komodo: 141,
    Landcoin: 63,
    LBRYCredits: 140,
    Linx: 114,
    Litecoin: 2,
    LitecoinCash: 192,
    LitecoinZ: 221,
    Lkrcoin: 557,
    Lynx: 191,
    Mazacoin: 13,
    Megacoin: 217,
    Metis: 60,
    Minexcoin: 182,
    Monacoin: 22,
    Monero: 128,
    Monk: 214,
    MultiversX: 508,
    Myriadcoin: 90,
    Namecoin: 7,
    Nano: 165,
    Navcoin: 130,
    Near: 397,
    Neblio: 146,
    Neo: 888,
    Neoscoin: 25,
    Neurocoin: 110,
    NewYorkCoin: 179,
    NineChronicles: 567,
    NIX: 400,
    Novacoin: 50,
    NuBits: 12,
    NuShares: 11,
    OKCash: 69,
    OKTChain: 996,
    Omni: 200,
    Onix: 174,
    Ontology: 1024,
    Optimism: 60,
    Osmosis: 10000118,
    Particl: 44,
    Peercoin: 6,
    Pesobit: 62,
    Phore: 444,
    PiNetwork: 314159,
    Pinkcoin: 117,
    Pivx: 119,
    Polygon: 60,
    PoSWCoin: 47,
    Potcoin: 81,
    ProjectCoin: 533,
    Putincoin: 122,
    Qtum: 2301,
    Rapids: 320,
    Ravencoin: 175,
    Reddcoin: 4,
    Ripple: 144,
    Ritocoin: 19169,
    RSK: 137,
    Rubycoin: 16,
    Safecoin: 19165,
    Saluscoin: 572,
    Scribe: 545,
    Secret: 529,
    ShadowCash: 35,
    Shentu: 118,
    Slimcoin: 63,
    Smileycoin: 59,
    Solana: 501,
    Solarcoin: 58,
    Stafi: 907,
    Stash: 49344,
    Stellar: 148,
    Stratis: 105,
    Sugarchain: 408,
    Sui: 784,
    Syscoin: 57,
    Terra: 330,
    Tezos: 1729,
    Theta: 500,
    ThoughtAI: 502,
    TOACoin: 159,
    Tron: 195,
    TWINS: 970,
    UltimateSecureCash: 112,
    Unobtanium: 92,
    Vcash: 127,
    VeChain: 818,
    Verge: 77,
    Vertcoin: 28,
    Viacoin: 14,
    Vivo: 166,
    Voxels: 129,
    VPNCoin: 33,
    Wagerr: 0,
    Whitecoin: 559,
    Wincoin: 181,
    XinFin: 550,
    XUEZ: 225,
    Ycash: 347,
    Zcash: 133,
    ZClassic: 147,
    Zetacoin: 719,
    Zilliqa: 313,
    ZooBC: 883,
};
//# sourceMappingURL=slip44.js.map