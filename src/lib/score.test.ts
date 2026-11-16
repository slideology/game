import { describe, expect, it } from "vitest";
import { MAX_LOCATION_SCORE, MAX_YEAR_SCORE } from "@/config/rules";
import { locationScore, scoreBand, yearScore } from "@/lib/score";

describe("scoring bounds", () => {
  it("gives a perfect pin and a perfect year the maximum, and nothing more", () => {
    expect(locationScore(0)).toBe(MAX_LOCATION_SCORE);
    expect(yearScore(0)).toBe(MAX_YEAR_SCORE);
  });

  it("stays inside 0 and the maximum for a wide range of errors", () => {
    const distances = [0, 0.1, 1, 10, 100, 500, 1500, 4000, 8000, 12000, 20015, 1_000_000];
    const years = [0, 1, 5, 10, 30, 100, 500, 2000, 5000];
    for (const distance of distances) {
      const score = locationScore(distance);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(MAX_LOCATION_SCORE);
    }
    for (const yearsOff of years) {
      const score = yearScore(yearsOff);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(MAX_YEAR_SCORE);
    }
  });

  it("never rewards a worse guess with more points", () => {
    let previousPlace = locationScore(0);
    let previousYear = yearScore(0);
    for (let step = 1; step <= 200; step += 1) {
      const place = locationScore(step * 50);
      const year = yearScore(step);
      expect(place).toBeLessThanOrEqual(previousPlace);
      expect(year).toBeLessThanOrEqual(previousYear);
      previousPlace = place;
      previousYear = year;
    }
  });

  it("treats a negative distance or year error as exact", () => {
    expect(locationScore(-10)).toBe(MAX_LOCATION_SCORE);
    expect(yearScore(-2)).toBe(MAX_YEAR_SCORE);
  });

  it("scores a far pin and a distant century at zero after rounding", () => {
    expect(locationScore(20_000)).toBe(0);
    expect(yearScore(500)).toBe(0);
  });

  it("rejects non-finite input", () => {
    expect(() => locationScore(Number.POSITIVE_INFINITY)).toThrow(/finite/);
    expect(() => yearScore(Number.NaN)).toThrow(/finite/);
  });

  it("assigns bands from published ratios of the maximum", () => {
    expect(scoreBand(2000, 2500)).toBe("close");
    expect(scoreBand(1999, 2500)).toBe("near");
    expect(scoreBand(800, 2500)).toBe("near");
    expect(scoreBand(799, 2500)).toBe("far");
    expect(scoreBand(0, 2500)).toBe("far");
  });
});
