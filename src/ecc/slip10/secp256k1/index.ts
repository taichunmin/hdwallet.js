import { IEllipticCurveCryptography } from "../../iecc";
import { SLIP10Secp256k1Point } from "./point";
import { SLIP10Secp256k1PublicKey } from "./public_key";
import { SLIP10Secp256k1PrivateKey } from "./private_key";


export class SLIP10Secp256k1ECC implements IEllipticCurveCryptography {
  public static NAME = "SLIP10-Secp256k1";
  public static ORDER = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
  public static GENERATOR = SLIP10Secp256k1Point.fromCoordinates(
    BigInt("0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798"),
    BigInt("0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8")
  );
  public static POINT = SLIP10Secp256k1Point;
  public static PUBLIC_KEY = SLIP10Secp256k1PublicKey;
  public static PRIVATE_KEY = SLIP10Secp256k1PrivateKey;
}

export {
    SLIP10Secp256k1Point,
    SLIP10Secp256k1PublicKey,
    SLIP10Secp256k1PrivateKey
}