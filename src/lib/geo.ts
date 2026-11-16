export interface LatLon {
  lat: number;
  lon: number;
}

/** IUGG mean Earth radius, kilometers. */
export const EARTH_RADIUS_KM = 6371.0088;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Great-circle distance. Same point is 0. The longest distance is half a
 * meridian, about 20,015 km.
 */
export function haversineKm(from: LatLon, to: LatLon): number {
  for (const point of [from, to]) {
    if (!Number.isFinite(point.lat) || !Number.isFinite(point.lon)) {
      throw new Error("Latitude and longitude must be finite numbers.");
    }
  }
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const dLat = toRadians(to.lat - from.lat);
  const dLon = toRadians(to.lon - from.lon);
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h =
    sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function normalizeLongitude(lon: number): number {
  if (!Number.isFinite(lon)) {
    throw new Error("Longitude must be a finite number.");
  }
  const wrapped = ((((lon + 180) % 360) + 360) % 360) - 180;
  return Object.is(wrapped, -0) ? 0 : wrapped;
}

/** Arrow-key nudges stay inside the projection's comfortable band. */
export function nudgeLatitude(lat: number): number {
  if (!Number.isFinite(lat)) {
    throw new Error("Latitude must be a finite number.");
  }
  return Math.min(85, Math.max(-85, lat));
}

export type ParseResult =
  | { ok: true; value: number }
  | { ok: false; message: string };

export function parseLatitude(raw: string): ParseResult {
  return parseDegrees(raw, 90, "Latitude", "−90 and 90");
}

export function parseLongitude(raw: string): ParseResult {
  return parseDegrees(raw, 180, "Longitude", "−180 and 180");
}

function parseDegrees(
  raw: string,
  limit: number,
  name: string,
  rangeLabel: string,
): ParseResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, message: `Enter a ${name.toLowerCase()} in decimal degrees.` };
  }
  if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(trimmed)) {
    return {
      ok: false,
      message: `${name} must be a decimal number of degrees, such as 41.03 or -0.57.`,
    };
  }
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < -limit || value > limit) {
    return { ok: false, message: `${name} must be between ${rangeLabel}.` };
  }
  return { ok: true, value };
}

export function formatCoordinate(point: LatLon): string {
  const latHemisphere = point.lat >= 0 ? "N" : "S";
  const lonHemisphere = point.lon >= 0 ? "E" : "W";
  return `${Math.abs(point.lat).toFixed(2)}° ${latHemisphere}, ${Math.abs(point.lon).toFixed(2)}° ${lonHemisphere}`;
}

export function formatKm(km: number): string {
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km).toLocaleString("en-US")} km`;
}
