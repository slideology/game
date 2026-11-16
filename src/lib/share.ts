import { brand } from "@/config/brand";
import { MAX_DAILY_SCORE } from "@/config/rules";
import { formatUtcDateLabel } from "@/lib/calendar";
import { totalScore, type Run } from "@/lib/game";
import type { ScoreBand } from "@/lib/score";

export interface ShareRow {
  place: ScoreBand;
  year: ScoreBand;
}

/** Fields safe to show someone who has not played. No places, years, or titles. */
export interface ShareModel {
  brandName: string;
  dateLabel: string;
  modeLabel: string;
  totalScore: number;
  maxScore: number;
  rows: ShareRow[];
  disclaimer: string;
}

export function buildShareModel(run: Run): ShareModel {
  if (run.status !== "complete") {
    throw new Error("Share the result only after all five rounds are locked.");
  }
  return {
    brandName: brand.name,
    dateLabel: formatUtcDateLabel(run.utcDate),
    modeLabel: run.mode === "daily" ? "Daily set" : "Practice set",
    totalScore: totalScore(run),
    maxScore: MAX_DAILY_SCORE,
    rows: run.rounds.map((round) => {
      if (!round.result) throw new Error("A finished run is missing a round score.");
      return { place: round.result.locationBand, year: round.result.yearBand };
    }),
    disclaimer: brand.disclaimer,
  };
}

export function shareText(model: ShareModel): string {
  const rows = model.rows
    .map((row) => `${bandWord(row.place).padEnd(6, " ")}${bandWord(row.year)}`)
    .join("\n");
  return [
    `${model.brandName} · ${model.dateLabel} UTC`,
    model.modeLabel,
    `${model.totalScore.toLocaleString("en-US")} / ${model.maxScore.toLocaleString("en-US")}`,
    "",
    "Place  Year",
    rows,
    "",
    "Bands only. Event names, places, and years are left out.",
    model.disclaimer,
  ].join("\n");
}

/** Every string the share card is allowed to paint. */
export function shareCardLines(model: ShareModel): string[] {
  return [
    model.brandName,
    `${model.dateLabel} UTC`,
    model.modeLabel,
    `${model.totalScore.toLocaleString("en-US")} / ${model.maxScore.toLocaleString("en-US")}`,
    "Place",
    "Year",
    ...model.rows.flatMap((row) => [bandWord(row.place), bandWord(row.year)]),
    "Bands only. Event names, places, and years are left out.",
    model.disclaimer,
  ];
}

export interface SharePalette {
  paper: string;
  ink: string;
  muted: string;
  line: string;
  close: string;
  near: string;
  far: string;
}

export interface ShareDrawContext {
  canvas: { width: number; height: number };
  fillStyle: string | CanvasGradient | CanvasPattern;
  strokeStyle: string | CanvasGradient | CanvasPattern;
  lineWidth: number;
  font: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  fillRect(x: number, y: number, w: number, h: number): void;
  strokeRect(x: number, y: number, w: number, h: number): void;
  fillText(text: string, x: number, y: number): void;
  beginPath(): void;
  arc(x: number, y: number, r: number, start: number, end: number): void;
  fill(): void;
  stroke(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
}

export const SHARE_CARD_WIDTH = 900;
export const SHARE_CARD_HEIGHT = 1200;

export function drawShareCard(
  ctx: ShareDrawContext,
  model: ShareModel,
  palette: SharePalette,
): void {
  const lines = shareCardLines(model);
  ctx.fillStyle = palette.paper;
  ctx.fillRect(0, 0, SHARE_CARD_WIDTH, SHARE_CARD_HEIGHT);
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, SHARE_CARD_WIDTH - 72, SHARE_CARD_HEIGHT - 72);

  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = palette.ink;
  ctx.font = "64px Georgia, serif";
  ctx.fillText(lines[0] ?? "", 72, 78);
  ctx.font = "28px sans-serif";
  ctx.fillStyle = palette.muted;
  ctx.fillText(lines[1] ?? "", 72, 164);
  ctx.fillText(lines[2] ?? "", 72, 206);
  ctx.fillStyle = palette.ink;
  ctx.font = "42px sans-serif";
  ctx.fillText(lines[3] ?? "", 72, 268);

  ctx.font = "22px sans-serif";
  ctx.fillStyle = palette.muted;
  ctx.fillText(lines[4] ?? "", 72, 360);
  ctx.fillText(lines[5] ?? "", 280, 360);

  model.rows.forEach((row, index) => {
    const y = 430 + index * 92;
    drawBand(ctx, 92, y, row.place, palette);
    drawBand(ctx, 300, y, row.year, palette);
    ctx.fillStyle = palette.ink;
    ctx.font = "28px sans-serif";
    ctx.fillText(bandWord(row.place), 124, y - 14);
    ctx.fillText(bandWord(row.year), 332, y - 14);
  });

  ctx.fillStyle = palette.muted;
  ctx.font = "22px sans-serif";
  const note = lines.at(-2) ?? "";
  const disclaimer = lines.at(-1) ?? "";
  wrapText(ctx, note, 72, 940, 760, 32);
  wrapText(ctx, disclaimer, 72, 1040, 760, 30);
}

function drawBand(
  ctx: ShareDrawContext,
  x: number,
  y: number,
  band: ScoreBand,
  palette: SharePalette,
): void {
  ctx.beginPath();
  ctx.arc(x, y, 16, 0, Math.PI * 2);
  ctx.fillStyle = band === "close" ? palette.close : band === "near" ? palette.near : palette.far;
  ctx.fill();
}

function wrapText(
  ctx: ShareDrawContext,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): void {
  const words = text.split(" ");
  let line = "";
  let cursor = y;
  const limit = Math.max(24, Math.floor(maxWidth / 14));
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) {
      ctx.fillText(line, x, cursor);
      line = word;
      cursor += lineHeight;
    } else {
      line = next;
    }
  }
  if (line) ctx.fillText(line, x, cursor);
}

function bandWord(band: ScoreBand): string {
  if (band === "close") return "close";
  if (band === "near") return "near";
  return "far";
}

export function sharePalette(theme: "light" | "dark"): SharePalette {
  if (theme === "dark") {
    return {
      paper: "#141816",
      ink: "#f3ecdf",
      muted: "#b7ae9f",
      line: "#3a443f",
      close: "#8dcea8",
      near: "#e3c27a",
      far: "#f0a0a0",
    };
  }
  return {
    paper: "#f6f1e6",
    ink: "#1c1915",
    muted: "#5e584e",
    line: "#d9d0c0",
    close: "#1d6b45",
    near: "#8a5a12",
    far: "#9f2d2d",
  };
}
