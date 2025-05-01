import { SLIP10Ed25519ECC } from "..";
import { IEllipticCurveCryptography, IPoint, IPublicKey, IPrivateKey } from "../../../";
import { SLIP10Ed25519Blake2bPoint } from "./point";
import { SLIP10Ed25519Blake2bPublicKey } from "./public_key";
import { SLIP10Ed25519Blake2bPrivateKey } from "./private_key";

export class SLIP10Ed25519Blake2bECC extends IEllipticCurveCryptography {
  static NAME: string = "SLIP10-Ed25519-Blake2b";
  static ORDER: bigint = SLIP10Ed25519ECC.ORDER;
  static GENERATOR: IPoint = SLIP10Ed25519ECC.GENERATOR;
  static POINT: typeof IPoint = SLIP10Ed25519Blake2bPoint;
  static PUBLIC_KEY: typeof IPublicKey = SLIP10Ed25519Blake2bPublicKey;
  static PRIVATE_KEY: typeof IPrivateKey = SLIP10Ed25519Blake2bPrivateKey;
}

export {
  SLIP10Ed25519Blake2bPoint,
  SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey
};