import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { events } from "@/data/events";
import { dailySets, eventsForSet, getDailySet } from "@/data/sets";
import { places } from "@/data/places";
import { advance, createRun, submitGuess, type Guess } from "@/lib/game";
import { buildShareModel, drawShareCard, shareCardLines, sharePalette, shareText, type ShareDrawContext } from "@/lib/share";

describe("event bank", () => {
  it("has eight sets of five original events, each used once", () => {
    expect(dailySets).toHaveLength(8);
    const seen = new Set<string>();
    for (const set of dailySets) {
      expect(set.eventIds).toHaveLength(5);
      for (const id of set.eventIds) {
        expect(seen.has(id)).toBe(false);
        seen.add(id);
      }
      const resolved = eventsForSet(set);
      const years = new Set(resolved.map((event) => `${event.year}-${event.era}`));
      expect(years.size).toBe(5);
    }
    expect(seen.size).toBe(events.length);
  });

  it("keeps prompts free of the answer's place, title, and year", () => {
    for (const event of events) {
      expect(event.prompt.toLowerCase()).not.toContain(event.title.toLowerCase());
      expect(event.prompt.toLowerCase()).not.toContain(event.locationLabel.toLowerCase());
      expect(event.prompt).not.toMatch(new RegExp(`\\b${event.year}\\b`));
      expect(event.explanation.length).toBeGreaterThan(80);
      expect(event.precisionNote.length).toBeGreaterThan(40);
      expect(event.sources.length).toBeGreaterThanOrEqual(2);
      for (const source of event.sources) {
        expect(source.url.startsWith("https://")).toBe(true);
        expect(source.publisher.length).toBeGreaterThan(2);
        expect(source.title.length).toBeGreaterThan(2);
      }
      expect(event.lat).toBeGreaterThanOrEqual(-90);
      expect(event.lat).toBeLessThanOrEqual(90);
      expect(event.lon).toBeGreaterThanOrEqual(-180);
      expect(event.lon).toBeLessThanOrEqual(180);
      for (const term of event.hiddenTerms) {
        const pattern = new RegExp(`\\b${escapeRegExp(term)}\\b`, "i");
        expect(event.prompt, `${event.id} leaks ${term}`).not.toMatch(pattern);
      }
    }
  });

  it("rotates the real bank from the UTC date", () => {
    expect(getDailySet(new Date("2026-01-01T12:00:00Z")).id).toBe("set-01");
    expect(getDailySet(new Date("2026-01-08T12:00:00Z")).id).toBe("set-08");
    expect(getDailySet(new Date("2026-11-16T15:00:00Z")).id).toBe("set-08");
  });

  it("offers a global city list with usable coordinates", () => {
    expect(places.length).toBeGreaterThan(80);
    const ids = new Set<string>();
    for (const place of places) {
      expect(ids.has(place.id)).toBe(false);
      ids.add(place.id);
      expect(place.lat).toBeGreaterThanOrEqual(-90);
      expect(place.lat).toBeLessThanOrEqual(90);
      expect(place.lon).toBeGreaterThanOrEqual(-180);
      expect(place.lon).toBeLessThanOrEqual(180);
    }
  });
});

describe("share output", () => {
  it("omits answers from the text and from the card drawing", () => {
    const set = dailySets[0];
    if (!set) throw new Error("missing set");
    const answered = eventsForSet(set);
    let run = createRun({
      mode: "daily",
      setId: set.id,
      utcDate: "2026-11-16",
      eventIds: set.eventIds,
    });
    for (const event of answered) {
      const guess: Guess = { lat: 10, lon: 10, year: 1, era: "AD" };
      const locked = submitGuess(run, guess, event);
      run = advance(locked.run);
    }
    const model = buildShareModel(run);
    const text = shareText(model);
    const painted = paintedStrings(model);
    const allowed = shareCardLines(model).join("\n");
    for (const snippet of painted) {
      expect(allowed).toContain(snippet);
    }
    for (const event of events) {
      expect(text).not.toContain(event.title);
      expect(text).not.toContain(event.locationLabel);
      expect(text).not.toContain(event.id);
      expect(painted.join("\n")).not.toContain(event.title);
      expect(painted.join("\n")).not.toContain(event.locationLabel);
    }
    expect(text).not.toMatch(/\bBC\b/);
    expect(text).not.toMatch(/\bAD\b/);
    expect(text).not.toContain("°");
    expect(text).not.toContain(" km");
    expect(text).toContain("Bands only");
    expect(model.rows).toHaveLength(5);
  });
});

describe("local map file", () => {
  it("is a bundled Natural Earth topology and not a tile endpoint", () => {
    const raw = readFileSync("public/geo/countries-50m.json", "utf8");
    const topo = JSON.parse(raw) as { type?: string; objects?: { countries?: unknown } };
    expect(topo.type).toBe("Topology");
    expect(topo.objects?.countries).toBeTruthy();
    expect(raw).not.toMatch(/openstreetmap|openfreemap|cartocdn|mapbox|googleapis/i);
    const source = readFileSync("src/components/world-map.tsx", "utf8");
    expect(source).not.toMatch(/openstreetmap|openfreemap|cartocdn|mapbox\.com|tile\.openstreetmap/i);
    expect(source).toContain("/geo/countries-50m.json");
  });
});

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function paintedStrings(model: ReturnType<typeof buildShareModel>): string[] {
  const painted: string[] = [];
  const ctx = {
    canvas: { width: 900, height: 1200 },
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    font: "",
    textAlign: "left" as CanvasTextAlign,
    textBaseline: "top" as CanvasTextBaseline,
    fillRect() {},
    strokeRect() {},
    fillText(text: string) {
      painted.push(text);
    },
    beginPath() {},
    arc() {},
    fill() {},
    stroke() {},
    moveTo() {},
    lineTo() {},
  } satisfies ShareDrawContext;
  drawShareCard(ctx, model, sharePalette("light"));
  return painted;
}
