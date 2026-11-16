import { describe, expect, it } from "vitest";
import { EPOCH_UTC } from "@/config/rules";
import { formatCountdown, msUntilNextUtcMidnight, puzzleIndex, utcDateKey, utcDaysBetween } from "@/lib/calendar";

describe("UTC date rotation", () => {
  it("keeps the whole UTC calendar day on the same set", () => {
    const morning = new Date("2026-01-01T00:00:00Z");
    const evening = new Date("2026-01-01T23:59:59Z");
    expect(utcDateKey(morning)).toBe("2026-01-01");
    expect(utcDateKey(evening)).toBe("2026-01-01");
    expect(puzzleIndex(morning, 8)).toBe(puzzleIndex(evening, 8));
    expect(puzzleIndex(morning, 8)).toBe(0);
  });

  it("advances at 00:00 UTC and wraps after the last set", () => {
    expect(puzzleIndex(new Date("2026-01-02T00:00:00Z"), 8)).toBe(1);
    expect(puzzleIndex(new Date("2026-01-09T12:00:00Z"), 8)).toBe(0);
    expect(puzzleIndex(new Date("2026-01-08T00:00:00Z"), 8)).toBe(7);
  });

  it("uses UTC even when the same instant is the previous local evening", () => {
    const utcMorning = new Date("2026-01-02T03:30:00Z");
    const usEveningThatIsAlreadyNextUtcDay = new Date("2026-01-01T21:30:00-05:00");
    expect(utcDateKey(utcMorning)).toBe("2026-01-02");
    expect(utcDateKey(usEveningThatIsAlreadyNextUtcDay)).toBe("2026-01-02");
    expect(puzzleIndex(usEveningThatIsAlreadyNextUtcDay, 8)).toBe(1);
  });

  it("maps dates before the epoch without a negative index", () => {
    expect(puzzleIndex(new Date("2025-12-31T00:00:00Z"), 8)).toBe(7);
    expect(utcDaysBetween(EPOCH_UTC, "2025-12-31")).toBe(-1);
  });

  it("counts the 2028 leap day", () => {
    expect(utcDaysBetween("2028-02-28", "2028-03-01")).toBe(2);
    expect(utcDaysBetween("2026-02-28", "2026-03-01")).toBe(1);
  });

  it("is stable for a known date in the rotation", () => {
    expect(utcDateKey(new Date("2026-11-16T15:00:00Z"))).toBe("2026-11-16");
    expect(puzzleIndex(new Date("2026-11-16T15:00:00Z"), 8)).toBe(319 % 8);
  });

  it("counts down to the next UTC midnight", () => {
    const date = new Date("2026-11-16T22:30:00Z");
    expect(msUntilNextUtcMidnight(date)).toBe(90 * 60 * 1000);
    expect(formatCountdown(msUntilNextUtcMidnight(date))).toBe("1h 30m");
  });
});
