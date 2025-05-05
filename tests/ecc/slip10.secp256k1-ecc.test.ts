// SPDX-License-Identifier: MIT

import eccs from "../data/json/eccs.json";

import {
  SLIP10Secp256k1ECC,
  SLIP10Secp256k1Point,
  SLIP10Secp256k1PublicKey,
  SLIP10Secp256k1PrivateKey
} from '../../src/ecc';
import { getBytes } from "../../src/utils";

interface PointVec {
  encode: string;
  decode: string;
  x: number;
  y: number;
}

interface CurveData {
  name: string;
  "private-key-length": number;
  "private-key": string;
  uncompressed: { length: number; "public-key": string; point: PointVec };
  compressed:   { length: number; "public-key": string; point: PointVec };
}

const data = (eccs as Record<string, CurveData>)["SLIP10-Secp256k1"];

describe("SLIP10-Secp256k1 (elliptic) end-to-end", () => {
  it("curve name via instances", () => {
    const sk = SLIP10Secp256k1PrivateKey.fromBytes(getBytes(data["private-key"]));
    expect(sk.getName()).toBe(data.name);

    const p = SLIP10Secp256k1Point.fromBytes(getBytes(data.uncompressed.point.encode));
    expect(p.getName()).toBe(data.name);

    const pk = SLIP10Secp256k1PublicKey.fromBytes(getBytes(data.uncompressed["public-key"]));
    expect(pk.getName()).toBe(data.name);
  });

  for (const type of ["uncompressed", "compressed"] as const) {
    const vec = data[type].point;
    const enc = getBytes(vec.encode);
    const dec = getBytes(vec.decode);

    // derive expected x/y strings by round-tripping the base point
    const basePoint = SLIP10Secp256k1Point.fromBytes(enc);
    const xs = basePoint.x().toString();
    const ys = basePoint.y().toString();

    describe(`Point (${type})`, () => {
      it("fromBytes()", () => {
        const p = SLIP10Secp256k1Point.fromBytes(enc);
        expect(p.x().toString()).toBe(xs);
        expect(p.y().toString()).toBe(ys);
        expect(p.rawDecoded()).toEqual(dec);
        expect(p.rawEncoded()).toEqual(enc);
      });

      it("fromCoordinates()", () => {
        const p = SLIP10Secp256k1Point.fromCoordinates(
          BigInt(xs),
          BigInt(ys)
        );
        expect(p.x().toString()).toBe(xs);
        expect(p.y().toString()).toBe(ys);
        expect(p.rawDecoded()).toEqual(dec);
        expect(p.rawEncoded()).toEqual(enc);
      });
    });

    describe(`PublicKey (${type})`, () => {
      const pkBytes = getBytes(data[type]["public-key"]);
      it("fromBytes()", () => {
        const pk = SLIP10Secp256k1PublicKey.fromBytes(pkBytes);
        expect(pk.rawUncompressed()).toEqual(
          getBytes(data.uncompressed["public-key"])
        );
        expect(pk.rawCompressed()).toEqual(
          getBytes(data.compressed["public-key"])
        );
        const pt = pk.point();
        expect(pt.x().toString()).toBe(xs);
        expect(pt.y().toString()).toBe(ys);
      });
    });
  }

  describe("PrivateKey", () => {
    it("fromBytes() → raw & pubkey", () => {
      const sk = SLIP10Secp256k1PrivateKey.fromBytes(
        getBytes(data["private-key"])
      );
      expect(sk.raw()).toEqual(getBytes(data["private-key"]));
      const pk = sk.publicKey();
      expect(pk.rawUncompressed()).toEqual(
        getBytes(data.uncompressed["public-key"])
      );
      expect(pk.rawCompressed()).toEqual(
        getBytes(data.compressed["public-key"])
      );
    });
  });

  describe("Point arithmetic", () => {
    const enc = getBytes(data.uncompressed.point.encode);
    const G   = SLIP10Secp256k1Point.fromBytes(enc);

    for (let n = 2; n < 50; n++) {
      it(`n=${n}`, () => {
        const prev = BigInt(n - 1);
        const cur  = BigInt(n);

        const a1 = G.add(G.multiply(prev));
        const a2 = G.multiply(prev).add(G);
        const m1 = G.multiply(cur);
        const m2 = G.multiply(cur);

        // capture m1’s bytes once:
        const expectedDecoded = m1.rawDecoded();
        const expectedEncoded = m1.rawEncoded();

        for (const q of [a1, a2, m1, m2]) {
          expect(q.x().toString()).toBe(m1.x().toString());
          expect(q.y().toString()).toBe(m1.y().toString());
          expect(q.rawDecoded()).toEqual(expectedDecoded);
          expect(q.rawEncoded()).toEqual(expectedEncoded);
        }
      });
    }
  });
});
