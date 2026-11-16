/**
 * Scoring and the daily clock. One global formula, published in the UI.
 * These numbers are original to this prototype.
 */
export const EPOCH_UTC = "2026-01-01";

export const MAX_LOCATION_SCORE = 2500;
export const MAX_YEAR_SCORE = 2500;
export const LOCATION_DECAY_KM = 1200;
export const YEAR_DECAY_YEARS = 30;

/** Close band: at least 80% of that half's points. Near: at least 32%. */
export const CLOSE_RATIO = 0.8;
export const NEAR_RATIO = 0.32;

export const ROUNDS_PER_SET = 5;

export const MAX_ROUND_SCORE = MAX_LOCATION_SCORE + MAX_YEAR_SCORE;
export const MAX_DAILY_SCORE = MAX_ROUND_SCORE * ROUNDS_PER_SET;

export const LOCATION_FORMULA = `round(${MAX_LOCATION_SCORE.toLocaleString("en-US")} × e^(−kilometers / ${LOCATION_DECAY_KM.toLocaleString("en-US")}))`;
export const YEAR_FORMULA = `round(${MAX_YEAR_SCORE.toLocaleString("en-US")} × e^(−years off / ${YEAR_DECAY_YEARS}))`;

export const DAILY_RESET_SUMMARY =
  "The daily set changes at 00:00 Coordinated Universal Time (UTC). Everyone plays the same set on the same UTC date. Your local midnight does not change it.";
