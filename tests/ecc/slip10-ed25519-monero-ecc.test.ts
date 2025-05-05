// SPDX-License-Identifier: MIT

import eccs from '../data/json/eccs.json';

import {
  SLIP10Ed25519MoneroPoint,
  SLIP10Ed25519MoneroPublicKey,
  SLIP10Ed25519MoneroPrivateKey
} from '../../src/ecc';

import { getBytes } from '../../src/utils';

interface PointVec { encode: string; decode: string; x: number; y: number }
interface CurveData {
  name: string;
  "private-key-length": number;
  "private-key": string;
  uncompressed: { length: number; "public-key": string; point: PointVec };
  compressed:   { length: number; "public-key": string; point: PointVec };
}

const data = (eccs as Record<string, CurveData>)["SLIP10-Ed25519-Monero"];

describe("SLIP10-Ed25519-Monero (tweetnacl) end-to-end", () => {
  it("instance .getName()", () => {
    const sk = SLIP10Ed25519MoneroPrivateKey.fromBytes(
      getBytes(data["private-key"])
    );
    expect(sk.getName()).toBe(data.name);

    const pt = SLIP10Ed25519MoneroPoint.fromBytes(
      getBytes(data.uncompressed.point.encode)
    );
    expect(pt.getName()).toBe(data.name);

    const pk = SLIP10Ed25519MoneroPublicKey.fromBytes(
      getBytes(data.uncompressed["public-key"])
    );
    expect(pk.getName()).toBe(data.name);
  });

  for (const type of ["uncompressed", "compressed"] as const) {
    const vec = data[type].point;
    const enc = getBytes(vec.encode);

    const canonical = SLIP10Ed25519MoneroPoint.fromBytes(enc);
    const expectedEncoded = canonical.rawEncoded();
    const expectedDecoded = canonical.rawDecoded();
    const xs = canonical.x();
    const ys = canonical.y();

    describe(`Point (${type})`, () => {
      it("fromBytes()", () => {
        const p = SLIP10Ed25519MoneroPoint.fromBytes(enc);
        expect(p.x()).toBe(xs);
        expect(p.y()).toBe(ys);
        expect(p.rawEncoded()).toEqual(expectedEncoded);
        expect(p.rawDecoded()).toEqual(expectedDecoded);
      });

      it("fromCoordinates()", () => {
        const p = SLIP10Ed25519MoneroPoint.fromCoordinates(xs, ys);
        expect(p.x()).toBe(xs);
        expect(p.y()).toBe(ys);
        expect(p.rawEncoded()).toEqual(expectedEncoded);
        expect(p.rawDecoded()).toEqual(expectedDecoded);
      });
    });

    describe(`PublicKey (${type})`, () => {
      const pkBytes = getBytes(data[type]["public-key"]);
      it("fromBytes()", () => {
        const pk = SLIP10Ed25519MoneroPublicKey.fromBytes(pkBytes);
        expect(pk.rawUncompressed()).toEqual(
          getBytes(data.uncompressed["public-key"])
        );
        expect(pk.rawCompressed()).toEqual(
          getBytes(data.compressed["public-key"])
        );

        const pt2 = pk.point();
        expect(pt2.x()).toBe(xs);
        expect(pt2.y()).toBe(ys);
      });
    });
  }

  describe("PrivateKey", () => {
    it("fromBytes() → raw & pubkey", () => {
      const sk = SLIP10Ed25519MoneroPrivateKey.fromBytes(
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
    const G   = SLIP10Ed25519MoneroPoint.fromBytes(enc);

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
          expect(q.x()).toBe(m1.x());
          expect(q.y()).toBe(m1.y());
          expect(q.rawEncoded()).toEqual(expectedEncoded);
          expect(q.rawDecoded()).toEqual(expectedDecoded);
        }
      });
    }
  });
});
