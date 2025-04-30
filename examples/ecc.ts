import {
  // Secp256k1
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey,
  // Nist256p1
  SLIP10Nist256p1ECC,
  SLIP10Nist256p1PublicKey,
  SLIP10Nist256p1PrivateKey,
  // Ed25519
  SLIP10Ed25519ECC,
  SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey,
  // Ed25519-Monero
  SLIP10Ed25519MoneroECC,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey
} from '../src/ecc';
import { ECCS, validateAndGetPublicKey } from '../src/ecc';
import { hexToBytes } from '../src/utils';

/**
 * Demonstration of SLIP10 ECC operations in TypeScript
 */
function runEcExamples(): void {
  console.log('=== ECC Example: SLIP10 Secp256k1 ===');

  // Secp256k1 metadata
  console.log(`Curve Name   : ${SLIP10Secp256k1ECC.NAME}`);
  console.log(`Curve Order  : 0x${SLIP10Secp256k1ECC.ORDER.toString(16)}`);

  // Generator point
  const G1 = SLIP10Secp256k1ECC.GENERATOR;
  console.log('Generator G (Secp256k1):');
  console.log(`  x = 0x${G1.x().toString(16)}`);
  console.log(`  y = 0x${G1.y().toString(16)}`);

  // Secp256k1 key pair example
  const secpPrivHex = 'b66022fff8b6322f8b8fa444d6d097457b6b9e7bb05add5b75f9c827df7bd3b6';
  const secpPriv = SLIP10Secp256k1PrivateKey.fromBytes(hexToBytes(secpPrivHex));
  console.log(`Secp256k1 Private: ${secpPrivHex}`);
  const secpPub = secpPriv.publicKey();
  console.log(`Secp256k1 Public (compressed)  : ${Buffer.from(secpPub.rawCompressed()).toString('hex')}`);
  console.log(`Secp256k1 Public (uncompressed): ${Buffer.from(secpPub.rawUncompressed()).toString('hex')}`);

  console.log('\n=== ECC Example: SLIP10 Nist256p1 ===');

  // Nist256p1 metadata
  console.log(`Curve Name   : ${SLIP10Nist256p1ECC.NAME}`);
  console.log(`Curve Order  : 0x${SLIP10Nist256p1ECC.ORDER.toString(16)}`);

  // Generator point for Nist256p1
  const G2 = SLIP10Nist256p1ECC.GENERATOR;
  console.log('Generator G (Nist256p1):');
  console.log(`  x = 0x${G2.x().toString(16)}`);
  console.log(`  y = 0x${G2.y().toString(16)}`);

  // Nist256p1 example data
  const nistPrivHex = 'f79495fda777197ce73551bcd8e162ceca19167575760d3cc2bced4bf2a213dc';
  const nistPriv = SLIP10Nist256p1PrivateKey.fromBytes(hexToBytes(nistPrivHex));
  console.log(`Nist256p1 Private: ${nistPrivHex}`);
  const nistPub = nistPriv.publicKey();
  console.log(`Nist256p1 Public (compressed)  : ${Buffer.from(nistPub.rawCompressed()).toString('hex')}`);
  console.log(`Nist256p1 Public (uncompressed): ${Buffer.from(nistPub.rawUncompressed()).toString('hex')}`);

  console.log('\n=== ECC Example: SLIP10 Ed25519 ===');

  // Ed25519 metadata
  console.log(`Curve Name   : ${SLIP10Ed25519ECC.NAME}`);
  console.log(`Curve Order  : 0x${SLIP10Ed25519ECC.ORDER.toString(16)}`);

  // Generator point for Ed25519
  const G3 = SLIP10Ed25519ECC.GENERATOR;
  console.log('Generator G (Ed25519):');
  console.log(`  x = 0x${G3.x().toString(16)}`);
  console.log(`  y = 0x${G3.y().toString(16)}`);

  // Ed25519 key pair example
  const edPrivHex = 'bb37794073e5094ebbfcfa070e9254fe6094b56e7cccb094a2304c5eccccdc07';
  const edPriv = SLIP10Ed25519PrivateKey.fromBytes(hexToBytes(edPrivHex));
  console.log(`Ed25519 Private: ${edPrivHex}`);
  const edPub = edPriv.publicKey();
  console.log(`Ed25519 Public (compressed)  : ${Buffer.from(edPub.rawCompressed()).toString('hex')}`);
  console.log(`Ed25519 Public (uncompressed): ${Buffer.from(edPub.rawUncompressed()).toString('hex')}`);

  console.log('\n=== ECC Example: SLIP10 Ed25519-Monero ===');

  // Ed25519-Monero metadata
  console.log(`Curve Name   : ${SLIP10Ed25519MoneroECC.NAME}`);
  console.log(`Curve Order  : 0x${SLIP10Ed25519MoneroECC.ORDER.toString(16)}`);

  // Generator point for Ed25519-Monero
  const G4 = SLIP10Ed25519MoneroECC.GENERATOR;
  console.log('Generator G (Ed25519-Monero):');
  console.log(`  x = 0x${G4.x().toString(16)}`);
  console.log(`  y = 0x${G4.y().toString(16)}`);

  // Ed25519-Monero key pair example
  const edMoneroPrivHex = 'bb37794073e5094ebbfcfa070e9254fe6094b56e7cccb094a2304c5eccccdc07';
  const edMoneroPriv = SLIP10Ed25519MoneroPrivateKey.fromBytes(hexToBytes(edMoneroPrivHex));
  console.log(`Ed25519-Monero Private: ${edMoneroPrivHex}`);
  const edMoneroPub = edMoneroPriv.publicKey();
  console.log(`Ed25519-Monero Public: ${Buffer.from(edMoneroPub.rawCompressed()).toString('hex')}`);

  // Point coordinates from decode
  const P4 = edMoneroPub.point();
  console.log('Ed25519-Monero Point:');
  console.log(`  x = ${P4.x().toString()}`);
  console.log(`  y = ${P4.y().toString()}`);

  // Validation and lookup for Monero
  const ecc4 = ECCS.ecc(SLIP10Ed25519MoneroECC.NAME);
  console.log(`Lookup Ed25519-Monero    : ${ecc4.NAME}`);
  const valid4 = validateAndGetPublicKey(edMoneroPub.rawCompressed(), SLIP10Ed25519MoneroPublicKey);
  console.log(`Validated Ed25519-Monero : ${valid4 instanceof SLIP10Ed25519MoneroPublicKey}`);
}

runEcExamples();
