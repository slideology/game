import { MAX_DAILY_SCORE, MAX_LOCATION_SCORE, MAX_YEAR_SCORE } from "@/config/rules";
import { haversineKm, type LatLon } from "@/lib/geo";
import { locationScore, scoreBand, yearScore, type ScoreBand } from "@/lib/score";
import { eraMismatchNote, yearGap, type Era } from "@/lib/years";

export interface Guess extends LatLon {
  year: number;
  era: Era;
}

export interface AnsweredEvent {
  id: string;
  lat: number;
  lon: number;
  year: number;
  era: Era;
}

export interface RoundResult {
  distanceKm: number;
  yearError: number;
  locationScore: number;
  yearScore: number;
  totalScore: number;
  locationBand: ScoreBand;
  yearBand: ScoreBand;
  eraNote: string | null;
}

export interface RoundState {
  eventId: string;
  phase: "guess" | "reveal";
  guess: Guess | null;
  result: RoundResult | null;
}

export interface Run {
  version: 1;
  mode: "daily" | "practice";
  setId: string;
  /** UTC date the run was started. Daily runs must match today's UTC date. */
  utcDate: string;
  status: "in_progress" | "complete";
  rounds: RoundState[];
  activeIndex: number;
}

export function createRun(input: {
  mode: Run["mode"];
  setId: string;
  utcDate: string;
  eventIds: readonly string[];
}): Run {
  if (input.eventIds.length !== 5) {
    throw new Error("A set must contain exactly 5 events.");
  }
  return {
    version: 1,
    mode: input.mode,
    setId: input.setId,
    utcDate: input.utcDate,
    status: "in_progress",
    activeIndex: 0,
    rounds: input.eventIds.map((eventId) => ({
      eventId,
      phase: "guess",
      guess: null,
      result: null,
    })),
  };
}

export function scoreGuess(guess: Guess, answer: AnsweredEvent): RoundResult {
  const distanceKm = haversineKm(guess, answer);
  const yearError = yearGap(guess, answer);
  const place = locationScore(distanceKm);
  const year = yearScore(yearError);
  return {
    distanceKm,
    yearError,
    locationScore: place,
    yearScore: year,
    totalScore: place + year,
    locationBand: scoreBand(place, MAX_LOCATION_SCORE),
    yearBand: scoreBand(year, MAX_YEAR_SCORE),
    eraNote: eraMismatchNote(guess, answer),
  };
}

export function submitGuess(
  run: Run,
  guess: Guess,
  answer: AnsweredEvent,
): { run: Run; accepted: boolean } {
  if (run.status !== "in_progress") return { run, accepted: false };
  const current = run.rounds[run.activeIndex];
  if (!current || current.phase !== "guess" || current.guess || current.result) {
    return { run, accepted: false };
  }
  if (current.eventId !== answer.id) {
    throw new Error("The answer does not match the current round.");
  }
  const result = scoreGuess(guess, answer);
  const rounds = run.rounds.map((round, index) =>
    index === run.activeIndex
      ? { ...round, phase: "reveal" as const, guess, result }
      : round,
  );
  return { run: { ...run, rounds }, accepted: true };
}

export function advance(run: Run): Run {
  if (run.status !== "in_progress") return run;
  const current = run.rounds[run.activeIndex];
  if (!current || current.phase !== "reveal") return run;
  if (run.activeIndex >= run.rounds.length - 1) {
    return { ...run, status: "complete" };
  }
  return { ...run, activeIndex: run.activeIndex + 1 };
}

export function totalScore(run: Run): number {
  return run.rounds.reduce((sum, round) => sum + (round.result?.totalScore ?? 0), 0);
}

export function isComplete(run: Run): boolean {
  return run.status === "complete" && run.rounds.every((round) => round.result);
}

export function maxDailyScore(): number {
  return MAX_DAILY_SCORE;
}
