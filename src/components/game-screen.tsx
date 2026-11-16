"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { CoordinateFields } from "@/components/coordinate-fields";
import { SharePanel } from "@/components/share-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorldMap } from "@/components/world-map";
import { DAILY_RESET_SUMMARY, LOCATION_FORMULA, MAX_DAILY_SCORE, MAX_ROUND_SCORE, YEAR_FORMULA } from "@/config/rules";
import { brand } from "@/config/brand";
import { eventsForSet, getDailySet, getSet } from "@/data/sets";
import { getEvent } from "@/data/events";
import { formatUtcDateLabel, utcDateKey } from "@/lib/calendar";
import { formatKm, type LatLon } from "@/lib/geo";
import { advance, createRun, submitGuess, totalScore, type Run } from "@/lib/game";
import { loadActiveRun, memoryStorage, rememberRun, subscribeStorage } from "@/lib/storage";
import { eraMismatchNote, formatYear, parseYearInput, type Era } from "@/lib/years";

export function GameScreen({ mode, setId }: { mode: "daily" | "practice"; setId?: string }) {
  const snapshot = useSyncExternalStore(
    subscribeStorage,
    () => readGameSnapshot(mode, setId),
    () => "",
  );
  const derived = useMemo(() => runFromSnapshot(snapshot, mode), [snapshot, mode]);
  const [fallback, setFallback] = useState<Run | null>(null);
  const run = fallback ?? derived.run;
  const [storageWarning, setStorageWarning] = useState(false);
  const [latText, setLatText] = useState("");
  const [lonText, setLonText] = useState("");
  const [yearText, setYearText] = useState("");
  const [era, setEra] = useState<Era>("AD");
  const [formError, setFormError] = useState<string | null>(null);
  const [reviewIndex, setReviewIndex] = useState(4);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const locking = useRef(false);
  const revealRef = useRef<HTMLHeadingElement>(null);
  const phaseKey = run ? `${run.activeIndex}:${run.rounds[run.activeIndex]?.phase ?? "none"}` : "";

  useEffect(() => {
    if (phaseKey.includes(":reveal")) revealRef.current?.focus();
  }, [phaseKey]);

  if (!snapshot) {
    return <p className="text-muted-foreground">Opening the set…</p>;
  }
  if (derived.missing || !run) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-4xl">That practice set is not in this prototype.</h1>
        <Link href="/practice" className="text-primary underline-offset-4 hover:underline">
          Back to practice sets
        </Link>
      </div>
    );
  }

  const set = getSet(run.setId);
  const events = set ? eventsForSet(set) : [];
  const active = run.rounds[run.activeIndex];
  const activeEvent = active ? getEvent(active.eventId) : null;

  function persist(next: Run) {
    if (rememberRun(next)) setFallback(null);
    else {
      setFallback(next);
      setStorageWarning(true);
    }
  }

  function clearGuessForm() {
    setLatText("");
    setLonText("");
    setYearText("");
    setEra("AD");
    setFormError(null);
    locking.current = false;
  }

  function onPin(pin: LatLon) {
    setLatText(pin.lat.toFixed(4));
    setLonText(pin.lon.toFixed(4));
    setFormError(null);
  }

  function lockGuess(event: React.FormEvent) {
    event.preventDefault();
    if (locking.current || !run || !active || !activeEvent || active.phase !== "guess") return;
    const year = parseYearInput(yearText);
    const latitude = Number(latText);
    const longitude = Number(lonText);
    if (!latText.trim() || !lonText.trim() || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      setFormError("Place a pin on the map, or enter a latitude and a longitude.");
      return;
    }
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      setFormError("Latitude must be between −90 and 90, and longitude between −180 and 180.");
      return;
    }
    if (!year.ok) {
      setFormError(year.message);
      return;
    }
    locking.current = true;
    const outcome = submitGuess(
      run,
      { lat: latitude, lon: longitude, year: year.year, era },
      activeEvent,
    );
    if (!outcome.accepted) {
      locking.current = false;
      return;
    }
    persist(outcome.run);
  }

  function nextRound() {
    if (!run) return;
    const outcome = advance(run);
    if (outcome === run) return;
    clearGuessForm();
    persist(outcome);
    if (outcome.status === "complete") setReviewIndex(outcome.rounds.length - 1);
  }

  function restartPractice() {
    if (!run || run.mode !== "practice" || !set) return;
    const fresh = createRun({
      mode: "practice",
      setId: set.id,
      utcDate: utcDateKey(new Date()),
      eventIds: [...set.eventIds],
    });
    clearGuessForm();
    persist(fresh);
    setConfirmRestart(false);
  }

  const draftPin =
    latText.trim() && lonText.trim() && Number.isFinite(Number(latText)) && Number.isFinite(Number(lonText))
      ? { lat: Number(latText), lon: Number(lonText) }
      : null;

  return (
    <div className="min-w-0 space-y-6">
      <header className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {run.mode === "daily" ? "Daily set" : set?.title ?? "Practice"} · {formatUtcDateLabel(run.utcDate)} UTC
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
            {run.status === "complete" ? "Your result" : `Event ${run.activeIndex + 1} of 5`}
          </h1>
          <p className="text-sm tabular-nums text-muted-foreground">
            {totalScore(run).toLocaleString("en-US")} / {MAX_DAILY_SCORE.toLocaleString("en-US")}
          </p>
        </div>
        <ol className="grid grid-cols-5 gap-1" aria-label="Round progress">
          {run.rounds.map((round, index) => (
            <li
              key={round.eventId}
              className={`h-1.5 rounded-full ${
                round.result ? "bg-primary" : index === run.activeIndex && run.status !== "complete" ? "bg-foreground" : "bg-border"
              }`}
            />
          ))}
        </ol>
        {run.mode === "practice" ? (
          <p className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
            Practice. This save is separate from the daily set. {DAILY_RESET_SUMMARY}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">{DAILY_RESET_SUMMARY}</p>
        )}
        {storageWarning ? (
          <p className="text-sm text-destructive" role="status">
            This browser did not store the guess. You can finish the session, but a reload may start it over.
          </p>
        ) : null}
      </header>

      {run.status === "complete" ? (
        <Results
          run={run}
          events={events}
          reviewIndex={reviewIndex}
          onReview={setReviewIndex}
          onRestart={run.mode === "practice" ? () => setConfirmRestart(true) : undefined}
          confirmRestart={confirmRestart}
          onConfirmRestart={restartPractice}
          onCancelRestart={() => setConfirmRestart(false)}
        />
      ) : active && activeEvent ? (
        <section className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
          <WorldMap
            pin={active.phase === "reveal" ? active.guess : draftPin}
            answer={active.phase === "reveal" ? { lat: activeEvent.lat, lon: activeEvent.lon } : null}
            onPin={onPin}
            interactive={active.phase === "guess"}
          />
          <div className="min-w-0 space-y-5">
            {active.phase === "guess" ? (
              <>
                <h2 ref={revealRef} tabIndex={-1} className="font-display text-3xl leading-tight text-foreground outline-none">
                  {activeEvent.prompt}
                </h2>
                <form className="space-y-4" onSubmit={lockGuess}>
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium">Year</legend>
                    <p id="year-help" className="text-sm text-muted-foreground">
                      Years run … 2 BC, 1 BC, 1 AD, 2 AD … There is no year zero.
                    </p>
                    <div className="flex min-w-0 gap-2">
                      <Input
                        id="year"
                        data-testid="year-input"
                        inputMode="numeric"
                        autoComplete="off"
                        aria-describedby="year-help"
                        value={yearText}
                        onChange={(event) => {
                          setYearText(event.target.value);
                          setFormError(null);
                        }}
                        className="h-12 min-w-0 flex-1 text-lg md:text-lg"
                      />
                      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border" role="radiogroup" aria-label="Era">
                        {(["AD", "BC"] as const).map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            role="radio"
                            aria-checked={era === choice}
                            data-testid={`era-${choice.toLowerCase()}`}
                            className={`h-12 w-14 text-sm font-medium ${era === choice ? "bg-primary text-primary-foreground" : "bg-background"}`}
                            onClick={() => setEra(choice)}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                  {formError ? (
                    <p className="text-sm text-destructive" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  <Button type="submit" data-testid="submit-guess" className="h-12 w-full text-base">
                    Lock this guess
                  </Button>
                </form>
                <CoordinateFields
                  latText={latText}
                  lonText={lonText}
                  onLat={(value) => {
                    setLatText(value);
                    setFormError(null);
                  }}
                  onLon={(value) => {
                    setLonText(value);
                    setFormError(null);
                  }}
                />
              </>
            ) : active.guess && active.result ? (
              <div data-testid="reveal-panel" className="space-y-4">
                <h2 ref={revealRef} tabIndex={-1} className="font-display text-3xl leading-tight outline-none">
                  {activeEvent.title}
                </h2>
                <p className="text-lg">
                  {formatYear(activeEvent.year, activeEvent.era)} · {activeEvent.locationLabel}
                </p>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-muted-foreground">Place</dt>
                    <dd className="mt-1 text-2xl tabular-nums">{active.result.locationScore.toLocaleString("en-US")}</dd>
                    <dd className="text-muted-foreground">{formatKm(active.result.distanceKm)} away</dd>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-muted-foreground">Year</dt>
                    <dd className="mt-1 text-2xl tabular-nums">{active.result.yearScore.toLocaleString("en-US")}</dd>
                    <dd className="text-muted-foreground">
                      {active.result.yearError.toLocaleString("en-US")} {active.result.yearError === 1 ? "year" : "years"} off
                    </dd>
                  </div>
                </dl>
                <p className="text-sm leading-6 text-muted-foreground">
                  Round {active.result.totalScore.toLocaleString("en-US")} / {MAX_ROUND_SCORE.toLocaleString("en-US")}. Place score = {LOCATION_FORMULA}. Year score = {YEAR_FORMULA}.
                </p>
                {active.result.eraNote ? <p className="text-sm leading-6">{active.result.eraNote}</p> : null}
                <p className="text-base leading-7">{activeEvent.explanation}</p>
                <p className="text-sm leading-6 text-muted-foreground">{activeEvent.precisionNote}</p>
                <ul className="space-y-1 text-sm">
                  {activeEvent.sources.map((source) => (
                    <li key={source.url}>
                      <a className="underline-offset-4 hover:underline" href={source.url} target="_blank" rel="noreferrer noopener">
                        {source.title}
                      </a>
                      <span className="text-muted-foreground"> — {source.publisher}</span>
                    </li>
                  ))}
                </ul>
                <Button type="button" data-testid="next-round" className="h-12 w-full text-base" onClick={nextRound}>
                  {run.activeIndex === 4 ? "See your result" : "Next event"}
                </Button>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Results({
  run,
  events,
  reviewIndex,
  onReview,
  onRestart,
  confirmRestart,
  onConfirmRestart,
  onCancelRestart,
}: {
  run: Run;
  events: ReturnType<typeof eventsForSet>;
  reviewIndex: number;
  onReview: (index: number) => void;
  onRestart?: () => void;
  confirmRestart: boolean;
  onConfirmRestart: () => void;
  onCancelRestart: () => void;
}) {
  const event = events[reviewIndex];
  const round = run.rounds[reviewIndex];
  const note = round?.guess && event ? eraMismatchNote(round.guess, event) : null;
  return (
    <div className="min-w-0 space-y-6" data-testid="results-panel">
      <p className="font-display text-6xl tabular-nums tracking-tight">
        {totalScore(run).toLocaleString("en-US")}
        <span className="text-2xl text-muted-foreground"> / {MAX_DAILY_SCORE.toLocaleString("en-US")}</span>
      </p>
      <SharePanel run={run} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-0 text-left text-sm">
          <caption className="sr-only">Round scores</caption>
          <thead className="text-muted-foreground">
            <tr>
              <th className="py-2 pr-3 font-medium">Event</th>
              <th className="py-2 pr-3 font-medium">Place</th>
              <th className="py-2 font-medium">Year</th>
            </tr>
          </thead>
          <tbody>
            {run.rounds.map((item, index) => {
              const rowEvent = events[index];
              if (!item.result || !rowEvent) return null;
              return (
                <tr key={item.eventId} className={index === reviewIndex ? "bg-muted" : ""}>
                  <td className="py-2 pr-3">
                    <button type="button" className="text-left underline-offset-4 hover:underline" onClick={() => onReview(index)}>
                      {rowEvent.title}
                    </button>
                  </td>
                  <td className="py-2 pr-3 tabular-nums">{item.result.locationScore.toLocaleString("en-US")}</td>
                  <td className="py-2 tabular-nums">{item.result.yearScore.toLocaleString("en-US")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {event && round?.guess ? (
        <div className="space-y-3">
          <h2 className="font-display text-3xl">{event.title}</h2>
          <p>
            {formatYear(event.year, event.era)} · {event.locationLabel}
          </p>
          <WorldMap pin={round.guess} answer={{ lat: event.lat, lon: event.lon }} interactive={false} />
          {note ? <p className="text-sm leading-6">{note}</p> : null}
          <p className="text-sm leading-6 text-muted-foreground">{event.precisionNote}</p>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="h-11" asChild>
          <Link href="/">Back home</Link>
        </Button>
        {onRestart ? (
          confirmRestart ? (
            <>
              <Button type="button" variant="destructive" className="h-11" onClick={onConfirmRestart}>
                Erase this practice save
              </Button>
              <Button type="button" variant="outline" className="h-11" onClick={onCancelRestart}>
                Keep it
              </Button>
            </>
          ) : (
            <Button type="button" variant="outline" className="h-11" onClick={onRestart}>
              Restart this practice set
            </Button>
          )
        ) : (
          <p className="self-center text-sm text-muted-foreground">The daily set can be played once on this device.</p>
        )}
      </div>
    </div>
  );
}

function readGameSnapshot(mode: "daily" | "practice", setId?: string): string {
  const date = new Date();
  const utc = utcDateKey(date);
  const storage = window.localStorage.getItem(brand.storageKey) ?? "";
  if (mode === "daily") {
    const set = getDailySet(date);
    return JSON.stringify({ missing: false, utc, setId: set.id, eventIds: set.eventIds, storage });
  }
  const set = setId ? getSet(setId) : undefined;
  if (!set) return JSON.stringify({ missing: true });
  return JSON.stringify({ missing: false, utc, setId: set.id, eventIds: set.eventIds, storage });
}

function runFromSnapshot(snapshot: string, mode: "daily" | "practice"): { missing: boolean; run: Run | null } {
  if (!snapshot) return { missing: false, run: null };
  const parsed = JSON.parse(snapshot) as {
    missing?: boolean;
    utc?: string;
    setId?: string;
    eventIds?: string[];
    storage?: string;
  };
  if (parsed.missing || !parsed.utc || !parsed.setId || !parsed.eventIds) {
    return { missing: true, run: null };
  }
  const existing = parsed.storage
    ? loadActiveRun(memoryStorage(parsed.storage), {
        mode,
        utcDate: parsed.utc,
        setId: parsed.setId,
        eventIds: parsed.eventIds,
      })
    : null;
  return {
    missing: false,
    run:
      existing ??
      createRun({
        mode,
        setId: parsed.setId,
        utcDate: parsed.utc,
        eventIds: parsed.eventIds,
      }),
  };
}
