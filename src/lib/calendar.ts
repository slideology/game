import { EPOCH_UTC } from "@/config/rules";

const DAY_MS = 86_400_000;

export function utcDateKey(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Whole UTC midnights from `fromKey` to `toKey`. Negative if `toKey` is earlier. */
export function utcDaysBetween(fromKey: string, toKey: string): number {
  const from = utcMidnight(fromKey);
  const to = utcMidnight(toKey);
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

/**
 * Index of the daily set. Counts UTC midnights since 1 January 2026,
 * then wraps with a modulo that stays non-negative before the epoch.
 */
export function puzzleIndex(date: Date, setCount: number): number {
  if (!Number.isInteger(setCount) || setCount < 1) {
    throw new Error("Set count must be a positive integer.");
  }
  const days = utcDaysBetween(EPOCH_UTC, utcDateKey(date));
  return ((days % setCount) + setCount) % setCount;
}

export function formatUtcDateLabel(utcDate: string): string {
  const date = utcMidnight(utcDate);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatUtcClock(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}

export function msUntilNextUtcMidnight(date: Date): number {
  const next = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1,
  );
  return Math.max(0, next - date.getTime());
}

export function formatCountdown(ms: number): string {
  const totalMinutes = Math.ceil(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function utcMidnight(utcDate: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(utcDate);
  if (!match) throw new Error(`Expected a UTC date YYYY-MM-DD, received ${utcDate}.`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(`Invalid UTC date ${utcDate}.`);
  }
  return date;
}
