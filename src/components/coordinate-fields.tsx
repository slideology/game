"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { places } from "@/data/places";
import { formatCoordinate, parseLatitude, parseLongitude, type LatLon } from "@/lib/geo";

interface CoordinateFieldsProps {
  latText: string;
  lonText: string;
  onLat: (value: string) => void;
  onLon: (value: string) => void;
  disabled?: boolean;
}

export function CoordinateFields({ latText, lonText, onLat, onLon, disabled = false }: CoordinateFieldsProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const matches = useMemo(() => filterPlaces(query), [query]);
  const lat = parseLatitude(latText);
  const lon = parseLongitude(lonText);
  const pin: LatLon | null = lat.ok && lon.ok ? { lat: lat.value, lon: lon.value } : null;

  function choose(index: number) {
    const place = matches[index];
    if (!place) return;
    onLat(place.lat.toFixed(4));
    onLon(place.lon.toFixed(4));
    setQuery(`${place.name}, ${place.region}`);
    setOpen(false);
  }

  return (
    <fieldset className="min-w-0 space-y-3" disabled={disabled}>
      <legend className="text-sm font-medium text-foreground">Place without the map</legend>
      <p className="text-sm leading-6 text-muted-foreground">
        Type a latitude and longitude, or start from a city center and move the pin. City centers are aiming aids, not the scored sites.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-muted-foreground">Latitude (−90 to 90)</span>
          <Input
            id="latitude"
            data-testid="lat-input"
            inputMode="decimal"
            autoComplete="off"
            value={latText}
            aria-invalid={latText.trim().length > 0 && !lat.ok}
            onChange={(event) => onLat(event.target.value)}
            className="h-11 text-base md:text-base"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted-foreground">Longitude (−180 to 180)</span>
          <Input
            id="longitude"
            data-testid="lon-input"
            inputMode="decimal"
            autoComplete="off"
            value={lonText}
            aria-invalid={lonText.trim().length > 0 && !lon.ok}
            onChange={(event) => onLon(event.target.value)}
            className="h-11 text-base md:text-base"
          />
        </label>
      </div>
      {latText.trim() && !lat.ok ? <p className="text-sm text-destructive">{lat.message}</p> : null}
      {lonText.trim() && !lon.ok ? <p className="text-sm text-destructive">{lon.message}</p> : null}
      <p className="text-sm text-foreground" data-testid="pin-readout">
        {pin ? `Current pin: ${formatCoordinate(pin)}` : "No pin yet."}
      </p>
      <div className="relative">
        <label htmlFor="place-search" className="mb-1 block text-sm text-muted-foreground">
          Search a city to start from
        </label>
        <Input
          id="place-search"
          role="combobox"
          aria-expanded={open}
          aria-controls="place-list"
          aria-autocomplete="list"
          placeholder="Accra, Osaka, Lima…"
          value={query}
          disabled={disabled}
          className="h-11 text-base md:text-base"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
              setHighlight((current) => Math.min(current + 1, Math.max(matches.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setHighlight((current) => Math.max(current - 1, 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              choose(highlight);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        {open && query.trim() && matches.length > 0 ? (
          <ul id="place-list" role="listbox" className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-popover p-1 shadow-md">
            {matches.map((place, index) => (
              <li key={place.id} role="option" aria-selected={index === highlight}>
                <button
                  type="button"
                  className={`w-full rounded-md px-3 py-2 text-left text-sm ${index === highlight ? "bg-muted" : ""}`}
                  onMouseEnter={() => setHighlight(index)}
                  onClick={() => choose(index)}
                >
                  {place.name}, {place.region}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {open && query.trim() && matches.length === 0 ? (
          <p className="mt-1 text-sm text-muted-foreground">No city in the short list. Enter coordinates instead.</p>
        ) : null}
      </div>
    </fieldset>
  );
}

function filterPlaces(query: string) {
  const folded = fold(query.trim());
  if (folded.length < 1) return [];
  return places
    .filter((place) => fold(`${place.name} ${place.region}`).includes(folded))
    .slice(0, 8);
}

function fold(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}
