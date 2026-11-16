import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UtcClock } from "@/components/utc-clock";
import { brand } from "@/config/brand";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl tracking-tight">
          <MeridianMark />
          {brand.name}
        </Link>
        <nav className="flex items-center gap-4 text-sm" aria-label="Primary">
          <Link href="/play" className="underline-offset-4 hover:underline">
            Today
          </Link>
          <Link href="/practice" className="underline-offset-4 hover:underline">
            Practice
          </Link>
          <Link href="/scoring" className="underline-offset-4 hover:underline">
            Scoring
          </Link>
        </nav>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-3">
          <UtcClock />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function MeridianMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="text-primary">
      <circle cx="11" cy="11" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 2.5 V19.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 11 H18" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}
