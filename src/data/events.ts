import { ancientEvents } from "@/data/events-ancient";
import { industryEvents } from "@/data/events-industry";
import { medievalEvents } from "@/data/events-medieval";
import { modernEvents } from "@/data/events-modern";
import { nineteenthEvents } from "@/data/events-nineteenth";
import { revolutionEvents } from "@/data/events-revolutions";
import { scienceEvents } from "@/data/events-science";
import { warEvents } from "@/data/events-war";
import type { HistoricalEvent } from "@/data/types";

export const events: HistoricalEvent[] = [
  ...ancientEvents,
  ...medievalEvents,
  ...revolutionEvents,
  ...nineteenthEvents,
  ...industryEvents,
  ...warEvents,
  ...scienceEvents,
  ...modernEvents,
];

const byId = new Map(events.map((event) => [event.id, event]));

export function getEvent(id: string): HistoricalEvent {
  const event = byId.get(id);
  if (!event) throw new Error(`Unknown event ${id}.`);
  return event;
}
