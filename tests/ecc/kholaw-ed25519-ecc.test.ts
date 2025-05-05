// SPDX-License-Identifier: MIT

import eccs from '../data/json/eccs.json';

import {
  KholawEd25519ECC,
  KholawEd25519Point,
  KholawEd25519PublicKey,
  KholawEd25519PrivateKey
} from '../../src/ecc';

import { getBytes } from '../../src/utils';

interface PointVec { encode: string; x: number; y: number }
interface CurveData {
  name: string;
  "private-key-length": number;
  "private-key": string;
  uncompressed: { length: number; "public-key": string; point: PointVec };
  compressed:   { length: number; "public-key": string; point: PointVec };
}

const data = (eccs as Record<string, CurveData>)["Kholaw-Ed25519"];

describe("SLIP10-Kholaw-Ed25519 end-to-end", () => {
  it("curve-name via getName()", () => {
    const sk = KholawEd25519PrivateKey.fromBytes(getBytes(data["private-key"]));
    expect(sk.getName()).toBe(data.name);

    const baseEnc = getBytes(data.uncompressed.point.encode);
    expect(KholawEd25519Point.fromBytes(baseEnc).getName()).toBe(data.name);

    expect(
      KholawEd25519PublicKey.fromBytes(getBytes(data.uncompressed["public-key"])).getName()
    ).toBe(data.name);
  });


  for (const type of ["uncompressed", "compressed"] as const) {
    const enc = getBytes(data[type].point.encode);

    const canonical = KholawEd25519Point.fromBytes(enc);
    const xs        = canonical.x();
    const ys        = canonical.y();
    const expEnc    = canonical.rawEncoded();
    const expDec    = canonical.rawDecoded();

    it(`Point.fromBytes() (${type})`, () => {
      const p = KholawEd25519Point.fromBytes(enc);
      expect(p.x()).toBe(xs);
      expect(p.y()).toBe(ys);
      expect(p.rawEncoded()).toEqual(expEnc);
      expect(p.rawDecoded()).toEqual(expDec);
    });

    it(`Point.fromCoordinates() (${type})`, () => {
      const p = KholawEd25519Point.fromCoordinates(xs, ys);
      expect(p.x()).toBe(xs);
      expect(p.y()).toBe(ys);
      expect(p.rawEncoded()).toEqual(expEnc);
      expect(p.rawDecoded()).toEqual(expDec);
    });
  }

  it("scalar arithmetic on the base-point", () => {
    const enc = getBytes(data.uncompressed.point.encode);
    const G   = KholawEd25519Point.fromBytes(enc);

    for (let n = 2; n < 50; n++) {
      const prev = BigInt(n - 1);
      const cur  = BigInt(n);

      const m1 = G.multiply(cur);
      const expEnc = m1.rawEncoded();
      const expDec = m1.rawDecoded();

      for (const q of [
        G.add(G.multiply(prev)),
        G.multiply(prev).add(G),
        m1,
        G.multiply(cur)
      ]) {
        expect(q.x()).toBe(m1.x());
        expect(q.y()).toBe(m1.y());
        expect(q.rawEncoded()).toEqual(expEnc);
        expect(q.rawDecoded()).toEqual(expDec);
      }
    }
  });

  for (const type of ["uncompressed", "compressed"] as const) {
    const pkBytes = getBytes(data[type]["public-key"]);
    it(`PublicKey.fromBytes() (${type})`, () => {
      const pk = KholawEd25519PublicKey.fromBytes(pkBytes);
      expect(pk.rawUncompressed()).toEqual(
        getBytes(data.uncompressed["public-key"])
      );
      expect(pk.rawCompressed()).toEqual(
        getBytes(data.compressed["public-key"])
      );

      const pt2 = pk.point();
      const base = KholawEd25519Point.fromBytes(
        getBytes(data.uncompressed.point.encode)
      );
      expect(pt2.x()).toBe(base.x());
      expect(pt2.y()).toBe(base.y());
    });
  }

  it("PrivateKey.fromBytes() → raw & publicKey", () => {
    const sk = KholawEd25519PrivateKey.fromBytes(
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
