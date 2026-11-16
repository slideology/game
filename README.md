# Meridian

Meridian is a daily history game. Each set has five original events. You place a pin and name the year. The score uses a published formula. Nothing here is affiliated with Chartered or playchartered.com.

The brand name, tagline, and disclaimer live in `src/config/brand.ts`.

## Run it locally

```bash
npm install
npm run dev
```

The dev server listens on port **4319**. Open `http://127.0.0.1:4319` on the machine running it. That address is local to the machine. It is not a public URL.

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

`npm run build` writes a static site to `out/`. Serve that folder with any static file server, for example:

```bash
npx serve out -p 4319
```

Opening the HTML files directly from disk will not load the map or the scripts correctly. Use a static server. A clean install from the lockfile is `npm ci`, then `npm run build`.

Do not deploy this prototype until the user confirms that deployment separately. This package is source for handoff only.

## Daily clock

The set changes at **00:00 Coordinated Universal Time**. That is **08:00 Beijing time** (China Standard Time, UTC+8, no daylight saving). Every client that agrees on UTC time plays the same set. Local midnight does not change it.

The rotation counts UTC midnights since **1 January 2026**, then wraps through **8 sets**. That date is set 1. The rule is in `src/config/rules.ts` and `src/lib/calendar.ts`, and it is explained on the Scoring page.

This prototype sends `noindex` and `public/robots.txt` disallows all crawlers. Keep both unless a later, confirmed deployment decides otherwise.

## Scoring

Each round is worth up to 5,000 points: 2,500 for place and 2,500 for the year.

- Place: `round(2500 × e^(−kilometers / 1200))`, great-circle distance, Earth radius 6,371.0088 km.
- Year: `round(2500 × e^(−years off / 30))`.
- 1 BC is the year before 1 AD. There is no year zero.

A finished set is worth up to 25,000. The share text and image show only the total and close / near / far bands. They do not include event names, places, or years.

## Map

Coastlines are Natural Earth 1:50 million, public domain, stored in `public/geo/countries-50m.json` (TopoJSON prepared by the ISC-licensed `world-atlas` package). The page draws that file. It does not request map tiles. Attribution is under the map: “Made with Natural Earth.”

If the drawing fails, enter a latitude and longitude, or start from a city in the short list. Arrow keys move the pin. See `docs/LICENSES.md`.

## Tests

Unit tests cover distance, BC/AD conversion, scoring bounds, UTC rotation, save/reload, a repeated submit, and share text that does not leak answers. They do not call a live map service.

## Limits

- Eight hand-written sets, then the rotation repeats.
- Progress is in this browser only (`localStorage` key `meridian.v1`). There are no accounts, payments, ads, or analytics.
- Pages send `noindex`, and `robots.txt` disallows crawling. Leave that in place for this prototype.
- Deployment is not part of this package. Deploy only after a separate user confirmation.
- Some events are larger than a point. The answer says what the coordinate marks.
- The coastlines are generalized. The score uses your latitude and longitude.
- Arrow keys stop at 85° north and south. Typed coordinates may be ±90.
- This is a prototype. It is not deployed, and it is not a navigation map.
