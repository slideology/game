import type { Era } from "@/lib/years";

export interface SourceRef {
  title: string;
  url: string;
  publisher: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  prompt: string;
  locationLabel: string;
  lat: number;
  lon: number;
  year: number;
  era: Era;
  explanation: string;
  precisionNote: string;
  sources: SourceRef[];
  /** Proper nouns and years that must not appear in the prompt. */
  hiddenTerms: string[];
}
