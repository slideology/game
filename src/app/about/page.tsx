import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/config/brand";
import { DAILY_RESET_SUMMARY, EPOCH_UTC } from "@/config/rules";

export const metadata: Metadata = {
  title: "About",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl space-y-8 text-base leading-7">
      <header className="space-y-3">
        <h1 className="font-display text-5xl tracking-tight">About this prototype</h1>
        <p className="text-lg text-muted-foreground">{brand.disclaimer}</p>
      </header>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">Daily clock</h2>
        <p>{DAILY_RESET_SUMMARY}</p>
        <p>
          The first set in the rotation is tied to {EPOCH_UTC} UTC. The rule is in the client, so two browsers that agree on UTC time play the same set without asking a server.{" "}
          <Link href="/scoring" className="underline-offset-4 hover:underline">
            The scoring page
          </Link>{" "}
          shows the formula and sample values.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">What the pin means</h2>
        <p>
          Each event is a dated episode with a conventional point: a building, a launch pad, a tomb entrance, a battlefield monument, or a city where a proclamation was made. Where the episode was larger than that point, the answer says so. Coastlines on the map are generalized, so a zoomed shore can look offset from the true shoreline. The score uses the latitude and longitude, not the drawing.
        </p>
        <p>
          The events were written for this prototype and checked against the linked sources: encyclopedias, museums, archives, park services, and scientific agencies. Those links can change. This is not a complete history course, and it does not try to settle contested interpretations beyond the narrow claim of where and in which year the described episode is placed.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">Map</h2>
        <p>
          Coastlines are Natural Earth 1:50 million cultural vectors, which are in the public domain. The file used here is the TopoJSON redistribution in the world-atlas package by Michael Bostock, under the ISC license. It is stored with this app and drawn in the browser. No map tiles are requested, and nothing is bulk-cached from a tile server. If the drawing fails, the latitude and longitude fields still accept a guess.
        </p>
        <p>Suggested citation for the coastlines: Made with Natural Earth.</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">Privacy</h2>
        <p>
          There is no account, no payment, no analytics, and no advertising. Guesses are stored in local storage on this device under the key {brand.storageKey}. The theme choice uses {brand.themeKey}. Clearing site data removes both. Pages send a noindex instruction and robots.txt disallows crawling. This prototype is not a public deployment.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl">Limits</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Eight sets, then the rotation repeats.</li>
          <li>A daily set can be finished once in this browser. Practice sets can be restarted and do not affect the daily save.</li>
          <li>Arrow keys stop at 85° north and south because the projection becomes extreme. Typed coordinates may be ±90.</li>
          <li>The city list is a short set of centers for aiming, not a gazetteer of the answers.</li>
          <li>Share images need a browser canvas. If copy is blocked, the result text is on the results page to select by hand.</li>
          <li>The map is not for navigation.</li>
        </ul>
      </section>
    </article>
  );
}
