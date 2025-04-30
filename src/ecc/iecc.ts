import { IPoint } from "./ipoint";
import { IPublicKey } from "./ipublic_key";
import { IPrivateKey } from "./iprivate_key";


export abstract class IEllipticCurveCryptography {
  public static NAME: string;
  public static ORDER: bigint;
  public static GENERATOR: IPoint;
  public static POINT: IPoint;
  public static PUBLIC_KEY: typeof IPublicKey;
  public static PRIVATE_KEY: typeof IPrivateKey;
}
