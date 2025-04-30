import {
  IEllipticCurveCryptography,
  IPoint,
  IPublicKey,
  IPrivateKey
} from "../../";
import { SLIP10Ed25519Point } from "./point";
import { SLIP10Ed25519PublicKey } from "./public_key";
import { SLIP10Ed25519PrivateKey } from "./private_key";


export class SLIP10Ed25519ECC extends IEllipticCurveCryptography {
  static NAME: string = "SLIP10-Ed25519";
  static ORDER: bigint = BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989");
  static GENERATOR: IPoint = SLIP10Ed25519Point.fromCoordinates(
    BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
    BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960")
  );
  static POINT: typeof IPoint = SLIP10Ed25519Point;
  static PUBLIC_KEY: typeof IPublicKey = SLIP10Ed25519PublicKey;
  static PRIVATE_KEY: typeof IPrivateKey = SLIP10Ed25519PrivateKey;
}

export {
  SLIP10Ed25519Point,
  SLIP10Ed25519PublicKey,
  SLIP10Ed25519PrivateKey
};
