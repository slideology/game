import { getEvent } from "@/data/events";
import type { HistoricalEvent } from "@/data/types";
import { puzzleIndex } from "@/lib/calendar";

export interface DailySet {
  id: string;
  title: string;
  eventIds: readonly [string, string, string, string, string];
}

export const dailySets: DailySet[] = [
  {
    id: "set-01",
    title: "Practice set 1",
    eventIds: ["caesar", "thermopylae", "actium", "carthage", "marathon"],
  },
  {
    id: "set-02",
    title: "Practice set 2",
    eventIds: ["magna-carta", "pompeii", "constantinople", "hastings", "nicaea"],
  },
  {
    id: "set-03",
    title: "Practice set 3",
    eventIds: ["bastille", "waterloo", "rosetta-stone", "haiti-independence", "tiananmen-proclamation"],
  },
  {
    id: "set-04",
    title: "Practice set 4",
    eventIds: ["waitangi", "seneca-falls", "puebla", "golden-spike", "charter-oath"],
  },
  {
    id: "set-05",
    title: "Practice set 5",
    eventIds: ["sutters-mill", "eiffel-tower", "athens-1896", "wright-flyer", "jallianwala-bagh"],
  },
  {
    id: "set-06",
    title: "Practice set 6",
    eventIds: ["adwa", "franz-ferdinand", "easter-rising", "winter-palace", "compiegne-armistice"],
  },
  {
    id: "set-07",
    title: "Practice set 7",
    eventIds: ["tutankhamun-tomb", "penicillin", "double-helix", "sputnik-1", "heart-transplant"],
  },
  {
    id: "set-08",
    title: "Practice set 8",
    eventIds: ["march-on-washington", "apollo-11-launch", "independence-palace", "chernobyl-reactor", "bornholmer-strasse"],
  },
];

export function getSet(id: string): DailySet | undefined {
  return dailySets.find((set) => set.id === id);
}

export function eventsForSet(set: DailySet): HistoricalEvent[] {
  return set.eventIds.map((id) => getEvent(id));
}

export function getDailySet(date: Date): DailySet {
  const set = dailySets[puzzleIndex(date, dailySets.length)];
  if (!set) throw new Error("The daily rotation did not select a set.");
  return set;
}
