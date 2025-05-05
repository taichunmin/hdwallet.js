// SPDX-License-Identifier: MIT

import eccs from '../data/json/eccs.json';

import {
  SLIP10Nist256p1Point,
  SLIP10Nist256p1PublicKey,
  SLIP10Nist256p1PrivateKey
} from '../../src/ecc';

import { getBytes } from '../../src/utils';

interface PointVec { encode: string; decode: string; }
interface CurveData {
  name: string;
  "private-key-length": number;
  "private-key": string;
  uncompressed: { length: number; "public-key": string; point: PointVec };
  compressed:   { length: number; "public-key": string; point: PointVec };
}

const data = (eccs as Record<string, CurveData>)["SLIP10-Nist256p1"];

describe("SLIP10-Nist256p1 end-to-end", () => {
  it("instance .getName()", () => {
    const sk = SLIP10Nist256p1PrivateKey.fromBytes(getBytes(data["private-key"]));
    expect(sk.getName()).toBe(data.name);

    const pt = SLIP10Nist256p1Point.fromBytes(getBytes(data.uncompressed.point.encode));
    expect(pt.getName()).toBe(data.name);

    const pk = SLIP10Nist256p1PublicKey.fromBytes(getBytes(data.uncompressed["public-key"]));
    expect(pk.getName()).toBe(data.name);
  });

  describe("Base-point (generator) matches JSON", () => {
    const enc = getBytes(data.uncompressed.point.encode);
    const dec = getBytes(data.uncompressed.point.decode);

    const G1 = SLIP10Nist256p1Point.fromBytes(enc);
    const xs = G1.x();
    const ys = G1.y();

    it("fromBytes() → rawEncoded/rawDecoded", () => {
      expect(G1.rawEncoded()).toEqual(enc);
      expect(G1.rawDecoded()).toEqual(dec);
    });

    it("fromCoordinates(x,y) → rawEncoded/rawDecoded", () => {
      const G2 = SLIP10Nist256p1Point.fromCoordinates(xs, ys);
      expect(G2.rawEncoded()).toEqual(enc);
      expect(G2.rawDecoded()).toEqual(dec);
    });
  });

  for (const type of ["uncompressed", "compressed"] as const) {
    const vec = data[type].point;
    const enc = getBytes(vec.encode);
    const dec = getBytes(vec.decode);

    const baseP = SLIP10Nist256p1Point.fromBytes(enc);
    const xsStr = baseP.x().toString();
    const ysStr = baseP.y().toString();

    describe(`Point (${type})`, () => {
      it("fromBytes()", () => {
        const p = SLIP10Nist256p1Point.fromBytes(enc);
        expect(p.x().toString()).toBe(xsStr);
        expect(p.y().toString()).toBe(ysStr);
        expect(p.rawDecoded()).toEqual(dec);
        expect(p.rawEncoded()).toEqual(enc);
      });

      it("fromCoordinates()", () => {
        const p = SLIP10Nist256p1Point.fromCoordinates(
          BigInt(xsStr),
          BigInt(ysStr)
        );
        expect(p.x().toString()).toBe(xsStr);
        expect(p.y().toString()).toBe(ysStr);
        expect(p.rawDecoded()).toEqual(dec);
        expect(p.rawEncoded()).toEqual(enc);
      });
    });

    describe(`PublicKey (${type})`, () => {
      const pkBytes = getBytes(data[type]["public-key"]);
      it("fromBytes()", () => {
        const pk = SLIP10Nist256p1PublicKey.fromBytes(pkBytes);
        expect(pk.rawUncompressed()).toEqual(
          getBytes(data.uncompressed["public-key"])
        );
        expect(pk.rawCompressed()).toEqual(
          getBytes(data.compressed["public-key"])
        );

        const pt = pk.point();
        expect(pt.x().toString()).toBe(xsStr);
        expect(pt.y().toString()).toBe(ysStr);
      });
    });
  }

  describe("PrivateKey", () => {
    it("fromBytes() → raw & pubkey", () => {
      const sk = SLIP10Nist256p1PrivateKey.fromBytes(getBytes(data["private-key"]));
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
    const G   = SLIP10Nist256p1Point.fromBytes(enc);

    for (let n = 2; n < 50; n++) {
      it(`n=${n}`, () => {
        const prev = BigInt(n - 1);
        const cur  = BigInt(n);

        const a1 = G.add(G.multiply(prev));
        const a2 = G.multiply(prev).add(G);
        const m1 = G.multiply(cur);
        const m2 = G.multiply(cur);

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
