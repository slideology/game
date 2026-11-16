import type { Metadata } from "next";
import { PracticeIndex } from "@/components/practice-index";

export const metadata: Metadata = {
  title: "Practice",
  robots: { index: false, follow: false },
};

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <div className="max-w-2xl space-y-3">
        <h1 className="font-display text-5xl tracking-tight">Practice</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Eight fixed sets, separate from the daily rotation. A practice save stays on this device and does not change today’s result.
        </p>
      </div>
      <PracticeIndex />
    </div>
  );
}
