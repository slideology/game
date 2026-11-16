import type { Metadata } from "next";
import { GameScreen } from "@/components/game-screen";

export const metadata: Metadata = {
  title: "Today",
  robots: { index: false, follow: false },
};

export default function PlayPage() {
  return <GameScreen mode="daily" />;
}
