import {
  CLOSE_RATIO,
  LOCATION_DECAY_KM,
  MAX_LOCATION_SCORE,
  MAX_YEAR_SCORE,
  NEAR_RATIO,
  YEAR_DECAY_YEARS,
} from "@/config/rules";

export type ScoreBand = "close" | "near" | "far";

export function locationScore(distanceKm: number): number {
  if (!Number.isFinite(distanceKm)) {
    throw new Error("Distance must be a finite number of kilometers.");
  }
  const distance = Math.max(0, distanceKm);
  return clamp(
    MAX_LOCATION_SCORE * Math.exp(-distance / LOCATION_DECAY_KM),
    MAX_LOCATION_SCORE,
  );
}

export function yearScore(yearError: number): number {
  if (!Number.isFinite(yearError)) {
    throw new Error("Year error must be a finite number of years.");
  }
  const years = Math.max(0, yearError);
  return clamp(
    MAX_YEAR_SCORE * Math.exp(-years / YEAR_DECAY_YEARS),
    MAX_YEAR_SCORE,
  );
}

export function scoreBand(score: number, max: number): ScoreBand {
  if (!Number.isFinite(score) || !Number.isFinite(max) || max <= 0) {
    throw new Error("Score band needs a finite score and a positive maximum.");
  }
  if (score >= max * CLOSE_RATIO) return "close";
  if (score >= max * NEAR_RATIO) return "near";
  return "far";
}

/** Kilometers at which the place score falls to `ratio` of the maximum. */
export function distanceForRatio(ratio: number): number {
  return -LOCATION_DECAY_KM * Math.log(ratio);
}

/** Year error at which the year score falls to `ratio` of the maximum. */
export function yearsForRatio(ratio: number): number {
  return -YEAR_DECAY_YEARS * Math.log(ratio);
}

function clamp(raw: number, max: number): number {
  const rounded = Math.round(raw);
  if (rounded < 0) return 0;
  if (rounded > max) return max;
  return rounded;
}
