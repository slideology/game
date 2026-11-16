"use client";

import { geoGraticule, geoNaturalEarth1, geoPath, type GeoProjection } from "d3-geo";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import type { LatLon } from "@/lib/geo";
import { formatCoordinate, normalizeLongitude, nudgeLatitude } from "@/lib/geo";

type WorldTopology = Topology<{
  countries: GeometryCollection;
  land: GeometryCollection;
}>;

interface WorldMapProps {
  pin: LatLon | null;
  onPin?: (pin: LatLon) => void;
  answer?: LatLon | null;
  interactive?: boolean;
}

let topologyPromise: Promise<WorldTopology> | null = null;

function loadTopology(): Promise<WorldTopology> {
  if (!topologyPromise) {
    topologyPromise = fetch("/geo/countries-50m.json")
      .then((response) => {
        if (!response.ok) throw new Error(`Coastline file responded ${response.status}.`);
        return response.json() as Promise<WorldTopology>;
      })
      .catch((error: unknown) => {
        topologyPromise = null;
        throw error;
      });
  }
  return topologyPromise;
}

const START_CROSSHAIR: LatLon = { lat: 20, lon: 0 };

export function WorldMap({ pin, onPin, answer = null, interactive = true }: WorldMapProps) {
  const labelId = useId();
  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [topology, setTopology] = useState<WorldTopology | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [crosshair, setCrosshair] = useState<LatLon>(START_CROSSHAIR);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ moved: boolean; pin: boolean } | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const next = { width: frame.clientWidth, height: frame.clientHeight };
      setSize((current) =>
        Math.abs(current.width - next.width) < 2 && Math.abs(current.height - next.height) < 2
          ? current
          : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadTopology()
      .then((data) => {
        if (!cancelled) setTopology(data);
      })
      .catch(() => {
        if (!cancelled) setError("The coastline drawing did not load. Enter coordinates below.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const geography = useMemo(() => {
    if (!topology) return null;
    return {
      countries: feature(topology, topology.objects.countries) as unknown as FeatureCollection,
      land: feature(topology, topology.objects.land),
    };
  }, [topology]);

  const projection = useMemo(() => {
    if (!geography || size.width < 20 || size.height < 20) return null;
    return geoNaturalEarth1().fitExtent(
      [
        [12, 12],
        [size.width - 12, size.height - 12],
      ],
      geography.land,
    );
  }, [geography, size.height, size.width]);

  const path = useMemo(() => (projection ? geoPath(projection) : null), [projection]);

  const countryPath = useMemo(() => {
    if (!path || !geography) return "";
    return geography.countries.features.map((shape) => path(shape) ?? "").join(" ");
  }, [geography, path]);

  const graticulePath = useMemo(() => {
    if (!path) return "";
    return path(geoGraticule().step([20, 20])()) ?? "";
  }, [path]);

  const spherePath = useMemo(() => {
    if (!path) return "";
    return path({ type: "Sphere" }) ?? "";
  }, [path]);

  const linePath = useMemo(() => {
    if (!path || !pin || !answer) return "";
    return (
      path({
        type: "LineString",
        coordinates: arcCoordinates(pin, answer),
      }) ?? ""
    );
  }, [answer, path, pin]);

  const zoomAt = useCallback((clientX: number, clientY: number, factor: number) => {
    const group = groupRef.current;
    const svg = svgRef.current;
    if (!group || !svg) return;
    const point = svgPoint(svg, clientX, clientY);
    setZoom((current) => {
      const next = clampZoom(current * factor);
      setPan((origin) => {
        const mapX = (point.x - origin.x) / current;
        const mapY = (point.y - origin.y) / current;
        return { x: point.x - mapX * next, y: point.y - mapY * next };
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const factor = event.deltaY > 0 ? 0.9 : 1.1;
      zoomAt(event.clientX, event.clientY, factor);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [zoomAt, size.height, size.width]);

  function zoomBy(factor: number) {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
  }

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function clientToLonLat(clientX: number, clientY: number): LatLon | null {
    const svg = svgRef.current;
    const group = groupRef.current;
    if (!svg || !group || !projection) return null;
    const matrix = group.getScreenCTM();
    if (!matrix) return null;
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const local = point.matrixTransform(matrix.inverse());
    const inverted = projection.invert?.([local.x, local.y]);
    if (!inverted || !Number.isFinite(inverted[0]) || !Number.isFinite(inverted[1])) return null;
    const [lon, lat] = inverted;
    if (lat < -90 || lat > 90) return null;
    return { lat, lon: normalizeLongitude(lon) };
  }

  function place(next: LatLon) {
    onPin?.({
      lat: Math.round(next.lat * 10000) / 10000,
      lon: Math.round(normalizeLongitude(next.lon) * 10000) / 10000,
    });
  }

  function onKeyDown(event: React.KeyboardEvent<SVGSVGElement>) {
    if (!interactive) return;
    const step = event.altKey ? 0.02 : event.shiftKey ? 1 : 0.2;
    if (event.key === "Enter") {
      event.preventDefault();
      place(pin ?? crosshair);
      return;
    }
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomBy(1.25);
      return;
    }
    if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      zoomBy(0.8);
      return;
    }
    if (event.key === "0") {
      event.preventDefault();
      resetView();
      return;
    }
    const arrows: Record<string, [number, number]> = {
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
    };
    const delta = arrows[event.key];
    if (!delta) return;
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) {
      const pixels = event.shiftKey ? 80 : 40;
      const horizontal = event.key === "ArrowLeft" ? pixels : event.key === "ArrowRight" ? -pixels : 0;
      const vertical = event.key === "ArrowUp" ? pixels : event.key === "ArrowDown" ? -pixels : 0;
      setPan((origin) => ({ x: origin.x + horizontal, y: origin.y + vertical }));
      return;
    }
    const base = pin ?? crosshair;
    const next = {
      lat: nudgeLatitude(base.lat + delta[1]),
      lon: normalizeLongitude(base.lon + delta[0]),
    };
    if (pin) place(next);
    else setCrosshair(next);
  }

  function onPointerDown(event: React.PointerEvent<SVGSVGElement>) {
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const onPinHandle = event.target instanceof Element && Boolean(event.target.closest("[data-pin]"));
    gesture.current = { moved: false, pin: interactive && onPinHandle };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) return;
    const dx = event.clientX - previous.x;
    const dy = event.clientY - previous.y;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (Math.hypot(dx, dy) > 3 && gesture.current) gesture.current.moved = true;
    if (!gesture.current?.moved) return;
    if (gesture.current.pin && interactive) {
      const next = clientToLonLat(event.clientX, event.clientY);
      if (next) place(next);
      return;
    }
    setPan((origin) => ({ x: origin.x + dx, y: origin.y + dy }));
  }

  function onPointerUp(event: React.PointerEvent<SVGSVGElement>) {
    const info = gesture.current;
    pointers.current.delete(event.pointerId);
    gesture.current = null;
    if (interactive && info && !info.moved && !info.pin) {
      const next = clientToLonLat(event.clientX, event.clientY);
      if (next) place(next);
    }
  }

  const status = pin
    ? `Pin at ${formatCoordinate(pin)}.`
    : `Crosshair at ${formatCoordinate(crosshair)}. Press Enter to drop the pin.`;

  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-xl border border-border bg-[var(--ocean)]">
        <div ref={frameRef} className="relative h-[22rem] sm:h-[28rem] lg:h-[34rem]">
          {error ? (
            <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-foreground" role="alert">
              {error}
            </p>
          ) : null}
          <svg
            ref={svgRef}
            role="application"
            tabIndex={0}
            aria-labelledby={labelId}
            data-testid="world-map"
            className="h-full w-full touch-none outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <title id={labelId}>
              World map. Click or press Enter to place a pin. Arrow keys move the pin. Plus and minus zoom.
            </title>
            <g ref={groupRef} transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
              <path d={spherePath} fill="var(--ocean)" />
              <path d={graticulePath} fill="none" stroke="var(--graticule)" strokeWidth={0.6 / zoom} />
              <path d={countryPath} fill="var(--land)" stroke="var(--land-edge)" strokeWidth={0.7 / zoom} />
              {linePath ? (
                <path
                  d={linePath}
                  fill="none"
                  stroke="var(--answer)"
                  strokeWidth={1.6 / zoom}
                  strokeDasharray={`${5 / zoom} ${4 / zoom}`}
                />
              ) : null}
              {!pin && interactive ? <Marker point={crosshair} projection={projection} zoom={zoom} kind="crosshair" /> : null}
              {pin ? (
                <Marker point={pin} projection={projection} zoom={zoom} kind={answer ? "guess" : "pin"} />
              ) : null}
              {answer ? <Marker point={answer} projection={projection} zoom={zoom} kind="answer" /> : null}
            </g>
          </svg>
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-2">
            <p className="pointer-events-none rounded-md bg-[var(--paper)]/90 px-2 py-1 text-xs text-muted-foreground">
              {interactive ? "Click the map, or use the keys below" : "Your pin and the recorded place"}
            </p>
          </div>
          <div className="absolute right-2 bottom-2 flex flex-col gap-1">
            <MapButton label="Zoom in" onClick={() => zoomBy(1.3)}>
              <Plus />
            </MapButton>
            <MapButton label="Zoom out" onClick={() => zoomBy(0.77)}>
              <Minus />
            </MapButton>
            <MapButton label="Reset map view" onClick={resetView}>
              <RotateCcw />
            </MapButton>
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground" aria-live="polite">
        {status} Arrow keys move {pin ? "the pin" : "a crosshair"} by 0.2° (Shift 1°, Alt 0.02°). Ctrl and an arrow pans. + and − zoom. 0 resets the view.
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        Coastlines: Natural Earth, public domain, 1:50 million, prepared as TopoJSON by world-atlas. Drawn in this
        page from a local file. No map tiles are requested. Made with Natural Earth.
      </p>
      {answer && pin ? (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full border-2 border-[var(--pin)]" /> Your pin
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full bg-[var(--answer)]" /> Recorded place
          </li>
        </ul>
      ) : null}
    </div>
  );
}

function MapButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="pointer-events-auto grid size-11 place-items-center rounded-md border border-border bg-[var(--paper)] text-foreground shadow-sm hover:bg-muted [&_svg]:size-4"
    >
      {children}
    </button>
  );
}

