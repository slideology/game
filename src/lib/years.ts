export type Era = "BC" | "AD";

const YEAR_MIN = 1;
const YEAR_MAX = 9999;

/**
 * Chronological index with no year zero.
 * 2 BC → -1, 1 BC → 0, 1 AD → 1, 2 AD → 2.
 * The gap between 1 BC and 1 AD is therefore 1 year, not 2.
 */
export function chronologicalIndex(year: number, era: Era): number {
  assertHistoricalYear(year);
  return era === "AD" ? year : 1 - year;
}

export function yearGap(
  guess: { year: number; era: Era },
  answer: { year: number; era: Era },
): number {
  return Math.abs(
    chronologicalIndex(guess.year, guess.era) -
      chronologicalIndex(answer.year, answer.era),
  );
}

export function assertHistoricalYear(year: number): void {
  if (!Number.isInteger(year) || year < YEAR_MIN || year > YEAR_MAX) {
    throw new Error(
      "Year must be an integer from 1 to 9999. There is no year zero.",
    );
  }
}

export type YearParse =
  | { ok: true; year: number }
  | { ok: false; message: string };

export function parseYearInput(raw: string): YearParse {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, message: "Enter a year." };
  if (!/^\d+$/.test(trimmed)) {
    return {
      ok: false,
      message:
        "Use a whole number of years. Choose BC or AD beside the field. There is no year zero.",
    };
  }
  const year = Number(trimmed);
  if (year === 0) {
    return {
      ok: false,
      message: "There is no year zero. Use 1 BC or 1 AD.",
    };
  }
  if (year > YEAR_MAX) {
    return { ok: false, message: "Enter a year from 1 to 9999." };
  }
  return { ok: true, year };
}

export function formatYear(year: number, era: Era): string {
  assertHistoricalYear(year);
  return `${year.toLocaleString("en-US")} ${era}`;
}

/** Shown when the numerals match but the era does not. */
export function eraMismatchNote(
  guess: { year: number; era: Era },
  answer: { year: number; era: Era },
): string | null {
  if (guess.era === answer.era || guess.year !== answer.year) return null;
  const gap = yearGap(guess, answer);
  return `${formatYear(answer.year, answer.era)} and ${formatYear(guess.year, guess.era)} are ${gap.toLocaleString("en-US")} years apart. There is no year zero, so the gap is ${answer.year + guess.year - 1}, not zero.`;
}
