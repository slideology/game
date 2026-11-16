import { describe, expect, it } from "vitest";
import { chronologicalIndex, eraMismatchNote, formatYear, parseYearInput, yearGap } from "@/lib/years";

describe("BC/AD conversion", () => {
  it("places 1 BC immediately before 1 AD", () => {
    expect(chronologicalIndex(1, "BC")).toBe(0);
    expect(chronologicalIndex(1, "AD")).toBe(1);
    expect(yearGap({ year: 1, era: "BC" }, { year: 1, era: "AD" })).toBe(1);
  });

  it("counts 2 BC to 2 AD as three years, not four", () => {
    expect(chronologicalIndex(2, "BC")).toBe(-1);
    expect(yearGap({ year: 2, era: "BC" }, { year: 2, era: "AD" })).toBe(3);
  });

  it("counts 44 BC to 79 AD without a year zero", () => {
    expect(yearGap({ year: 44, era: "BC" }, { year: 79, era: "AD" })).toBe(122);
  });

  it("rejects year zero, fractions, and blank input", () => {
    expect(() => chronologicalIndex(0, "AD")).toThrow(/year zero/i);
    expect(() => chronologicalIndex(1.5, "BC")).toThrow(/year zero/i);
    expect(parseYearInput("0")).toMatchObject({ ok: false });
    expect(parseYearInput("44 BC").ok).toBe(false);
    expect(parseYearInput("-44").ok).toBe(false);
    expect(parseYearInput("")).toMatchObject({ ok: false });
    expect(parseYearInput("0044")).toEqual({ ok: true, year: 44 });
  });

  it("explains an era swap of the same numerals", () => {
    const note = eraMismatchNote({ year: 490, era: "AD" }, { year: 490, era: "BC" });
    expect(note).toContain("979");
    expect(note?.toLowerCase()).toContain("no year zero");
    expect(eraMismatchNote({ year: 490, era: "BC" }, { year: 490, era: "BC" })).toBeNull();
  });

  it("formats years with an era", () => {
    expect(formatYear(1066, "AD")).toBe("1,066 AD");
    expect(formatYear(44, "BC")).toBe("44 BC");
  });
});
