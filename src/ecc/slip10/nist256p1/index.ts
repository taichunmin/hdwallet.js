import * as elliptic from "elliptic";
import { IEllipticCurveCryptography } from "../../iecc";
import { IPoint } from "../../ipoint";
import { SLIP10Nist256p1Point } from "./point";
import { SLIP10Nist256p1PublicKey } from "./public_key";
import { SLIP10Nist256p1PrivateKey } from "./private_key";
import { IPublicKey } from "../../ipublic_key";
import { IPrivateKey } from "../../iprivate_key";

const ec = new elliptic.ec("p256");

export class SLIP10Nist256p1ECC extends IEllipticCurveCryptography {
  static NAME: string = "SLIP10-Nist256p1";
  static ORDER: bigint = BigInt(ec.curve.n.toString(10));
  static GENERATOR: IPoint = SLIP10Nist256p1Point.fromCoordinates(
    BigInt(ec.curve.g.getX().toString(10)),
    BigInt(ec.curve.g.getY().toString(10))
  );
  static POINT: typeof IPoint= SLIP10Nist256p1Point;
  static PUBLIC_KEY: typeof IPublicKey= SLIP10Nist256p1PublicKey;
  static PRIVATE_KEY: typeof IPrivateKey = SLIP10Nist256p1PrivateKey;
}

export {
    SLIP10Nist256p1Point,
    SLIP10Nist256p1PublicKey,
    SLIP10Nist256p1PrivateKey
}