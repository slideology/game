"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { brand } from "@/config/brand";
import { dailySets } from "@/data/sets";
import { utcDateKey } from "@/lib/calendar";
import { loadActiveRun, memoryStorage, subscribeStorage } from "@/lib/storage";

export function PracticeIndex() {
  const raw = useSyncExternalStore(subscribeStorage, readPracticeSnapshot, () => "");
  const status = raw ? (JSON.parse(raw) as Record<string, string>) : {};

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {dailySets.map((set) => (
        <li key={set.id}>
          <Link
            href={`/practice/${set.id}`}
            className="block min-w-0 rounded-xl border border-border bg-card p-4 hover:bg-muted"
          >
            <span className="font-display text-2xl">{set.title}</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              Five events. {status[set.id] ?? "Checking this device…"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function readPracticeSnapshot(): string {
  const utc = utcDateKey(new Date());
  const storage = window.localStorage.getItem(brand.storageKey) ?? "";
  const store = memoryStorage(storage || undefined);
  const status: Record<string, string> = {};
  for (const set of dailySets) {
    const run = storage
      ? loadActiveRun(store, {
          mode: "practice",
          utcDate: utc,
          setId: set.id,
          eventIds: set.eventIds,
        })
      : null;
    if (!run || (run.activeIndex === 0 && run.rounds[0]?.phase === "guess")) status[set.id] = "Not started";
    else if (run.status === "complete") status[set.id] = "Finished on this device";
    else status[set.id] = `In progress, event ${run.activeIndex + 1} of 5`;
  }
  return JSON.stringify(status);
}
