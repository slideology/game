import type { Metadata } from "next";
import { HomePanel } from "@/components/home-panel";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: brand.name,
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return (
    <div className="space-y-14">
      <HomePanel />
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-2xl">Place</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The score uses the great-circle distance from your pin to the recorded point. A city-scale miss still scores. Another continent does not.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-2xl">Year</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Choose BC or AD. There is no year zero, so 1 BC and 1 AD are one year apart. The same numerals in the wrong era are not a near miss.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-2xl">After you lock it</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            You see the distance, the year gap, a short account, and links to the sources. A locked guess cannot be changed. The share card leaves the answers out.
          </p>
        </article>
      </section>
    </div>
  );
}
