// SPDX-License-Identifier: MIT

import { CardanoHD } from '../../../src/hds';
import { CIP1852Derivation, ROLES } from '../../../src/derivations';
import { Cardano } from '../../../src/cryptocurrencies';

const cardanoHD: CardanoHD = new CardanoHD({
  cardanoType: Cardano.TYPES.SHELLEY_LEDGER
});

const seed = '2f370832206daef44362eeb0327f1c04c4e64ce4535754e2d94656f6698382a243393120e71bdf9d4ae4543723aabe8477b20e473c6517b7971cd15a1e760960';
const xPrivateKey = 'xprv3QESAWYc9vDdZHc7GX4AJ4mMjpZwYbbJyvi8WdtfbQSfSTL3fxPsEQJnRFuyGD15Q1GCndAmQfRM2bRypVoo1SSuyLAQaKhUuRxCStbeHU6wMCQowdVa22eHFeMCPuNDM6GMFy2CDQ99x2HPSupCtFR';
const xPublicKey = 'xpub661MyMwAqRbcEcRzkCoVUx3mnm2P2u5zuv9Y6Aa7n1NiRbCBbDgSVrsY5uZurNsLzTanEA7GQg9PivUexXH5yNncFvAzj5VhtNWjbiKH2zz';
const privateKey = 'f0b149fb020a04704f5694312963213803395cce9fdffcafaec958940d763f5a250710ebb9a78197db2a5e318e928bbfb0264d11b2a96fb6dbfcc984f9cb3f05';
const publicKey = '00f3e17380169d8f7fce1cfacab71db9923c848dd289bbbd4d68c5a19050262643';

cardanoHD.fromSeed(seed);
// cardanoHD.fromXPrivateKey(xPrivateKey, true);
// cardanoHD.fromXPublicKey(xPublicKey, true);

console.log('Seed:', cardanoHD.getSeed());
console.log('Root XPrivate Key:', cardanoHD.getRootXPrivateKey());
console.log('Root XPublic Key:', cardanoHD.getRootXPublicKey());
console.log('Root Private Key:', cardanoHD.getRootPrivateKey());
console.log('Root Chain Code:', cardanoHD.getRootChainCode());
console.log('Root Public Key:', cardanoHD.getRootPublicKey());

const cip1852Derivation: CIP1852Derivation = new CIP1852Derivation({
  coinType: Cardano.COIN_TYPE, account: 0, role: ROLES.STAKING_KEY, address: 0
});

cardanoHD.fromDerivation(cip1852Derivation);

console.log('Staking XPrivate Key:', cardanoHD.getXPrivateKey());
console.log('Staking XPublic Key:', cardanoHD.getXPublicKey());
console.log('Staking Private Key:', cardanoHD.getPrivateKey());
console.log('Staking Chain Code:', cardanoHD.getChainCode());
const stakingPublicKey = cardanoHD.getPublicKey();
console.log('Staking Public Key:', stakingPublicKey);
console.log('Staking Public Key Type:', cardanoHD.getPublicKeyType());
console.log('Staking Compressed:', cardanoHD.getCompressed());
console.log('Staking Uncompressed:', cardanoHD.getUncompressed());
console.log('Staking Hash:', cardanoHD.getHash());
console.log('Staking Fingerprint:', cardanoHD.getFingerprint());
console.log('Staking Parent Fingerprint:', cardanoHD.getParentFingerprint());
console.log('Staking Depth:', cardanoHD.getDepth());
console.log('Staking Path:', cardanoHD.getPath());
console.log('Staking Index:', cardanoHD.getIndex());
console.log('Staking Indexes:', cardanoHD.getIndexes());
console.log('Staking Strict:', cardanoHD.getStrict());
console.log('Staking Address:', cardanoHD.getAddress({
  addressType: Cardano.ADDRESS_TYPES.STAKING
}));

cip1852Derivation.fromRole(ROLES.EXTERNAL_CHANGE);

cardanoHD.updateDerivation(cip1852Derivation);

// cardanoHD.fromPrivateKey(privateKey);
// cardanoHD.fromPublicKey(publicKey);

console.log('XPrivate Key:', cardanoHD.getXPrivateKey());
console.log('XPublic Key:', cardanoHD.getXPublicKey());
console.log('Private Key:', cardanoHD.getPrivateKey());
console.log('Chain Code:', cardanoHD.getChainCode());
console.log('Public Key:', cardanoHD.getPublicKey());
console.log('Public Key Type:', cardanoHD.getPublicKeyType());
console.log('Compressed:', cardanoHD.getCompressed());
console.log('Uncompressed:', cardanoHD.getUncompressed());
console.log('Hash:', cardanoHD.getHash());
console.log('Fingerprint:', cardanoHD.getFingerprint());
console.log('Parent Fingerprint:', cardanoHD.getParentFingerprint());
console.log('Depth:', cardanoHD.getDepth());
console.log('Path:', cardanoHD.getPath());
console.log('Index:', cardanoHD.getIndex());
console.log('Indexes:', cardanoHD.getIndexes());
console.log('getStrict:', cardanoHD.getStrict());
console.log('Address:', cardanoHD.getAddress({
  addressType: Cardano.ADDRESS_TYPES.PAYMENT,
  stakingPublicKey: stakingPublicKey,
  network: 'mainnet'
}));
