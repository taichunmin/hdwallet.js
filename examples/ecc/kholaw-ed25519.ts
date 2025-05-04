// SPDX-License-Identifier: MIT

import {
  IEllipticCurveCryptography,
  IPublicKey,
  IPrivateKey,
  ECCS,
  KholawEd25519ECC,
  KholawEd25519PublicKey,
  KholawEd25519PrivateKey,
  validateAndGetPublicKey
} from '../../src/ecc';
import { hexToBytes, bytesToString, isAllBytesEqual } from '../../src/utils';

const ecc: typeof IEllipticCurveCryptography = ECCS.ecc(KholawEd25519ECC.NAME);

const privateKey = hexToBytes('8061879a8fc9e7c685cb89b7014c85a6c4a2a8f3b6fa4964381d0751baf8fb5ff97530b002426a6eb1308e01372905d4c19c2b52a939bccd24c99a5826b9f87c');

const kholawEd25519PrivateKey: IPrivateKey = KholawEd25519PrivateKey.fromBytes(privateKey);
const eccKholawEd25519PrivateKey: IPrivateKey = ecc.PRIVATE_KEY.fromBytes(privateKey);

const kholawEd25519PublicKey: IPublicKey = kholawEd25519PrivateKey.publicKey();
const eccKholawEd25519PublicKey: IPublicKey = eccKholawEd25519PrivateKey.publicKey();

console.log('ECC:', KholawEd25519ECC.NAME);
console.log('Private Key:', bytesToString(kholawEd25519PrivateKey.raw()));
console.log('Public Key - Uncompressed:', bytesToString(kholawEd25519PublicKey.rawUncompressed()));
console.log('Public Key - Compressed:', bytesToString(kholawEd25519PublicKey.rawCompressed()));

const uncompressed: IPublicKey = validateAndGetPublicKey(
    kholawEd25519PublicKey.rawUncompressed(), KholawEd25519PublicKey
);
const compressed: IPublicKey = validateAndGetPublicKey(
    kholawEd25519PublicKey.rawCompressed(), KholawEd25519PublicKey
);

console.log(
    uncompressed instanceof KholawEd25519PublicKey,
    compressed instanceof KholawEd25519PublicKey,
    isAllBytesEqual(
        uncompressed.rawUncompressed(),
        kholawEd25519PublicKey.rawUncompressed(),
        eccKholawEd25519PublicKey.rawUncompressed(),
        KholawEd25519PublicKey.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawUncompressed()
        ).rawUncompressed()
    ),
    isAllBytesEqual(
        compressed.rawCompressed(),
        kholawEd25519PublicKey.rawCompressed(),
        eccKholawEd25519PublicKey.rawCompressed(),
        KholawEd25519PublicKey.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed(),
        ecc.PUBLIC_KEY.fromBytes(
            uncompressed.rawCompressed()
        ).rawCompressed()
    )
);

