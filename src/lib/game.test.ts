import { describe, expect, it } from "vitest";
import { advance, createRun, scoreGuess, submitGuess, totalScore, type AnsweredEvent, type Guess } from "@/lib/game";
import { loadActiveRun, memoryStorage, saveRun } from "@/lib/storage";

const events: AnsweredEvent[] = [
  { id: "alpha", lat: 41.9, lon: 12.5, year: 44, era: "BC" },
  { id: "beta", lat: 51.5, lon: -0.12, year: 1215, era: "AD" },
  { id: "gamma", lat: 35.69, lon: 139.69, year: 1868, era: "AD" },
  { id: "delta", lat: -33.94, lon: 18.46, year: 1967, era: "AD" },
  { id: "epsilon", lat: 52.55, lon: 13.4, year: 1989, era: "AD" },
];

const ids = events.map((event) => event.id);

function guessFor(event: AnsweredEvent, drift = 0): Guess {
  return {
    lat: event.lat + drift,
    lon: event.lon,
    year: event.year,
    era: event.era,
  };
}

describe("persistence and repeat submit", () => {
  it("saves a locked guess and restores it unchanged", () => {
    const storage = memoryStorage();
    const started = createRun({
      mode: "daily",
      setId: "set-01",
      utcDate: "2026-11-16",
      eventIds: ids,
    });
    const locked = submitGuess(started, guessFor(events[0], 0.2), events[0]);
    expect(locked.accepted).toBe(true);
    expect(saveRun(storage, locked.run)).toBe(true);

    const loaded = loadActiveRun(storage, {
      mode: "daily",
      utcDate: "2026-11-16",
      setId: "set-01",
      eventIds: ids,
    });
    expect(loaded).toEqual(locked.run);
    expect(loaded?.rounds[0]?.phase).toBe("reveal");
    expect(loaded?.rounds[0]?.guess?.year).toBe(44);
  });

  it("ignores a second submit and keeps the first guess", () => {
    const started = createRun({
      mode: "practice",
      setId: "set-01",
      utcDate: "2026-11-16",
      eventIds: ids,
    });
    const first = submitGuess(started, guessFor(events[0]), events[0]);
    const second = submitGuess(
      first.run,
      { ...guessFor(events[0]), year: 1, era: "AD", lat: 0, lon: 0 },
      events[0],
    );
    expect(second.accepted).toBe(false);
    expect(second.run).toBe(first.run);
    expect(second.run.rounds[0]?.guess).toEqual(guessFor(events[0]));
    expect(totalScore(second.run)).toBe(totalScore(first.run));
  });

  it("does not advance twice from the same reveal", () => {
    const started = createRun({
      mode: "daily",
      setId: "set-01",
      utcDate: "2026-11-16",
      eventIds: ids,
    });
    const locked = submitGuess(started, guessFor(events[0]), events[0]);
    const next = advance(locked.run);
    const again = advance(next);
    expect(next.activeIndex).toBe(1);
    expect(again).toBe(next);
  });

  it("keeps daily and practice saves apart, and drops a stale daily date", () => {
    const storage = memoryStorage();
    const daily = createRun({
      mode: "daily",
      setId: "set-01",
      utcDate: "2026-11-16",
      eventIds: ids,
    });
    const practice = createRun({
      mode: "practice",
      setId: "set-01",
      utcDate: "2026-11-16",
      eventIds: ids,
    });
    saveRun(storage, daily);
    saveRun(storage, practice);

    expect(
      loadActiveRun(storage, {
        mode: "daily",
        utcDate: "2026-11-17",
        setId: "set-02",
        eventIds: ids,
      }),
    ).toBeNull();
    expect(
      loadActiveRun(storage, {
        mode: "practice",
        utcDate: "2026-11-17",
        setId: "set-01",
        eventIds: ids,
      })?.mode,
    ).toBe("practice");
  });

  it("discards a saved run whose event order no longer matches", () => {
    const storage = memoryStorage();
    const run = createRun({
      mode: "daily",
      setId: "set-01",
      utcDate: "2026-11-16",
      eventIds: ids,
    });
    saveRun(storage, run);
    expect(
      loadActiveRun(storage, {
        mode: "daily",
        utcDate: "2026-11-16",
        setId: "set-01",
        eventIds: [...ids].reverse(),
      }),
    ).toBeNull();
  });

  it("returns null for corrupt or foreign storage payloads", () => {
    expect(
      loadActiveRun(memoryStorage("{"), {
        mode: "daily",
        utcDate: "2026-11-16",
        setId: "set-01",
        eventIds: ids,
      }),
    ).toBeNull();
    expect(
      loadActiveRun(memoryStorage(JSON.stringify({ version: 2 })), {
        mode: "daily",
        utcDate: "2026-11-16",
        setId: "set-01",
        eventIds: ids,
      }),
    ).toBeNull();
  });

  it("reports a failed write without throwing", () => {
    const storage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("quota");
      },
    };
    const run = createRun({
      mode: "daily",
      setId: "set-01",
      utcDate: "2026-11-16",
      eventIds: ids,
    });
    expect(saveRun(storage, run)).toBe(false);
  });

  it("finishes at the maximum when every guess is exact", () => {
    let run = createRun({
      mode: "daily",
      setId: "set-01",
      utcDate: "2026-11-16",
      eventIds: ids,
    });
    for (const event of events) {
      const locked = submitGuess(run, guessFor(event), event);
      expect(locked.accepted).toBe(true);
      expect(locked.run.rounds[run.activeIndex]?.result?.totalScore).toBe(5000);
      run = advance(locked.run);
    }
    expect(run.status).toBe("complete");
    expect(totalScore(run)).toBe(25_000);
    expect(scoreGuess(guessFor(events[0]), events[0]).distanceKm).toBe(0);
  });
});
