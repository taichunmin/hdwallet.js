// SPDX-License-Identifier: MIT

import eccs from '../data/json/eccs.json';

import {
  SLIP10Ed25519Blake2bPoint,
  SLIP10Ed25519Blake2bPublicKey,
  SLIP10Ed25519Blake2bPrivateKey
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

const data = (eccs as Record<string, CurveData>)["SLIP10-Ed25519-Blake2b"];

describe("SLIP10-Ed25519-Blake2b (tweetnacl) end-to-end", () => {
  it("curve name via instances", () => {
    const sk = SLIP10Ed25519Blake2bPrivateKey.fromBytes(
      getBytes(data["private-key"])
    );
    expect(sk.getName()).toBe(data.name);

    const baseEnc = getBytes(data.uncompressed.point.encode);
    const pt      = SLIP10Ed25519Blake2bPoint.fromBytes(baseEnc);
    expect(pt.getName()).toBe(data.name);

    const pkEnc   = getBytes(data.uncompressed["public-key"]);
    const pk      = SLIP10Ed25519Blake2bPublicKey.fromBytes(pkEnc);
    expect(pk.getName()).toBe(data.name);
  });

  for (const type of ["uncompressed", "compressed"] as const) {
    const { encode } = data[type].point;
    const enc        = getBytes(encode);

    const canonical = SLIP10Ed25519Blake2bPoint.fromBytes(enc);
    const xs        = canonical.x();
    const ys        = canonical.y();
    const expEnc    = canonical.rawEncoded();
    const expDec    = canonical.rawDecoded();

    it(`Point.fromBytes() (${type})`, () => {
      const p = SLIP10Ed25519Blake2bPoint.fromBytes(enc);
      expect(p.getName()).toBe(data.name);
      expect(p.x()).toBe(xs);
      expect(p.y()).toBe(ys);
      expect(p.rawEncoded()).toEqual(expEnc);
      expect(p.rawDecoded()).toEqual(expDec);
    });

    it(`Point.fromCoordinates() (${type})`, () => {
      const p = SLIP10Ed25519Blake2bPoint.fromCoordinates(xs, ys);
      expect(p.getName()).toBe(data.name);
      expect(p.x()).toBe(xs);
      expect(p.y()).toBe(ys);
      expect(p.rawEncoded()).toEqual(expEnc);
      expect(p.rawDecoded()).toEqual(expDec);
    });
  }

  it("scalar arithmetic on base-point", () => {
    const enc = getBytes(data.uncompressed.point.encode);
    const G   = SLIP10Ed25519Blake2bPoint.fromBytes(enc);

    for (let n = 2; n < 50; n++) {
      const prev = BigInt(n - 1), cur = BigInt(n);
      const a1   = G.add(G.multiply(prev));
      const a2   = G.multiply(prev).add(G);
      const m1   = G.multiply(cur);
      const m2   = G.multiply(cur);

      const expEnc = m1.rawEncoded();
      const expDec = m1.rawDecoded();

      for (const q of [a1, a2, m1, m2]) {
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
      const pk = SLIP10Ed25519Blake2bPublicKey.fromBytes(pkBytes);
      expect(pk.getName()).toBe(data.name);
      expect(pk.rawUncompressed()).toEqual(
        getBytes(data.uncompressed["public-key"])
      );
      expect(pk.rawCompressed()).toEqual(
        getBytes(data.compressed["public-key"])
      );

      const pt = pk.point();
      const base = SLIP10Ed25519Blake2bPoint.fromBytes(
        getBytes(data.uncompressed.point.encode)
      );
      expect(pt.x()).toBe(base.x());
      expect(pt.y()).toBe(base.y());
    });
  }

  it("PrivateKey.fromBytes() → raw & publicKey", () => {
    const sk = SLIP10Ed25519Blake2bPrivateKey.fromBytes(
      getBytes(data["private-key"])
    );
    expect(sk.getName()).toBe(data.name);
    expect(sk.raw()).toEqual(getBytes(data["private-key"]));

    const pk = sk.publicKey();
    expect(pk.getName()).toBe(data.name);
    expect(pk.rawUncompressed()).toEqual(
      getBytes(data.uncompressed["public-key"])
    );
    expect(pk.rawCompressed()).toEqual(
      getBytes(data.compressed["public-key"])
    );
  });
});
