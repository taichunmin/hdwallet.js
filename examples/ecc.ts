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
  SLIP10Ed25519PrivateKey
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

  // Validation and lookup utilities
  const ecc1 = ECCS.ecc(SLIP10Secp256k1ECC.NAME);
  console.log(`Lookup Secp256k1     : ${ecc1.NAME}`);
  const valid1 = validateAndGetPublicKey(secpPub.rawCompressed(), SLIP10Secp256k1PublicKey);
  console.log(`Validated Secp256k1  : ${valid1 instanceof SLIP10Secp256k1PublicKey}`);

  const ecc2 = ECCS.ecc(SLIP10Nist256p1ECC.NAME);
  console.log(`Lookup Nist256p1     : ${ecc2.NAME}`);
  const valid2 = validateAndGetPublicKey(nistPub.rawCompressed(), SLIP10Nist256p1PublicKey);
  console.log(`Validated Nist256p1  : ${valid2 instanceof SLIP10Nist256p1PublicKey}`);

  const ecc3 = ECCS.ecc(SLIP10Ed25519ECC.NAME);
  console.log(`Lookup Ed25519       : ${ecc3.NAME}`);
  const valid3 = validateAndGetPublicKey(edPub.rawCompressed(), SLIP10Ed25519PublicKey);
  console.log(`Validated Ed25519    : ${valid3 instanceof SLIP10Ed25519PublicKey}`);
}

runEcExamples();
