import type { Metadata } from "next";
import Link from "next/link";
import { CLOSE_RATIO, DAILY_RESET_SUMMARY, EPOCH_UTC, LOCATION_DECAY_KM, LOCATION_FORMULA, MAX_DAILY_SCORE, MAX_LOCATION_SCORE, MAX_ROUND_SCORE, MAX_YEAR_SCORE, NEAR_RATIO, YEAR_DECAY_YEARS, YEAR_FORMULA } from "@/config/rules";
import { distanceForRatio, locationScore, yearScore, yearsForRatio } from "@/lib/score";

export const metadata: Metadata = {
  title: "Scoring",
  robots: { index: false, follow: false },
};

const distances = [0, 10, 100, 500, 1500, 8000];
const years = [0, 1, 5, 10, 25, 50, 100];

export default function ScoringPage() {
  const closeKm = Math.round(distanceForRatio(CLOSE_RATIO));
  const nearKm = Math.round(distanceForRatio(NEAR_RATIO));
  const closeYears = Math.round(yearsForRatio(CLOSE_RATIO));
  const nearYears = Math.round(yearsForRatio(NEAR_RATIO));

  return (
    <article className="max-w-3xl space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-5xl tracking-tight">How a score is made</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Every event uses the same formula. A round is worth up to {MAX_ROUND_SCORE.toLocaleString("en-US")} points, and a full set up to {MAX_DAILY_SCORE.toLocaleString("en-US")}.
        </p>
      </header>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">Place</h2>
        <p>
          Distance is the great-circle distance on a sphere of radius 6,371.0088 km. Place score = {LOCATION_FORMULA}. The decay distance is {LOCATION_DECAY_KM.toLocaleString("en-US")} km.
        </p>
        <ScoreTable
          caption="Place scores at sample distances"
          heading="Distance"
          rows={distances.map((km) => [`${km.toLocaleString("en-US")} km`, locationScore(km).toLocaleString("en-US")])}
        />
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">Year</h2>
        <p>
          Year score = {YEAR_FORMULA}. The decay is {YEAR_DECAY_YEARS} years. 1 BC is the year immediately before 1 AD. Guessing 490 AD for an event in 490 BC is 979 years off, not a bullseye.
        </p>
        <ScoreTable
          caption="Year scores at sample errors"
          heading="Years off"
          rows={years.map((year) => [year.toLocaleString("en-US"), yearScore(year).toLocaleString("en-US")])}
        />
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">Share bands</h2>
        <p>
          The share card does not show kilometers or years. Close means at least {Math.round(CLOSE_RATIO * 100)}% of that half&apos;s {MAX_LOCATION_SCORE.toLocaleString("en-US")} or {MAX_YEAR_SCORE.toLocaleString("en-US")} points: about {closeKm.toLocaleString("en-US")} km, or about {closeYears} years. Near means at least {Math.round(NEAR_RATIO * 100)}%: about {nearKm.toLocaleString("en-US")} km, or about {nearYears} years. Anything lower is far. The band follows the score, so the rounded cutoffs above are guides.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">When the set changes</h2>
        <p>{DAILY_RESET_SUMMARY}</p>
        <p>
          The rotation counts UTC midnights since {EPOCH_UTC}, then wraps through the eight sets. 1 January 2026 UTC is set 1. A clock in New York that still says 31 December can already be on the next set if UTC has passed midnight.
        </p>
        <p>
          <Link href="/about" className="underline-offset-4 hover:underline">
            Read the limits and the map credit
          </Link>
          .
        </p>
      </section>
    </article>
  );
}

function ScoreTable({ caption, heading, rows }: { caption: string; heading: string; rows: string[][] }) {
  return (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead className="text-muted-foreground">
        <tr>
          <th className="py-2 font-medium">{heading}</th>
          <th className="py-2 font-medium">Points</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-t border-border">
            <td className="py-2 tabular-nums">{row[0]}</td>
            <td className="py-2 tabular-nums">{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
