import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameScreen } from "@/components/game-screen";
import { dailySets, getSet } from "@/data/sets";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Practice set",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return dailySets.map((set) => ({ setId: set.id }));
}

export default async function PracticeSetPage({
  params,
}: {
  params: Promise<{ setId: string }>;
}) {
  const { setId } = await params;
  const set = getSet(setId);
  if (!set) notFound();
  return <GameScreen mode="practice" setId={set.id} />;
}
