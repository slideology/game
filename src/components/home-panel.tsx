"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { brand } from "@/config/brand";
import { DAILY_RESET_SUMMARY } from "@/config/rules";
import { getDailySet } from "@/data/sets";
import { formatUtcDateLabel, utcDateKey } from "@/lib/calendar";
import { loadActiveRun, memoryStorage, subscribeStorage } from "@/lib/storage";

interface HomeSnapshot {
  dateLabel: string;
  setNumber: number;
  label: string;
}

export function HomePanel() {
  const raw = useSyncExternalStore(subscribeStorage, readHomeSnapshot, () => "");
  const snapshot: HomeSnapshot | null = raw ? (JSON.parse(raw) as HomeSnapshot) : null;

  return (
    <div className="max-w-3xl space-y-6">
      <p className="text-sm tracking-wide text-muted-foreground uppercase">{brand.tagline}</p>
      <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl">
        Five events. A point on the map. A year.
      </h1>
      <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
        {snapshot ? `${snapshot.dateLabel} UTC · rotation ${snapshot.setNumber} of 8. ` : "The daily set follows Coordinated Universal Time. "}
        Pin where each event happened, then name the year. The score is a published formula, and the answer tells you what the coordinate actually marks.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button className="h-12 px-5 text-base" asChild>
          <Link href="/play">{snapshot?.label ?? "Play today's set"}</Link>
        </Button>
        <Button variant="outline" className="h-12 px-5 text-base" asChild>
          <Link href="/practice">Practice a set</Link>
        </Button>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{DAILY_RESET_SUMMARY}</p>
    </div>
  );
}

function readHomeSnapshot(): string {
  const date = new Date();
  const set = getDailySet(date);
  const utc = utcDateKey(date);
  const storage = window.localStorage.getItem(brand.storageKey) ?? "";
  const run = storage
    ? loadActiveRun(memoryStorage(storage), {
        mode: "daily",
        utcDate: utc,
        setId: set.id,
        eventIds: set.eventIds,
      })
    : null;
  let label = "Play today's set";
  if (run?.status === "complete") label = "See today's result";
  else if (run && !(run.activeIndex === 0 && run.rounds[0]?.phase === "guess")) label = "Continue today's set";
  return JSON.stringify({
    dateLabel: formatUtcDateLabel(utc),
    setNumber: Number(set.id.slice(-2)),
    label,
  });
}
