import { describe, expect, it } from "vitest";
import { EARTH_RADIUS_KM, formatCoordinate, haversineKm, normalizeLongitude, parseLatitude, parseLongitude } from "@/lib/geo";

describe("haversineKm", () => {
  it("is zero for the same point", () => {
    expect(haversineKm({ lat: 41.9, lon: 12.5 }, { lat: 41.9, lon: 12.5 })).toBe(0);
  });

  it("matches one degree of longitude on the equator", () => {
    const expected = (2 * Math.PI * EARTH_RADIUS_KM) / 360;
    expect(haversineKm({ lat: 0, lon: 0 }, { lat: 0, lon: 1 })).toBeCloseTo(expected, 6);
  });

  it("measures a short hop across the antimeridian", () => {
    const twoDegrees = (2 * Math.PI * EARTH_RADIUS_KM) / 180;
    expect(haversineKm({ lat: 0, lon: 179 }, { lat: 0, lon: -179 })).toBeCloseTo(twoDegrees, 6);
  });

  it("reaches about half a meridian between antipodes", () => {
    expect(haversineKm({ lat: 0, lon: 0 }, { lat: 0, lon: 180 })).toBeCloseTo(Math.PI * EARTH_RADIUS_KM, 6);
  });

  it("puts London and Paris a few hundred kilometers apart", () => {
    const distance = haversineKm({ lat: 51.5074, lon: -0.1278 }, { lat: 48.8566, lon: 2.3522 });
    expect(distance).toBeGreaterThan(340);
    expect(distance).toBeLessThan(348);
  });

  it("rejects non-finite coordinates", () => {
    expect(() => haversineKm({ lat: Number.NaN, lon: 0 }, { lat: 0, lon: 0 })).toThrow(/finite/);
  });
});

describe("coordinate parsing", () => {
  it("accepts decimal degrees inside range", () => {
    expect(parseLatitude(" -33.94 ")).toEqual({ ok: true, value: -33.94 });
    expect(parseLongitude("180")).toEqual({ ok: true, value: 180 });
    expect(parseLatitude("-90")).toEqual({ ok: true, value: -90 });
  });

  it("rejects out-of-range values, blanks, and trailing words", () => {
    expect(parseLatitude("91").ok).toBe(false);
    expect(parseLongitude("-181").ok).toBe(false);
    expect(parseLatitude("").ok).toBe(false);
    expect(parseLongitude("12 east").ok).toBe(false);
  });

  it("normalizes longitude into the -180 to 180 interval", () => {
    expect(normalizeLongitude(190)).toBeCloseTo(-170);
    expect(normalizeLongitude(-190)).toBeCloseTo(170);
    expect(normalizeLongitude(0)).toBe(0);
  });

  it("formats a readable hemisphere pair", () => {
    expect(formatCoordinate({ lat: -35.27, lon: 174.08 })).toBe("35.27° S, 174.08° E");
  });
});