function Marker({
  point,
  projection,
  zoom,
  kind,
}: {
  point: LatLon;
  projection: GeoProjection | null;
  zoom: number;
  kind: "pin" | "guess" | "crosshair" | "answer";
}) {
  if (!projection) return null;
  const projected = projection([point.lon, point.lat]);
  if (!projected) return null;
  const [x, y] = projected;
  const hollow = kind === "guess" || kind === "crosshair";
  const color = kind === "answer" ? "var(--answer)" : "var(--pin)";
  return (
    <g data-pin={kind === "pin" || kind === "guess" ? "true" : undefined} transform={`translate(${x} ${y}) scale(${1 / zoom})`}>
      <circle
        r={kind === "crosshair" ? 8 : 7}
        fill={hollow ? "transparent" : color}
        stroke={color}
        strokeWidth={2}
        strokeDasharray={kind === "crosshair" ? "2 2" : undefined}
      />
      <path d="M -10 0 H 10 M 0 -10 V 10" stroke={color} strokeWidth={1.2} />
    </g>
  );
}

function svgPoint(svg: SVGSVGElement, clientX: number, clientY: number): DOMPoint {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const matrix = svg.getScreenCTM();
  if (!matrix) return point;
  return point.matrixTransform(matrix.inverse());
}

function clampZoom(value: number): number {
  return Math.min(14, Math.max(1, value));
}

