"use client";

import { useEffect, useState } from "react";
import { formatCountdown, formatUtcClock, msUntilNextUtcMidnight } from "@/lib/calendar";

export function UtcClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return <p className="text-sm text-muted-foreground">The daily set follows Coordinated Universal Time.</p>;
  }

  return (
    <p className="text-sm text-muted-foreground">
      <time dateTime={now.toISOString()}>{formatUtcClock(now)}</time>
      <span aria-hidden="true"> · </span>
      <span>Next set in {formatCountdown(msUntilNextUtcMidnight(now))}</span>
    </p>
  );
}
