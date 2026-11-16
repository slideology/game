import { brand } from "@/config/brand";
import type { Run } from "@/lib/game";

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

interface Persisted {
  version: 1;
  daily: Record<string, Run>;
  practice: Record<string, Run>;
}

export interface LoadQuery {
  mode: Run["mode"];
  utcDate: string;
  setId: string;
  eventIds: readonly string[];
}

const EMPTY: Persisted = { version: 1, daily: {}, practice: {} };

export function loadActiveRun(storage: KeyValueStorage, query: LoadQuery): Run | null {
  const saved = readStore(storage);
  const run =
    query.mode === "daily" ? saved.daily[query.utcDate] : saved.practice[query.setId];
  if (!run) return null;
  if (!isUsableRun(run, query)) return null;
  return run;
}

const storageUpdates = new EventTarget();

export function notifyStorage(): void {
  storageUpdates.dispatchEvent(new Event("change"));
}

export function subscribeStorage(callback: () => void): () => void {
  const onChange = () => callback();
  storageUpdates.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener("focus", onChange);
  const interval = window.setInterval(onChange, 60_000);
  return () => {
    storageUpdates.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener("focus", onChange);
    window.clearInterval(interval);
  };
}

export function rememberRun(run: Run): boolean {
  const saved = saveRun(window.localStorage, run);
  notifyStorage();
  return saved;
}

export function saveRun(storage: KeyValueStorage, run: Run): boolean {
  try {
    const saved = readStore(storage);
    if (run.mode === "daily") saved.daily[run.utcDate] = run;
    else saved.practice[run.setId] = run;
    storage.setItem(brand.storageKey, JSON.stringify(saved));
    return true;
  } catch {
    return false;
  }
}

export function memoryStorage(initial?: string): KeyValueStorage & { snapshot(): string | null } {
  let value = initial ?? null;
  return {
    getItem() {
      return value;
    },
    setItem(_key, next) {
      value = next;
    },
    snapshot() {
      return value;
    },
  };
}

function readStore(storage: KeyValueStorage): Persisted {
  try {
    const raw = storage.getItem(brand.storageKey);
    if (!raw) return { ...EMPTY, daily: {}, practice: {} };
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    if (parsed.version !== 1 || !parsed.daily || !parsed.practice) {
      return { ...EMPTY, daily: {}, practice: {} };
    }
    return {
      version: 1,
      daily: parsed.daily,
      practice: parsed.practice,
    };
  } catch {
    return { ...EMPTY, daily: {}, practice: {} };
  }
}

function isUsableRun(run: Run, query: LoadQuery): boolean {
  if (run.version !== 1 || run.mode !== query.mode || run.setId !== query.setId) return false;
  if (run.mode === "daily" && run.utcDate !== query.utcDate) return false;
  if (run.rounds.length !== query.eventIds.length) return false;
  return run.rounds.every((round, index) => round.eventId === query.eventIds[index]);
}