function arcCoordinates(from: LatLon, to: LatLon): [number, number][] {
  const start: [number, number] = [from.lon, from.lat];
  const end: [number, number] = [to.lon, to.lat];
  const points: [number, number][] = [];
  for (let index = 0; index <= 48; index += 1) {
    const t = index / 48;
    points.push(interpolate(start, end, t));
  }
  return points;
}

function interpolate(start: [number, number], end: [number, number], t: number): [number, number] {
  const φ1 = (start[1] * Math.PI) / 180;
  const λ1 = (start[0] * Math.PI) / 180;
  const φ2 = (end[1] * Math.PI) / 180;
  const λ2 = (end[0] * Math.PI) / 180;
  const delta = 2 * Math.asin(Math.sqrt(Math.sin((φ2 - φ1) / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2));
  if (delta === 0) return start;
  const a = Math.sin((1 - t) * delta) / Math.sin(delta);
  const b = Math.sin(t * delta) / Math.sin(delta);
  const x = a * Math.cos(φ1) * Math.cos(λ1) + b * Math.cos(φ2) * Math.cos(λ2);
  const y = a * Math.cos(φ1) * Math.sin(λ1) + b * Math.cos(φ2) * Math.sin(λ2);
  const z = a * Math.sin(φ1) + b * Math.sin(φ2);
  return [(Math.atan2(y, x) * 180) / Math.PI, (Math.atan2(z, Math.sqrt(x * x + y * y)) * 180) / Math.PI];
}
